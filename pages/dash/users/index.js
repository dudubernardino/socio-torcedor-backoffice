import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import groupBy from 'lodash.groupby'

import { JSONParse } from 'utils/JSONParse'
import { formatRole } from 'utils/formatRole'

import { useUsers } from 'dataHooks/users'
import { getMembershipStatusColor } from 'utils/getMembershipStatusColor'

const Users = ({ data }) => {
  const router = useRouter()
  const { users = [], isLoading, isError, isEmpty } = useUsers()

  const accessUser = (userId) => (event) => {
    event.preventDefault()
    if (data?.role === 'INIC_ADMIN') return

    router.push(`/dash/users/${userId}`)
  }

  const filteredUsers = users.map((user) => {
    if (!user?.team?.name) return { ...user, 'team.name': '' }
    return user
  })
  const groupedUsers = groupBy(filteredUsers, 'team.name')

  return (
    <>
      <Head>
        <title>Usuários - Backoffice Sócio API</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex items-center">
            <h2 className="text-xl text-gray-800 font-semibold py-4 mr-3">
              Usuários
            </h2>
            <Link
              href="/dash/users/new"
              className="bg-gray-700 h-8 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Registrar novo
            </Link>
          </div>

          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      nome
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      time
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      cpf
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      status
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      sócio desde
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      validade sócio
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
                  {Object.entries(groupedUsers)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([teamName, users]) => (
                      <>
                        <tr>
                          <td colSpan={5} className="text-left">
                            <p className="text-sm font-medium  py-4 text-gray-600">
                              {teamName || 'Seus usuários'}
                            </p>
                          </td>
                        </tr>

                        {users.map(
                          ({
                            id,
                            createdAt,
                            name,
                            taxId,
                            team,
                            memberships,
                          }) => (
                            <tr
                              key={id}
                              onClick={accessUser(id)}
                              className="hover:bg-gray-200 cursor-pointer"
                            >
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {name}
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {team?.name ?? '-'}
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {taxId}
                              </td>
                              {!!memberships.length ? (
                                <td
                                  className={
                                    'font-medium border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ' +
                                    getMembershipStatusColor(
                                      memberships[0].status
                                    )
                                  }
                                >
                                  <span className="p-2 rounded-md bg-stone-200">
                                    {memberships[0].status}
                                  </span>
                                </td>
                              ) : (
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  -
                                </td>
                              )}
                              {!!memberships.length ? (
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  {new Date(
                                    memberships[0].registrationDate
                                  ).toLocaleDateString('pt-BR')}
                                </td>
                              ) : (
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  -
                                </td>
                              )}
                              {!!memberships.length ? (
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  {new Date(
                                    memberships[0].dueDate
                                  ).toLocaleDateString('pt-BR')}
                                </td>
                              ) : (
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  -
                                </td>
                              )}
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

export default Users

export const getServerSideProps = async ({ req, res }) => {
  const data = getCookie('data', { req, res }) || {}

  return {
    props: {
      data: JSONParse(data),
    },
  }
}
