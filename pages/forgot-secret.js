import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useForm } from 'react-hook-form'

import { eres } from 'utils/eres'
import { fetcher } from 'utils/fetcher'

import { HeaderOutside } from 'components/HeaderOutside'

function ForgotSecret() {
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
    },
  })

  const handleForgotSecret = async (body) => {
    setError('')

    const [error, data] = await eres(
      fetcher({ path: '/auth/forgot-secret', body, method: 'POST' })
    )

    if (error || !data) {
      console.log({ error })
      setError(error?.message || 'Algo deu errado ao realizar a operação.')
      return
    }

    setMessage('Você receberá um link caso seu email esteja cadastrado.')
  }

  return (
    <div className="bg-black bg-right-bottom bg-no-repeat bg-contain h-full">
      <Head>
        <title>Esqueci minha senha - Iniciador</title>
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
                <hr className="mt-6 border-b-1 border-gray-300" />
              </div>
              <div className="flex-auto px-6 py-10 pt-0">
                <form
                  onSubmit={handleSubmit(handleForgotSecret)}
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
                  {error && (
                    <p className="text-center text-xs mt-3 text-red-700">
                      {error}
                    </p>
                  )}
                  {message && (
                    <p className="text-center text-xs mt-3 text-green-700">
                      {message}
                    </p>
                  )}
                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Carregando...' : 'Receber link'}
                    </button>
                    <div className="mt-2">
                      <Link className="underline" href="/">
                        Voltar para login
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

export default ForgotSecret

export const getServerSideProps = async () => {
  return {
    props: {
      outsideLayout: true,
    },
  }
}
