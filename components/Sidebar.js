import React, { useEffect, useLayoutEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getCookie, deleteCookie } from 'cookies-next'
import { createPopup } from '@typeform/embed'
import '@typeform/embed/build/css/popup.css'
import { decodeJwt } from 'jose'
import { formatDistanceToNowStrict } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { JSONParse } from 'utils/JSONParse'
import { useInterval } from 'utils/useInterval'

export const useBrowserLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : () => {}

export const Sidebar = () => {
  const [collapseShow, setCollapseShow] = useState('hidden')
  const [payload, setPayload] = useState({})
  const [expireIn, setExpireIn] = useState(null)
  const router = useRouter()

  const email = getCookie('email')
  const data = getCookie('data')
  const jwt = getCookie('jwt')

  const resetCookies = () => {
    deleteCookie('jwt', { path: '/' })
    deleteCookie('email', { path: '/' })
    deleteCookie('data', { path: '/' })
  }

  const checkExpire = () => {
    if (!jwt) return
    const decodedJWT = decodeJwt(jwt)
    setExpireIn(new Date(decodedJWT?.exp * 1000))
  }

  useEffect(checkExpire, [jwt])

  useInterval(checkExpire, 30000)

  useBrowserLayoutEffect(() => {
    setPayload(JSONParse(data))
  }, [data])

  // Access control
  const hasPayments = [
    'INIC_ADMIN',
    'ORG_ADMIN',
    'ORG_OPERATOR',
    'CUSTOMER_ADMIN',
    'CUSTOMER_OPERATOR',
    'SUPER_ADMIN', //remove when update backend
  ].includes(payload?.role)

  const hasWebhooks = [
    'INIC_ADMIN',
    'ORG_ADMIN',
    'ORG_OPERATOR',
    'CUSTOMER_ADMIN',
    'CUSTOMER_OPERATOR',
    'SUPER_ADMIN', //remove when update backend
  ].includes(payload?.role)

  const hasCustomers = [
    'INIC_ADMIN',
    'ORG_ADMIN',
    'ORG_OPERATOR',
    'SUPER_ADMIN', //remove when update backend
  ].includes(payload?.role)

  const hasCustomerInfoOnly = ['CUSTOMER_ADMIN'].includes(payload?.role)

  const hasUsers = [
    'INIC_ADMIN',
    'ORG_ADMIN',
    'CUSTOMER_ADMIN',
    'SUPER_ADMIN', //remove when update backend
  ].includes(payload?.role)

  const hasBilling = [
    'INIC_ADMIN',
    'ORG_ADMIN',
    'SUPER_ADMIN', //remove when update backend
  ].includes(payload?.role)

  const hasOrgs = [
    'INIC_ADMIN',
    'SUPER_ADMIN', //remove when update backend
  ].includes(payload?.role)

  const hasReports =
    ['INIC_ADMIN', 'SUPER_ADMIN'].includes(payload?.role) ||
    (payload?.role === 'ORG_ADMIN' &&
      payload?.organizationType === 'LICENSE_OWNER')

  const handleLogOut = async (event) => {
    event.preventDefault()

    console.log('you are logged out')
    resetCookies()
    router.push('/')
  }

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <i className="fas fa-bars"></i>
          </button>

          <Link
            href="/"
            className="flex items-center md:pb-2 text-gray-600 mr-0 whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
          >
            {/* Brand */}
            {payload?.provider?.avatar && (
              <img
                src={payload?.provider?.avatar}
                width={40}
                height={40}
                className="rounded-full mr-2"
                alt="Logo"
              />
            )}
            <span className="truncate block">
              Backoffice {payload?.provider?.name || 'Iniciador'}
            </span>
          </Link>
          <p className="py-2 text-sm font-medium">
            Boas vindas, {(payload?.name || '').split(' ')[0]}
          </p>
          {expireIn && (
            <p className="py-2 text-xs font-light">
              Sua sessão expira em{' '}
              <span className="text-red-800">
                {formatDistanceToNowStrict(expireIn, { locale: ptBR })}
              </span>
            </p>
          )}
          {/* Collapse */}
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    href="/"
                    className="md:block text-left md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  >
                    Backoffice Iniciador
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />

            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {/* <li className="items-center">
              <Link href="/dash">
                <a
                  className={
                    'text-xs uppercase py-3 font-bold block ' +
                    (router.pathname === '/dash'
                      ? 'text-blue-500 hover:text-blue-600'
                      : 'text-gray-700 hover:text-gray-500')
                  }
                >
                  <i
                    className={
                      'fas fa-tv mr-2 text-sm ' +
                      (router.pathname === '/dash'
                        ? 'opacity-75'
                        : 'text-gray-300')
                    }
                  ></i>{' '}
                  Backoffice
                </a>
              </Link>
            </li> */}
              {hasPayments && (
                <li className="items-center">
                  <Link
                    href="/dash/payments"
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/dash/payments') !== -1
                        ? 'text-blue-500 hover:text-blue-600'
                        : 'text-gray-700 hover:text-gray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-table mr-2 text-sm ' +
                        (router.pathname.indexOf('/dash/payments') !== -1
                          ? 'opacity-75'
                          : 'text-gray-300')
                      }
                    ></i>{' '}
                    Iniciações
                  </Link>
                </li>
              )}
              {hasCustomers && (
                <li className="items-center">
                  <Link
                    href="/dash/customers"
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/dash/customers') !== -1
                        ? 'text-blue-500 hover:text-blue-600'
                        : 'text-gray-700 hover:text-gray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-users mr-2 text-sm ' +
                        (router.pathname.indexOf('/dash/customers') !== -1
                          ? 'opacity-75'
                          : 'text-gray-300')
                      }
                    ></i>{' '}
                    Clientes
                  </Link>
                </li>
              )}

              {hasCustomerInfoOnly && (
                <li className="items-center">
                  <Link
                    href={`/dash/customers/${payload?.customerId}`}
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/dash/customers') !== -1
                        ? 'text-blue-500 hover:text-blue-600'
                        : 'text-gray-700 hover:text-gray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-building mr-2 text-sm ' +
                        (router.pathname.indexOf('/dash/customers') !== -1
                          ? 'opacity-75'
                          : 'text-gray-300')
                      }
                    ></i>{' '}
                    Minha empresa / apps
                  </Link>
                </li>
              )}

              {hasUsers && (
                <li className="items-center">
                  <Link
                    href="/dash/users"
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/dash/users') !== -1
                        ? 'text-blue-500 hover:text-blue-600'
                        : 'text-gray-700 hover:text-gray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-users-rectangle mr-2 text-sm ' +
                        (router.pathname.indexOf('/dash/users') !== -1
                          ? 'opacity-75'
                          : 'text-gray-300')
                      }
                    ></i>{' '}
                    Usuários
                  </Link>
                </li>
              )}
              {hasOrgs && (
                <li className="items-center">
                  <Link
                    href="/dash/orgs"
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/dash/orgs') !== -1
                        ? 'text-blue-500 hover:text-blue-600'
                        : 'text-gray-700 hover:text-gray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-users-rays mr-2 text-sm ' +
                        (router.pathname.indexOf('/dash/orgs') !== -1
                          ? 'opacity-75'
                          : 'text-gray-300')
                      }
                    ></i>{' '}
                    Orgs
                  </Link>
                </li>
              )}
              {hasBilling && (
                <li className="items-center">
                  <Link
                    href="/dash/billing"
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/dash/billing') !== -1
                        ? 'text-blue-500 hover:text-blue-600'
                        : 'text-gray-700 hover:text-gray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-money-bills mr-2 text-sm ' +
                        (router.pathname.indexOf('/dash/billing') !== -1
                          ? 'opacity-75'
                          : 'text-gray-300')
                      }
                    ></i>{' '}
                    Faturamento{' '}
                  </Link>
                </li>
              )}
              {hasWebhooks && (
                <li className="items-center">
                  <Link
                    href="/dash/webhooks"
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/dash/webhooks') !== -1
                        ? 'text-blue-500 hover:text-blue-600'
                        : 'text-gray-700 hover:text-gray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-gear mr-2 text-sm ' +
                        (router.pathname.indexOf('/dash/webhooks') !== -1
                          ? 'opacity-75'
                          : 'text-gray-300')
                      }
                    ></i>{' '}
                    Webhooks Logs{' '}
                    <span className="font-medium text-xs leading-5 rounded-full text-sky-600 bg-sky-400/10 px-2 py-0.5 dark:text-sky-400">
                      beta
                    </span>
                  </Link>
                </li>
              )}
              {hasReports && (
                <li className="items-center">
                  <Link
                    href="/dash/reports"
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/dash/reports') !== -1
                        ? 'text-blue-500 hover:text-blue-600'
                        : 'text-gray-700 hover:text-gray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-file mr-2 text-sm ' +
                        (router.pathname.indexOf('/dash/reports') !== -1
                          ? 'opacity-75'
                          : 'text-gray-300')
                      }
                    ></i>{' '}
                    Relatório
                  </Link>
                </li>
              )}
              <li className="items-center">
                <Link
                  href="/dash/2fa"
                  className={
                    'text-xs uppercase py-3 font-bold block ' +
                    (router.pathname.indexOf('/dash/2fa') !== -1
                      ? 'text-blue-500 hover:text-blue-600'
                      : 'text-gray-700 hover:text-gray-500')
                  }
                >
                  <i
                    className={
                      'fas fa-lock mr-2 text-sm ' +
                      (router.pathname.indexOf('/dash/2fa') !== -1
                        ? 'opacity-75'
                        : 'text-gray-300')
                    }
                  ></i>{' '}
                  <i
                    className={`fas fa-circle ${
                      payload?.enable2FA ? 'text-green-400' : 'text-red-400'
                    } mr-2`}
                  />
                  2fa{' '}
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Suporte
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="inline-flex">
                <button
                  className="text-gray-700 hover:text-gray-500 text-sm block mb-4 no-underline font-semibold"
                  onClick={() =>
                    createPopup('oU8lhsAX', {
                      size: 90,
                      medium: 'chamado',
                      hidden: {
                        email,
                        nome: payload?.name,
                        cliente: payload?.provider?.name,
                        funcao: payload?.role,
                        id: payload?.id,
                        customerid: payload?.customerId,
                        organizationid: payload?.organizationId,
                        ticket: `${new Date()
                          .toISOString()
                          .split('T')[0]
                          .replaceAll('-', '')}${btoa(
                          Math.random().toString()
                        ).substring(10, 5)}`,
                      },
                    }).open()
                  }
                >
                  <i className="fas fa-ticket mr-2 text-gray-300 text-base"></i>
                  Criar ticket
                </button>
              </li>
              <li className="items-center">
                <Link
                  href="/dash/sla"
                  className={
                    'text-xs uppercase py-3 font-bold block ' +
                    (router.pathname.indexOf('/dash/sla') !== -1
                      ? 'text-blue-500 hover:text-blue-600'
                      : 'text-gray-700 hover:text-gray-500')
                  }
                >
                  <i
                    className={
                      'fas fa-table mr-2 text-sm ' +
                      (router.pathname.indexOf('/dash/sla') !== -1
                        ? 'opacity-75'
                        : 'text-gray-300')
                    }
                  ></i>{' '}
                  SLA
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Documentação
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="inline-flex">
                <a
                  href="https://docs.iniciador.com.br/docs"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 hover:text-gray-500 text-sm block mb-4 no-underline font-semibold"
                >
                  <i className="fas fa-link mr-2 text-gray-300 text-base"></i>
                  Guides
                </a>
              </li>
              <hr className="my-4 md:min-w-full" />
              <li className="items-center">
                <button
                  className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}