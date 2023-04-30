import React, { useState } from 'react'
import Head from 'next/head'
import { toast } from 'react-toastify'
import { setCookie, getCookie } from 'cookies-next'

import { eres } from 'utils/eres'
import { fetcher } from 'utils/fetcher'
import { JSONParse } from 'utils/JSONParse'
import { errorAlert } from 'utils/errorAlert'

import { TwoFASetupInfo } from 'components/TwoFASetupInfo'

function TwoFA({ data }) {
  const [has2FARegister, set2FARegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const [enable2FA, setEnable2FA] = useState(data?.enable2FA)

  const [code, setCode] = useState('')

  const enable2FACode = async () => {
    if (!code) return toast.error('Código 2FA não pode ser vazio')
    const [error, result] = await eres(
      fetcher({ path: `/2fa/enable?code=${code}`, method: 'POST' })
    )
    if (error) {
      return errorAlert(error)
    }
    if (!result) return toast.error('Código 2FA inválido')
    toast.success('Código 2FA válido')
    setCookie('data', { ...data, enable2FA: true })
    setLoading(false)
    set2FARegister(false)
    setEnable2FA(true)
  }

  return (
    <>
      <Head>
        <title>2FA - Backoffice Sócio API</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        <div className="px-4 md:px-10 mx-auto w-full bg-gray-100 py-6">
          <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-700 text-xl font-bold">
                  Autenticação em 2 fatores
                </h6>
              </div>
            </div>
            <div className="flex-auto px-6 py-10 pt-0">
              {loading ? (
                <p>Carregando...</p>
              ) : (
                <div>
                  {!enable2FA && (
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
                        Atenção! Habilite o 2FA para realizar operações de forma
                        segura no Backoffice. <br />
                        Valide o código 2FA para confirmar a sua autenticação.
                      </p>
                    </div>
                  )}

                  {enable2FA && (
                    <p className="mt-2">
                      <b>Parabéns!</b> Sua autenticação em 2 fatores está
                      habilitada. Caso tenha problemas entre em contato.
                    </p>
                  )}

                  <div className="mt-2">
                    {!enable2FA && !has2FARegister && (
                      <button
                        className="bg-gray-700 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => set2FARegister(true)}
                      >
                        Habilitar
                      </button>
                    )}

                    {has2FARegister && (
                      <>
                        <TwoFASetupInfo />
                        <div className="pt-4 max-w-sm">
                          <p className="text-gray-700 text-sm font-medium mb-2">
                            Valide seu Código 2FA
                          </p>
                          <div className="flex items-center">
                            <input
                              className="border-0 px-3 py-1.5 mr-1 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                              type="text"
                              placeholder="234231"
                              onChange={(e) => setCode(e.target.value)}
                            />
                            <button
                              className="bg-gray-700 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => enable2FACode()}
                            >
                              Validar
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TwoFA

export const getServerSideProps = async ({ req, res }) => {
  const data = getCookie('data', { req, res }) || {}

  return {
    props: {
      data: JSONParse(data),
    },
  }
}
