import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import omit from 'lodash.omit'
import { toast } from 'react-toastify'

import { fetcher } from 'utils/fetcher'

import { OrgForm } from 'components/OrgForm'
import { Panel } from 'components/Panel'
import { useOrg } from 'dataHooks/org'

function Org() {
  const router = useRouter()
  const [disabled, setDisabled] = useState(true)
  const orgId = router?.query?.orgId
  const { org, isLoading, isError, mutate } = useOrg({ orgId })

  const onSubmit = async (data) => {
    const body = omit(data, [
      'id',
      'createdAt',
      'updatedAt',
      'customers',
      'platformUsers',
      'applications',
    ])

    const result = await fetcher({
      path: `/orgs/${orgId}`,
      body,
      method: 'PATCH',
    })

    mutate(result)
    setDisabled(true)
    toast.success('Sucesso!')
  }

  return (
    <>
      <Head>
        <title>{org?.name || ''} Organização - Backoffice Iniciador</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        {isLoading && (
          <p className="text-sm font-medium text-center py-4 text-gray-600">
            Carregando...
          </p>
        )}
        {isError && (
          <p className="text-sm font-medium text-center py-4 text-gray-600">
            Erro ao buscar dados
          </p>
        )}
        {!isLoading && !org && (
          <p className="text-sm font-medium text-center py-4 text-gray-600">
            Não foi possivel carregar a organização.
          </p>
        )}
        {!isLoading && (
          <>
            <OrgForm
              disabled={disabled}
              setDisabled={setDisabled}
              org={org}
              onSubmit={onSubmit}
            />

            {!!org?.customers?.length && (
              <Panel title="Clientes dessa organização">
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4 lg:px-10 py-10">
                  {org?.customers.map((item, index) => (
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
                              {item?.tradeName}
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
                          <p className="text-gray-600 text-sm">
                            <b>Nome:</b> {item.name}
                          </p>
                        )}
                        {!!item?.description && (
                          <p className="text-gray-600 text-sm">
                            <b>Descrição:</b> {item.description}
                          </p>
                        )}
                        {!!item?.mainColor && (
                          <p className="text-gray-600 text-sm">
                            <b>Cor principal:</b> {item.mainColor}
                          </p>
                        )}
                        {!!item?.email && (
                          <p className="text-gray-600 text-sm">
                            <b>Email:</b> {item.email}
                          </p>
                        )}
                        {!!item?.email && (
                          <p className="text-gray-600 text-sm">
                            <b>Nome representante:</b>{' '}
                            {item?.representative?.name}
                          </p>
                        )}
                        {!!item?.email && (
                          <p className="text-gray-600 text-sm">
                            <b>Email representante:</b>{' '}
                            {item?.representative?.email}
                          </p>
                        )}
                        {!!item?.email && (
                          <p className="text-gray-600 text-sm">
                            <b>Telefone representante:</b>{' '}
                            {item?.representative?.phone}
                          </p>
                        )}
                        {!!item?.fee && (
                          <p className="text-gray-600 text-sm">
                            <b>Tarifa:</b>{' '}
                            {Number(item?.fee / 100).toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            )}

            {!!org?.applications?.length && (
              <Panel title="Apps dessa organização">
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4 lg:px-10 py-10">
                  {org?.applications.map((item, index) => (
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
                              {item?.name}
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
                          <p className="text-gray-600 text-sm">
                            <b>Nome:</b> {item.name}
                          </p>
                        )}
                        {!!item?.description && (
                          <p className="text-gray-600 text-sm">
                            <b>Descrição:</b> {item.description}
                          </p>
                        )}
                        {!!item?.mainColor && (
                          <p className="text-gray-600 text-sm">
                            <b>Cor principal:</b> {item.mainColor}
                          </p>
                        )}
                        {!!item?.fee && (
                          <p className="text-gray-600 text-sm">
                            <b>Tarifa:</b>{' '}
                            {Number(item?.fee / 100).toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            )}

            {!!org?.platformUsers?.length && (
              <Panel title="Usuários dessa organização">
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4 lg:px-10 py-10">
                  {org?.platformUsers.map((item, index) => (
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
                              {item?.name}
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
                        {!!item?.email && (
                          <p className="text-gray-600 text-sm">
                            <b>Email:</b> {item.email}
                          </p>
                        )}
                        <p className="text-gray-600 text-sm">
                          <b>Criado em:</b>{' '}
                          {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                        <p className="text-gray-600 text-sm">
                          <b>2FA:</b> {item.enable2FA ? 'Sim' : 'Não'}
                        </p>
                        {!!item?.role && (
                          <p className="text-gray-600 text-sm">
                            <b>Função:</b> {item.role}
                          </p>
                        )}
                        {!!item?.description && (
                          <p className="text-gray-600 text-sm">
                            <b>Descrição:</b> {item.description}
                          </p>
                        )}
                        {!!item?.description && (
                          <p className="text-gray-600 text-sm">
                            <b>Descrição:</b> {item.description}
                          </p>
                        )}
                        {!!item?.mainColor && (
                          <p className="text-gray-600 text-sm">
                            <b>Cor principal:</b> {item.mainColor}
                          </p>
                        )}
                        {!!item?.fee && (
                          <p className="text-gray-600 text-sm">
                            <b>Tarifa:</b>{' '}
                            {Number(item?.fee / 100).toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Org
