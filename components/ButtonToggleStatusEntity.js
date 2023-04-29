import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { getCookie } from 'cookies-next'

import { eres } from 'utils/eres'
import { fetcher } from 'utils/fetcher'
import { errorAlert } from 'utils/errorAlert'
import { JSONParse } from 'utils/JSONParse'

export const ButtonToggleStatusEntity = ({
  entityName,
  id,
  status: initialStatus,
  endpoint: initialEndpoint,
  has2FA,
  callback,
}) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [token2fa, setToken2fa] = useState('')
  const [status, setStatus] = useState(initialStatus)
  const data = JSONParse(getCookie('data'))
  const isCustomerOwner = entityName === 'customers' && !!data?.customerId
  const isUserOwner = data?.id === id
  const buttonRef = useRef(null)

  const handleClick = async () => {
    const isEnabled = status === 'ACTIVE'
    const endpoint = initialEndpoint ? initialEndpoint : `/${entityName}/${id}`
    const path = `${endpoint}/${isEnabled ? 'disable' : 'enable'}`
    const body = has2FA ? { token2fa } : null
    const [error] = await eres(fetcher({ path, body, method: 'POST' }))

    if (error) {
      return errorAlert(error)
    }

    toast.success('Sucesso!')
    setOpenDialog(false)
    setLoading(false)
    setStatus(isEnabled ? 'INACTIVE' : 'ACTIVE')

    if (callback) {
      callback()
    }
  }

  if (isCustomerOwner) return
  if (isUserOwner) return

  return (
    <>
      <Transition.Root as={Fragment} show={openDialog}>
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
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
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
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Confirme sua ação
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Você deseja{' '}
                            <b>
                              {status === 'ACTIVE' ? 'desativar' : 'ativar'}
                            </b>{' '}
                            esse registro?
                          </p>
                          {has2FA && (
                            <input
                              className="block p-2 pl-6 pr-6 mt-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                              type="text"
                              placeholder="Token 2FA"
                              autoFocus
                              onChange={(e) => setToken2fa(e.target.value)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:justify-end sm:px-6">
                    <>
                      <button
                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpenDialog(false)}
                        ref={buttonRef}
                        type="button"
                      >
                        Voltar
                      </button>
                      <button
                        className={`mt-3 sm:mt-0  inline-flex w-full justify-center rounded-md border border-transparent ${
                          status === 'ACTIVE' ? 'bg-red-600' : 'bg-green-600'
                        }  px-4 py-2 text-base font-medium text-white shadow-sm ${
                          status === 'ACTIVE'
                            ? 'hover:bg-red-700'
                            : 'hover:bg-green-700'
                        } focus:outline-none focus:ring-2 ${
                          status === 'ACTIVE'
                            ? 'focus:ring-red-500'
                            : 'focus:ring-green-500'
                        } focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
                        type="button"
                        onClick={handleClick}
                      >
                        {status === 'ACTIVE' ? 'desativar' : 'ativar'}
                      </button>
                    </>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <button
        onClick={() => setOpenDialog(true)}
        className={`${
          status === 'ACTIVE' ? 'bg-red-700' : 'bg-green-700'
        } active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150`}
        type="button"
      >
        {loading
          ? 'Carregando...'
          : status === 'ACTIVE'
          ? 'Desativar'
          : 'Ativar'}
      </button>
    </>
  )
}
