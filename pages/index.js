import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { getCookie, setCookie } from 'cookies-next'
import { decodeJwt } from 'jose'

import { eres } from 'utils/eres'
import { fetcher } from 'utils/fetcher'

import { HeaderOutside } from 'components/HeaderOutside'

function Login() {
  const [error, setError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleLogin = async (body) => {
    setError('')
    setCookie('email', body?.email)

    const [error, data] = await eres(
      fetcher({ path: '/auth', body, method: 'POST' })
    )

    if (!data) {
      return setError('Usuário ou senha inválidos.')
    }

    if (error || !data || !data?.accessToken) {
      setError(
        error?.message ||
          'Algo deu errado ao realizar a operação. Nossa equipe já foi acionada sobre o problema.'
      )
      return
    }

    const dataFromToken = decodeJwt(data?.accessToken)?.payload

    if (dataFromToken.role === 'USER')
      return setError('Usuário não possui permissão para acessar a plataforma.')

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
    <div className="bg-black  bg-right-bottom bg-no-repeat bg-contain h-full">
      <Head>
        <title>Login - Backoffice Sócio API</title>
      </Head>
      <HeaderOutside />
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-500 text-md font-bold">
                    Acessar plataforma
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-gray-300" />
              </div>
              <div className="flex-auto px-6 py-10 pt-0">
                <form
                  onSubmit={handleSubmit(handleLogin)}
                  disabled={isSubmitting}
                >
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="E-mail"
                      {...register('email', { required: true })}
                      required
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                      Senha
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Senha"
                      {...register('password', { required: true })}
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
                      {isSubmitting ? 'Carregando...' : 'Entrar'}
                    </button>
                    <div className="mt-2">
                      <Link className="underline" href="/forgot-secret">
                        Esqueci minha senha
                      </Link>
                    </div>
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

export default Login

export const getServerSideProps = async ({ req, res }) => {
  const jwt = getCookie('jwt', { req, res })

  if (jwt) {
    return {
      redirect: {
        destination: '/dash/users',
        permanent: false,
      },
    }
  }

  return {
    props: {
      outsideLayout: true,
    },
  }
}
