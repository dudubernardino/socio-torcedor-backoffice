import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { decodeJwt } from 'jose'
import { setCookie } from 'cookies-next'

import { eres } from 'utils/eres'
import { fetcher } from 'utils/fetcher'

import { HeaderOutside } from 'components/HeaderOutside'

function ResetSecret() {
  const router = useRouter()
  const [error, setError] = useState('')
  const token = router?.query?.token

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      newSecret: '',
      confirmNewSecret: '',
    },
  })

  const handleForgotSecret = async (formData) => {
    setError('')

    if (formData?.newSecret !== formData?.confirmNewSecret) {
      return setError('Senhas não coincidem, tente novamente')
    }

    const body = {
      ...formData,
      token,
    }

    reset()

    const [error, data] = await eres(
      fetcher({ path: '/auth/reset-secret', body, method: 'POST' })
    )

    if (error || !data || !data?.accessToken) {
      if (error?.message.includes('at least one number')) {
        return setError(
          'Sua senha não atende os requisitos mínimos descritos acima.'
        )
      }

      if (error?.message.includes('This secret has already been used')) {
        return setError(
          'Essa senha já foi utilizada, utilize outra senha segura.'
        )
      }

      setError(
        error?.message ||
          'Algo deu errado ao realizar a operação. Nossa equipe já foi acionada sobre o problema.'
      )
      return
    }

    setCookie('jwt', data?.accessToken, {
      path: '/',
      sameSite: true,
    })
    setCookie('refreshToken', data?.refreshToken, {
      path: '/',
      sameSite: true,
    })
    setCookie('data', decodeJwt(data?.accessToken)?.payload, {
      path: '/',
      sameSite: true,
    })

    router.push('/dash')
  }

  return (
    <div className="bg-black bg-[url('./../public/iniciador_lines.png')] bg-right-bottom bg-no-repeat bg-contain h-full">
      <Head>
        <title>Resetar senha - Iniciador</title>
      </Head>
      <HeaderOutside />
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-500 text-md font-bold">
                    Resetar senha
                  </h6>
                </div>
                <p className="text-sm text-gray-600">
                  Atenção: crie uma senha segura. Sua senha deve conter no
                  mínimo 8 caracteres, pelo menos uma letra maiúscula, minúcula,
                  um número e um dos símbolos ($, *, &, @, ou #).
                </p>
                <hr className="mt-6 border-b-1 border-gray-300" />
              </div>
              <div className="flex-auto px-6 py-10 pt-0">
                <form
                  onSubmit={handleSubmit(handleForgotSecret)}
                  disabled={isSubmitting}
                >
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                      Senha
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Senha"
                      {...register('newSecret', { required: true })}
                      required
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                      Confirmar senha
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Senha"
                      {...register('confirmNewSecret', { required: true })}
                      required
                    />
                  </div>
                  {error && (
                    <p className="text-center text-xs mt-3 text-red-700">
                      {error}
                    </p>
                  )}
                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Carregando...' : 'Resetar senha'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetSecret

export const getServerSideProps = async () => {
  return {
    props: {
      outsideLayout: true,
    },
  }
}
