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

export const Plans = ({ plans, isLoading, isError, isEmpty, mutate }) => {
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
    const path = `/teams/${teamId}/apps/${appToRefresh.id}/refresh`
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
              Planos
            </h6>
            <div>
              <Link
                href={`/dash/plans/new-plan`}
                className="bg-gray-700 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              >
                Adicionar plano
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
              Adicione novos planos. <br />
            </p>
          </div>
        )}
        {isLoading && (
          <p className="text-sm text-center text-gray-600 py-4">
            Carregando...
          </p>
        )}

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4 lg:px-10 py-10">
          {plans?.map((item, index) => (
            <div key={item.id} className="rounded bg-white shadow-lg">
              <div className="px-6 py-4">
                <div className="flex items-center mb-2">
                  <p className="font-bold text-lg text-gray-700">
                    <span>{item?.name || `App ${index + 1}`}</span>
                  </p>
                </div>
                <p className="text-gray-600 text-base">
                  <b>Preço:</b>{' '}
                  {Number(item?.price).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
                {item?.description && (
                  <p className="text-gray-600 text-base">
                    <b>Descrição:</b> {item.description}
                  </p>
                )}
                <hr className="my-3 border-b-1 border-gray-300" />
                <div className="flex items-center mb-2">
                  <p className="font-bold text-lg text-gray-700">
                    <span>Setores</span>
                  </p>
                </div>
                <p className="text-gray-600 text-base">
                  {item?.sectors.map((sector) => (
                    <div key={sector.id}>
                      <b>Nome: {sector.name}</b>
                    </div>
                  ))}
                </p>
                <hr className="my-3 border-b-1 border-gray-300" />
                <h3 className="font-semibold text-gray-700 mb-2">Ações</h3>
                <Link
                  className="bg-gray-700 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mb-2"
                  type="button"
                  href={`/dash/plans/${item.id}`}
                >
                  Acessar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
