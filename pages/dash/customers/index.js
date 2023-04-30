import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'

import { formatTaxId } from 'utils/formatTaxId'
import { JSONParse } from 'utils/JSONParse'

import { useCustomers } from 'dataHooks/customers'
import { useOrgs } from 'dataHooks/orgs'

const Customers = ({ data }) => {
  const router = useRouter()
  const [isInicAdmin] = useState(data?.role === 'INIC_ADMIN')
  const { customers = [], isLoading, isError, isEmpty } = useCustomers()
  const { orgs = [] } = useOrgs({ run: isInicAdmin })

  const accessCustomer = (customerId) => (event) => {
    event.preventDefault()
    router.push(`/dash/customers/${customerId}`)
  }

  const getOrgTradeName = (orgId) => {
    const org = orgs.find((org) => org.id === orgId)
    return org?.tradeName
  }

  return (
    <>
      <Head>
        <title>Clientes - Backoffice Sócio API</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex items-center">
            <h2 className="text-xl text-gray-800 font-semibold py-4 mr-3">
              Clientes
            </h2>
            <Link
              href="/dash/customers/new"
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
                      Nome
                    </th>
                    {isInicAdmin && (
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                        Org Name
                      </th>
                    )}
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      CNPJ
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Criado em
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Representante
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      Status
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
                  {customers.map(
                    ({
                      id,
                      organizationId,
                      tradeName,
                      taxId,
                      representative,
                      createdAt,
                      status,
                    }) => (
                      <tr
                        key={id}
                        onClick={accessCustomer(id)}
                        className="hover:bg-gray-200 cursor-pointer"
                      >
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                          <span className="font-bold text-gray-600">
                            {tradeName}
                          </span>
                        </td>
                        {isInicAdmin && (
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {getOrgTradeName(organizationId)}
                          </td>
                        )}
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {formatTaxId(taxId)}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {new Date(createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {representative?.name} - {representative?.email}
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

export default Customers

export const getServerSideProps = async ({ req, res }) => {
  const data = getCookie('data', { req, res }) || {}

  return {
    props: {
      currentUser: JSONParse(data),
    },
  }
}
