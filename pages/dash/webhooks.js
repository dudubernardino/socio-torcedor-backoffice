import React, { useState } from 'react'
import Head from 'next/head'
import Datepicker from 'react-tailwindcss-datepicker'

import { useWebhooks } from 'dataHooks/webhooks'
import { getPaymentStatusColor } from 'utils/getPaymentStatusColor'

function Webhooks() {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  })
  const getStatusColor = (status) => {
    const statusColors = {
      SUCCESS: 'text-green-600',
      HALTED: 'text-orange-600',
    }

    return statusColors[status] || ''
  }

  const {
    webhooks = [],
    isLoading,
    isError,
    isEmpty,
    isRefreshing,
    size,
    setSize,
    isTheEnd,
  } = useWebhooks({
    startDate: value?.startDate,
    endDate: value?.endDate,
  })

  return (
    <>
      <Head>
        <title>Webhooks - Backoffice Iniciador</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex items-center">
            <h2 className="text-xl text-gray-800 font-semibold py-4 mr-3">
              Webhooks{' '}
              <span className="uppercase font-medium text-xs leading-5 rounded-full text-sky-600 bg-sky-400/10 px-2 py-0.5 dark:text-sky-400">
                beta
              </span>
            </h2>
          </div>
          <form className="mb-4 grid md:grid-cols-8 gap-3">
            <div className="col-span-4 md:col-span-2">
              <Datepicker
                i18n={'pt-br'}
                configs={{
                  shortcuts: {
                    today: 'Hoje',
                    yesterday: 'Ontem',
                    past: (period) => `Últimos ${period} dias`,
                    currentMonth: 'Mês atual',
                    pastMonth: 'Último mês',
                  },
                  footer: {
                    cancel: 'Cancelar',
                    apply: 'Aplicar',
                  },
                }}
                value={value}
                onChange={setValue}
                showShortcuts
                separator="~"
                displayFormat="DD/MM/YYYY"
              />
            </div>
            {/* <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Buscar
            </button> */}
          </form>

          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Criado em
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      ID Iniciação
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Status Webhook
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Status Iniciação
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Qtd Tentativas
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      URL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan={6} className="text-center">
                        <p className="text-sm font-medium text-center py-4 text-gray-600">
                          Carregando...
                        </p>
                      </td>
                    </tr>
                  )}
                  {isRefreshing && (
                    <tr>
                      <td colSpan={6} className="text-center">
                        <p className="text-sm font-medium text-center py-4 text-gray-600">
                          Atualizando...
                        </p>
                      </td>
                    </tr>
                  )}
                  {isError && (
                    <tr>
                      <td colSpan={6} className="text-center">
                        <p className="text-sm font-medium text-center py-4 text-gray-600">
                          Erro ao buscar dados
                        </p>
                      </td>
                    </tr>
                  )}
                  {isEmpty && (
                    <tr>
                      <td colSpan={6} className="text-center">
                        <p className="text-sm font-medium text-center py-4 text-gray-600">
                          Lista vazia
                        </p>
                      </td>
                    </tr>
                  )}
                  {webhooks.map(
                    ({
                      id,
                      paymentInitiationId,
                      createdAt,
                      status,
                      requestBody,
                      attempts,
                      url,
                    }) => (
                      <tr key={id} className="hover:bg-gray-200">
                        <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <div className="truncate w-24">
                            {' '}
                            {createdAt
                              ? new Date(createdAt).toLocaleString('pt-BR')
                              : ''}
                          </div>
                        </td>
                        <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <div className="truncate w-24">
                            {paymentInitiationId}
                          </div>
                        </td>
                        <td
                          className={`font-medium border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ${getStatusColor(
                            status
                          )}`}
                        >
                          <span className="p-2 rounded-md bg-stone-200">
                            {status}
                          </span>
                        </td>
                        <td
                          className={`font-medium border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ${getPaymentStatusColor(
                            requestBody?.status
                          )}`}
                        >
                          <span className="p-2 rounded-md bg-stone-200">
                            {requestBody?.status}
                          </span>
                        </td>
                        <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <div className="truncate w-24">{attempts}</div>
                        </td>
                        <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <div>{url}</div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {!isTheEnd && (
            <div className="flex justify-center items-center pb-6">
              <button
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                onClick={() => setSize(size + 1)}
              >
                Carregar mais
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Webhooks
