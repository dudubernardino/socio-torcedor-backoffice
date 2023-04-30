import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useOrgs } from 'dataHooks/orgs'
import { formatTaxId } from 'utils/formatTaxId'

const Orgs = () => {
  const router = useRouter()
  const { orgs = [], isLoading, isError, isEmpty } = useOrgs()

  const accessOrg = (orgId) => (event) => {
    event.preventDefault()
    router.push(`/dash/orgs/${orgId}`)
  }

  return (
    <>
      <Head>
        <title>Organizações - Backoffice Sócio API</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex items-center">
            <h2 className="text-xl text-gray-800 font-semibold py-4 mr-3">
              Organizações
            </h2>
            <Link
              href="/dash/orgs/new"
              className="bg-gray-700 h-8 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Registrar nova
            </Link>
          </div>

          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Nome
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      CNPJ
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Representante
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Criado em
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Status
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
                  {orgs.map(
                    ({
                      id,
                      name,
                      taxId,
                      createdAt,
                      representative,
                      status,
                    }) => (
                      <tr
                        key={id}
                        onClick={accessOrg(id)}
                        className="hover:bg-gray-200 cursor-pointer"
                      >
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          <span className="ml-3 font-bold text-gray-600">
                            {name}
                          </span>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          {formatTaxId(taxId)}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {representative?.name} - {representative?.email}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          {new Date(createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {status === 'INACTIVE' && (
                            <>
                              <i className="fas fa-circle text-red-500 mr-2"></i>{' '}
                              inativo
                            </>
                          )}
                          {status === 'ACTIVE' && (
                            <>
                              <i className="fas fa-circle text-green-500 mr-2"></i>{' '}
                              ativo
                            </>
                          )}
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

export default Orgs
