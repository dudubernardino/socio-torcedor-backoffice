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
  const hasTeams = ['SUPER_ADMIN'].includes(payload?.role)

  const hasUsers = ['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(payload?.role)

  const hasPlans = ['ADMIN', 'MANAGER'].includes(payload?.role)

  const hasBilling = [
    'INIC_ADMIN',
    'ORG_ADMIN',
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
            <span className="truncate block">Backoffice Sócio API</span>
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
                    Backoffice Sócio API
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
              {hasTeams && (
                <li className="items-center">
                  <Link
                    href="/dash/teams"
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/dash/teams') !== -1
                        ? 'text-blue-500 hover:text-blue-600'
                        : 'text-gray-700 hover:text-gray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-futbol mr-2 text-sm ' +
                        (router.pathname.indexOf('/dash/teams') !== -1
                          ? 'opacity-75'
                          : 'text-gray-300')
                      }
                    ></i>{' '}
                    Times
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
              {hasPlans && (
                <li className="items-center">
                  <Link
                    href="/dash/plans"
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/dash/plans') !== -1
                        ? 'text-blue-500 hover:text-blue-600'
                        : 'text-gray-700 hover:text-gray-500')
                    }
                  >
                    <i
                      className={
                        'fas fa-money-check mr-2 text-sm ' +
                        (router.pathname.indexOf('/dash/plans') !== -1
                          ? 'opacity-75'
                          : 'text-gray-300')
                      }
                    ></i>{' '}
                    Planos
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
                  href="https://app.getpostman.com/run-collection/24863168-1e9bedb3-fa00-4efa-9a91-8c82f3cd39cf?action=collection%2Ffork&collection-url=entityId%3D24863168-1e9bedb3-fa00-4efa-9a91-8c82f3cd39cf%26entityType%3Dcollection%26workspaceId%3D449f39d5-fbc0-4907-b84a-8ecfc771c5f5"
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
