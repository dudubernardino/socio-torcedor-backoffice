import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { toDate, formatInTimeZone } from 'date-fns-tz'
import Datepicker from 'react-tailwindcss-datepicker'

import { usePayments } from 'dataHooks/payments'
import { isImage } from 'utils/isImage'
import { removeEmptyFields } from 'utils/removeEmptyFields'
import { getPaymentStatusColor } from 'utils/getPaymentStatusColor'

function Payments() {
  const router = useRouter()
  const [filterParams, setFilterParams] = useState(null)
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  })

  const {
    payments = [],
    isLoading,
    isError,
    isEmpty,
    size,
    setSize,
    isRefreshing,
    isTheEnd,
  } = usePayments({ filterParams })

  const accessPayment = (id) => (event) => {
    event.preventDefault()
    event.stopPropagation()

    router.push(`/dash/payments/${id}`)
  }

  const submitFilter = (event) => {
    event.preventDefault()
    const startDate = value?.startDate
    const endDate = value?.endDate

    setFilterParams(
      removeEmptyFields({
        text: event.target?.search?.value,
        startDate: startDate ? startDate : null,
        endDate: endDate ? endDate : null,
      })
    )
  }


  return (
    <>
      <Head>
        <title>Pagamentos - Backoffice Iniciador</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex items-center">
            <h2 className="text-xl text-gray-800 font-semibold py-4 mr-3">
              Iniciações
            </h2>
          </div>
          <form
            onSubmit={submitFilter}
            className="mb-4 grid md:grid-cols-8 gap-3"
          >
            <div className="relative col-span-5">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                name="search"
                className="block p-2.5 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buscar por IDs, Status, Provedores, CPF/CNPJ, etc"
              />
            </div>
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
            <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Buscar
            </button>
          </form>

          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      External id
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Criado em
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Data PGTO
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Banco usuário
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Provedor
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Status
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan={9} className="text-center">
                        <p className="text-sm font-medium text-center py-4 text-gray-600">
                          Carregando...
                        </p>
                      </td>
                    </tr>
                  )}
                  {isError && (
                    <tr>
                      <td colSpan={9} className="text-center">
                        <p className="text-sm font-medium text-center py-4 text-gray-600">
                          Erro ao buscar dados
                        </p>
                      </td>
                    </tr>
                  )}
                  {isEmpty && (
                    <tr>
                      <td colSpan={9} className="text-center">
                        <p className="text-sm font-medium text-center py-4 text-gray-600">
                          Lista vazia
                        </p>
                      </td>
                    </tr>
                  )}
                  {payments.map(
                    ({
                      id,
                      createdAt,
                      date,
                      status,
                      externalId,
                      amount,
                      debtor,
                      provider,
                    }) => (
                      <tr
                        key={id}
                        onClick={accessPayment(id)}
                        className="hover:bg-gray-200 cursor-pointer"
                      >
                        <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <div className="truncate w-24">{externalId}</div>
                        </td>
                        <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          <span className="flex items-center ml-3 font-bold text-gray-600">
                            {createdAt
                              ? new Date(createdAt).toLocaleString('pt-BR')
                              : ''}
                          </span>
                        </td>
                        <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          <span className="flex items-center ml-3 font-bold text-gray-600">
                            {date
                              ? formatInTimeZone(
                                  toDate(date),
                                  'America/Sao_Paulo',
                                  'dd/MM/yyyy'
                                )
                              : ''}
                          </span>
                        </td>
                        <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <div className="flex items-center ml-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={
                                isImage(debtor?.bank?.avatar)
                                  ? debtor?.bank?.avatar
                                  : '/logo.png'
                              }
                              className="w-8 mr-2"
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null
                                currentTarget.src = '/logo.png'
                              }}
                              alt="Bank"
                            />
                            <span className="font-medium">
                              {debtor?.bank?.name}
                            </span>
                          </div>
                        </td>
                        <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <div className="flex items-center ml-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={
                                isImage(provider?.avatar)
                                  ? provider?.avatar
                                  : '/logo.png'
                              }
                              className="w-8 mr-2"
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null
                                currentTarget.src = '/logo.png'
                              }}
                              alt="Provider"
                            />
                            <span className="font-medium">
                              {provider?.tradeName}
                            </span>
                          </div>
                        </td>
                        <td
                          className={
                            'font-medium border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ' +
                            getPaymentStatusColor(status)
                          }
                        >
                          <span className="p-2 rounded-md bg-stone-200">
                            {status}
                          </span>
                        </td>
                        <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {amount
                            ? Number(amount / 100).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              })
                            : 'N/A'}
                        </td>
                      </tr>
                    )
                  )}
                  {isRefreshing && (
                    <tr>
                      <td colSpan={9} className="text-center">
                        <p className="text-sm font-medium text-center py-4 text-gray-600">
                          Atualizando...
                        </p>
                      </td>
                    </tr>
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

export default Payments
