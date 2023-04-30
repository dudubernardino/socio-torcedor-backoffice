import React, { useState } from 'react'
import Head from 'next/head'
import Datepicker from 'react-tailwindcss-datepicker'
import { getCookie } from 'cookies-next'

import { useBilling } from 'dataHooks/billing'
import { JSONParse } from 'utils/JSONParse'

function Billing({ currentUser }) {
  const [role] = useState(currentUser?.role)
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  })

  const {
    billing = [],
    isLoading,
    isError,
    isEmpty,
  } = useBilling({
    startDate: value?.startDate,
    endDate: value?.endDate,
  })

  return (
    <>
      <Head>
        <title>Faturamento - Backoffice Sócio API</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex items-center">
            <h2 className="text-xl text-gray-800 font-semibold py-4 mr-3">
              Faturamento{' '}
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
                      Nome
                    </th>
                    {role === 'INIC_ADMIN' && (
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Qtd Clientes
                      </th>
                    )}
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Qtd Apps
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Qtd Iniciações
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Qtd DICT
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      TPV
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
                  {billing.map(
                    ({
                      name,
                      customers,
                      applications,
                      initiations,
                      dict,
                      tpv,
                    }) => (
                      <tr key={name} className="hover:bg-gray-200">
                        <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <div className="truncate w-24">{name}</div>
                        </td>
                        {role === 'INIC_ADMIN' && (
                          <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="truncate w-24">{customers}</div>
                          </td>
                        )}
                        <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <div className="truncate w-24">{applications}</div>
                        </td>
                        <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <div className="truncate w-24">{initiations}</div>
                        </td>
                        <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <div className="truncate w-24">{dict}</div>
                        </td>
                        <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <div className="truncate w-24">
                            {tpv
                              ? Number(tpv / 100).toLocaleString('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL',
                                })
                              : 'N/A'}
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Billing

export const getServerSideProps = async ({ req, res }) => {
  const data = getCookie('data', { req, res }) || {}

  return {
    props: {
      currentUser: JSONParse(data),
    },
  }
}
