import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Head from 'next/head'

import { fetcher } from 'utils/fetcher'
import { eres } from 'utils/eres'
import { removeEmptyFields } from 'utils/removeEmptyFields'
import { errorAlert } from 'utils/errorAlert'

import { ApplicationForm } from 'components/ApplicationForm'
import { useCustomer } from 'dataHooks/customer'

function ApplicationNew({ banks }) {
  const router = useRouter()
  const [result, setResult] = useState(null)

  const customerId = router?.query?.customerId
  const { mutate } = useCustomer({ customerId })

  const onSubmit = async (data) => {
    const body = removeEmptyFields({
      ...data,
      fee: data?.fee ? Math.trunc(Number(data.fee || 0) * 100) : null,
      paymentMethods: data?.paymentMethods?.map((item) => item.value),
    })

    const [error, result] = await eres(
      fetcher({
        path: `/customers/${customerId}/apps`,
        body,
        method: 'POST',
      })
    )

    if (error) {
      return errorAlert(error)
    }

    mutate(result)
    setResult(result)
    toast.success('Sucesso!')
  }

  return (
    <>
      <Head>
        <title>Nova aplicação - Backoffice Iniciador</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        {result ? (
          <div className="px-4 md:px-10 mx-auto w-full bg-gray-100 py-6">
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0">
              <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                  <h6 className="text-gray-700 text-xl font-bold">
                    Aplicação criada com sucesso! (Leia atentamente os dados
                    abaixo)
                  </h6>
                  <div>
                    <button
                      className="bg-gray-700 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() =>
                        router.push(`/dash/customers/${customerId}`)
                      }
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-auto px-6 py-10 pt-0">
                <div className="flex justify-center items-center p-2 my-3 bg-slate-500 rounded-md ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 mx-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <p className="font-md font-medium text-white py-4">
                    Atenção! Guarde o client id e client secret de forma segura.{' '}
                    <br /> Para a segurança da plataforma esses dados são
                    expostos apenas nesse momento.
                  </p>
                </div>

                <div className="flex flex-wrap mt-12">
                  <div className="w-full lg:w-12/12">
                    <div className="relative w-full mb-3">
                      <p className="block uppercase text-gray-600 text-xs font-bold mb-2">
                        nome
                      </p>
                      <p className="text-gray-700 text-md">
                        {result?.name || '-'}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-12/12">
                    <div className="relative w-full mb-3">
                      <p className="block uppercase text-gray-600 text-xs font-bold mb-2">
                        descrição
                      </p>
                      <p className="text-gray-700 text-md">
                        {result?.description || '-'}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-12/12">
                    <div className="relative w-full mb-3">
                      <p className="block uppercase text-gray-600 text-xs font-bold mb-2">
                        Client Id
                      </p>
                      <p className="text-gray-700 text-md">
                        {result?.clientId}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-12/12">
                    <div className="relative w-full mb-3">
                      <p className="block uppercase text-gray-600 text-xs font-bold mb-2">
                        Client Secret
                      </p>
                      <p className="text-gray-700 text-md">
                        {result?.clientSecret}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ApplicationForm
            onSubmit={onSubmit}
            banks={banks}
            setDisabled={() => router.back()}
          />
        )}
      </div>
    </>
  )
}

export default ApplicationNew

export const getServerSideProps = async ({ req, res }) => {
  const [, response] = await eres(
    fetch('https://static.u4c-iniciador.com.br/prod/banks.json')
  )
  const banks = await response.json()

  return {
    props: {
      banks,
    },
  }
}
