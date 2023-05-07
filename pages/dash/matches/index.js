import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import groupBy from 'lodash.groupby'

import { JSONParse } from 'utils/JSONParse'

import { getMembershipStatusColor } from 'utils/getMembershipStatusColor'
import Datepicker from 'react-tailwindcss-datepicker'
import { useMatches } from 'dataHooks/matches'
import { format, parseISO } from 'date-fns'

const Matches = () => {
  const router = useRouter()
  const [filterParams, setFilterParams] = useState(null)
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  })
  const {
    matches = [],
    isLoading,
    isError,
    isEmpty,
  } = useMatches({ filterParams })

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

  const accessMatch = (matchId) => (event) => {
    event.preventDefault()

    router.push(`/dash/matches/${matchId}`)
  }

  const filteredMatches = matches.map((match) => {
    if (!match?.stadium?.name) return { ...match, 'stadium.name': '' }
    return match
  })
  const groupedMatches = groupBy(filteredMatches, 'stadium.name')

  return (
    <>
      <Head>
        <title>Partidas - Backoffice Sócio API</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex items-center">
            <h2 className="text-xl text-gray-800 font-semibold py-4 mr-3">
              Partidas
            </h2>
            <Link
              href="/dash/matches/new"
              className="bg-gray-700 h-8 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Registrar nova
            </Link>
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
                placeholder="Buscar por IDs, Times, Estádios, etc"
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
                      Time Casa
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Time Fora
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Horário
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      criado em
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan={5} className="text-center">
                        <p className="text-sm font-medium text-center py-4 text-gray-600">
                          Carregando...
                        </p>
                      </td>
                    </tr>
                  )}
                  {isError && (
                    <tr>
                      <td colSpan={5} className="text-center">
                        <p className="text-sm font-medium text-center py-4 text-gray-600">
                          Erro ao buscar dados
                        </p>
                      </td>
                    </tr>
                  )}
                  {isEmpty && (
                    <tr>
                      <td colSpan={5} className="text-center">
                        <p className="text-sm font-medium text-center py-4 text-gray-600">
                          Lista vazia
                        </p>
                      </td>
                    </tr>
                  )}
                  {Object.entries(groupedMatches)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([stadiumName, matches]) => (
                      <>
                        <tr>
                          <td colSpan={5} className="text-left">
                            <p className="text-sm font-medium  py-4 text-gray-600">
                              {stadiumName || 'Seus usuários'}
                            </p>
                          </td>
                        </tr>

                        {matches.map(
                          ({
                            id,
                            createdAt,
                            homeTeam,
                            awayTeam,
                            startTime,
                          }) => (
                            <tr
                              key={id}
                              onClick={accessMatch(id)}
                              className="hover:bg-gray-200 cursor-pointer"
                            >
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {homeTeam}
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {awayTeam}
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {format(
                                  parseISO(startTime),
                                  "dd/MM/yyyy 'às' HH:MM:ss"
                                )}
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {new Date(createdAt).toLocaleDateString(
                                  'pt-BR'
                                )}
                              </td>
                            </tr>
                          )
                        )}
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Matches

export const getServerSideProps = async ({ req, res }) => {
  const data = getCookie('data', { req, res }) || {}

  return {
    props: {
      data: JSONParse(data),
    },
  }
}
