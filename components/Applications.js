import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'

import { useApplications } from 'dataHooks/applications'
import { formatTaxId } from 'utils/formatTaxId'
import { fetcher } from 'utils/fetcher'
import { eres } from 'utils/eres'
import { errorAlert } from 'utils/errorAlert'
import { ButtonToggleStatusEntity } from './ButtonToggleStatusEntity'

export const Applications = ({ customerId }) => {
  const {
    applications = [],
    isLoading,
    isError,
    isEmpty,
    mutate,
  } = useApplications({ customerId })
  const [open, setOpen] = useState(false)
  const [appToRefresh, setAppToRefresh] = useState(null)
  const [refreshSecret, setRefreshSecret] = useState(null)
  const [token2fa, setToken2fa] = useState('')

  const setOpenAndApp = (status, app) => {
    setOpen(status)
    setAppToRefresh(app)
  }

  const buttonRef = useRef(null)

  const onRefreshToken = async () => {
    const path = `/customers/${customerId}/apps/${appToRefresh.id}/refresh`
    const body = { token2fa }
    const [error, result] = await eres(fetcher({ path, body, method: 'POST' }))

    if (error) {
      return errorAlert(error)
    }

    setRefreshSecret(result?.clientSecret)
    toast.success('Sucesso!')
  }

  return (
    <div className="px-4 md:px-10 mx-auto w-full bg-gray-100 py-6">
      <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 id="keys" className="text-gray-700 text-xl font-bold">
              Aplicações - chaves de API
            </h6>
            <div>
              <Link
                href={`/dash/customers/${customerId}/new-app`}
                className="bg-gray-700 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              >
                Adicionar app
              </Link>
            </div>
          </div>
        </div>
        {isError && (
          <p className="text-sm text-center text-gray-600 py-4">
            Erro ao carregar aplicações
          </p>
        )}

        {isEmpty && (
          <div className="flex justify-center">
            <p className="text-md text-center max-w-lg text-gray-600 py-4">
              Habilite a API, adicionando uma aplicação. <br />
              Ao adicionar uma aplicação um clientId e clientSecret será gerado.
              Utilize para fazer chamadas em nossa API
            </p>
          </div>
        )}
        {isLoading && (
          <p className="text-sm text-center text-gray-600 py-4">
            Carregando...
          </p>
        )}

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4 lg:px-10 py-10">
          <Transition.Root as={Fragment} show={open}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={buttonRef}
              onClose={() => {}}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div
                            className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                              refreshSecret ? 'bg-green-100' : 'bg-red-100'
                            } sm:mx-0 sm:h-10 sm:w-10`}
                          >
                            {refreshSecret ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              {refreshSecret
                                ? 'Abaixo está seu novo client secret'
                                : 'Refresh do secret'}
                            </Dialog.Title>
                            <div className="mt-2">
                              {refreshSecret ? (
                                <>
                                  <p className="text-sm text-gray-500 mb-4">
                                    Guarde o client secret em um local seguro.
                                  </p>
                                  <p className="text-sm text-gray-800 font-bold">
                                    {refreshSecret}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p className="text-sm text-gray-500">
                                    Você deseja realizar o refresh do client
                                    secret?
                                  </p>
                                  <input
                                    className="block p-2 pl-6 pr-6 mt-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                                    type="text"
                                    placeholder="Token 2FA"
                                    autoFocus
                                    onChange={(e) =>
                                      setToken2fa(e.target.value)
                                    }
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:justify-end sm:px-6">
                        {refreshSecret ? (
                          <button
                            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => {
                              setOpen(false)
                              setTimeout(setRefreshSecret, 300)
                            }}
                            ref={buttonRef}
                            type="button"
                          >
                            Fechar
                          </button>
                        ) : (
                          <>
                            <button
                              className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                              onClick={() => setOpen(false)}
                              ref={buttonRef}
                              type="button"
                            >
                              Voltar
                            </button>
                            <button
                              className="mt-3 sm:mt-0  inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                              type="button"
                              onClick={onRefreshToken}
                            >
                              Sim
                            </button>
                          </>
                        )}
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
          {applications.map((item, index) => (
            <div key={item.id} className="rounded bg-white shadow-lg">
              <div className="px-6 py-4">
                <div className="flex items-center mb-2">
                  {!!item?.avatar && (
                    <img
                      src={item.avatar}
                      width="30"
                      className="rounded-full inline mr-2"
                    />
                  )}
                  <p className="font-bold text-lg text-gray-700">
                    <span>
                      {item?.name || `App ${index + 1}`}
                      {' - '}
                    </span>
                    {item?.status === 'INACTIVE' ? (
                      <>
                        <i className="fas fa-circle text-red-500 my-1"></i>{' '}
                        inativo
                      </>
                    ) : (
                      <>
                        <i className="fas fa-circle text-green-500 my-1"></i>{' '}
                        ativo
                      </>
                    )}
                  </p>
                </div>
                {!!item?.name && (
                  <p className="text-gray-600 text-base">
                    <b>Nome:</b> {item.name}
                  </p>
                )}
                {!!item?.description && (
                  <p className="text-gray-600 text-base">
                    <b>Descrição:</b> {item.description}
                  </p>
                )}
                {!!item?.mainColor && (
                  <p className="text-gray-600 text-base">
                    <b>Cor principal:</b> {item.mainColor}
                  </p>
                )}
                <p className="text-gray-600 text-base">
                  <b>ClientId:</b> {item.clientId}
                </p>
                {!!item?.paymentMethods && (
                  <p className="text-gray-600 text-base">
                    <b>Métodos de pagamento:</b>{' '}
                    {item?.paymentMethods.map((item) => item.name).join(', ')}
                  </p>
                )}
                {!!item?.fee && (
                  <p className="text-gray-600 text-base">
                    <b>Tarifa:</b>{' '}
                    {Number(item?.fee / 100).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                )}

                {item?.creditor?.taxId && (
                  <>
                    <hr className="my-3 border-b-1 border-gray-300" />
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Dados da conta
                    </h3>
                    <p className="text-gray-600 text-base">
                      <b>CNPJ:</b> {formatTaxId(item?.creditor?.taxId)}
                    </p>
                  </>
                )}
                {item?.creditor?.name && (
                  <p className="text-gray-600 text-base">
                    <b>Nome:</b> {item?.creditor?.name}
                  </p>
                )}
                {item?.creditor?.bankName && (
                  <p className="text-gray-600 text-base">
                    <b>Instituição:</b> {item?.creditor?.bankName}
                  </p>
                )}
                {item?.creditor?.issuer && (
                  <p className="text-gray-600 text-base">
                    <b>Agência:</b> {item?.creditor?.issuer}
                  </p>
                )}
                {item?.creditor?.number && (
                  <p className="text-gray-600 text-base">
                    <b>Conta:</b> {item?.creditor?.number}
                  </p>
                )}
                {item?.creditor?.accountType && (
                  <p className="text-gray-600 text-base">
                    <b>Tipo de conta:</b> {item?.creditor?.accountType}
                  </p>
                )}

                <hr className="my-3 border-b-1 border-gray-300" />
                <h3 className="font-semibold text-gray-700 mb-2">Ações</h3>
                <Link
                  className="bg-gray-700 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mb-2"
                  type="button"
                  href={`/dash/customers/${item.customerId}/apps/${item.id}`}
                >
                  Acessar
                </Link>
                <div>
                  {item?.status === 'ACTIVE' && (
                    <button
                      className="bg-gray-700 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mb-2"
                      type="button"
                      onClick={() => setOpenAndApp(true, item)}
                    >
                      Refresh de secret
                    </button>
                  )}
                  <ButtonToggleStatusEntity
                    endpoint={`/customers/${item.customerId}/apps/${item.id}`}
                    status={item?.status}
                    has2FA
                    callback={mutate}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
