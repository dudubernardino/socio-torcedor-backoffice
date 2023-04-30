import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { JSONTree } from 'react-json-tree'

import { JSONStringify } from 'utils/JSONStringify'
import { formatTaxId } from 'utils/formatTaxId'
import accountTypes from 'utils/accountTypes.json'

import { usePayment } from 'dataHooks/payment'

import { Events } from 'components/Events'
import { WebhooksEvents } from 'components/WebhooksEvents'

function Payment() {
  const router = useRouter()
  const paymentId = router?.query?.paymentId
  const { payment, isLoading, isError } = usePayment({ paymentId })
  const getAccountTypeName = (value) =>
    value ? accountTypes.find((item) => item.value === value)?.label : null

  return (
    <>
      <Head>
        <title>{`Iniciação ${payment?.id}`} - Backoffice Sócio API</title>
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
        {!isLoading && !payment && (
          <p className="text-sm font-medium text-center py-4 text-gray-600">
            Não foi possivel carregar a iniciação.
          </p>
        )}
        {!isLoading && (
          <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                  <div className="text-left flex">
                    <h6 className="text-gray-700 text-xl font-bold">
                      Iniciação
                    </h6>
                  </div>
                </div>

                <div className="flex-auto px-4 py-4">
                  <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase px-4">
                    Identificadores
                  </h6>
                  <div className="flex flex-wrap">
                    {/* ITEMS */}
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          id
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {payment?.id || '-'}
                        </p>
                      </div>
                    </div>

                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          client id
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {payment?.clientId || '-'}
                        </p>
                      </div>
                    </div>

                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          external id
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {payment?.externalId || '-'}
                        </p>
                      </div>
                    </div>

                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          consent id
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {payment?.consentId || '-'}
                        </p>
                      </div>
                    </div>

                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          payment id
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {payment?.paymentId || '-'}
                        </p>
                      </div>
                    </div>

                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          endToEnd Id
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {payment?.endToEndId || '-'}
                        </p>
                      </div>
                    </div>

                    {/* END ITEMS */}
                  </div>
                </div>

                <hr className="my-6 border-b-1 border-gray-300" />

                <Events events={payment?.events} />

                <hr className="my-6 border-b-1 border-gray-300" />

                <WebhooksEvents paymentInitiationId={payment?.id} />

                <div className="flex-auto px-4 py-4">
                  <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase px-4">
                    Informações do pagamento
                  </h6>
                  <div className="flex flex-wrap">
                    {/* ITEMS */}
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          criado em
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {new Date(payment?.createdAt).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          data
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {payment?.date}
                        </p>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          valor
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {payment?.amount
                            ? Number(payment?.amount / 100).toLocaleString(
                                'pt-BR',
                                { style: 'currency', currency: 'BRL' }
                              )
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          Tarifa
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {payment?.fee
                            ? Number(payment?.fee / 100).toLocaleString(
                                'pt-BR',
                                {
                                  style: 'currency',
                                  currency: 'BRL',
                                }
                              )
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          descrição Pix
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {payment?.descriptionPix || '-'}
                        </p>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          Método
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {payment?.method || '-'}
                        </p>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          status
                        </span>
                        <p className="text-gray-800 text-md font-bold">
                          {payment?.status || '-'}
                        </p>
                      </div>
                    </div>
                    {payment?.error && (
                      <div className="w-full px-4">
                        <div className="relative w-full mb-3">
                          <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                            Error
                          </span>
                          <p className="text-gray-800 text-md font-bold">
                            {JSONStringify(payment?.error)}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          chave pix - DICT
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {payment?.pixKey || '-'}
                        </p>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          url para redirecionamento
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {payment?.redirectURL || '-'}
                        </p>
                      </div>
                    </div>
                    {/* END ITEMS */}
                  </div>
                </div>

                <hr className="my-6 border-b-1 border-gray-300" />

                <div className="flex-auto px-4 py-4">
                  <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase px-4">
                    Dados bancários Recebedor
                  </h6>
                  <div className="flex flex-wrap">
                    {/* ITEMS */}
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          ISPB
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {payment?.creditor?.ispb || '-'}
                        </p>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          Agência
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {payment?.creditor?.issuer || '-'}
                        </p>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          Conta
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {payment?.creditor?.number || '-'}
                        </p>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          Nome
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {payment?.creditor?.name || '-'}
                        </p>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          CPF/CNPJ
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {formatTaxId(payment?.creditor?.taxId) || '-'}
                        </p>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          Tipo de conta
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {getAccountTypeName(payment?.creditor?.accountType) ||
                            '-'}
                        </p>
                      </div>
                    </div>
                    {/* END ITEMS */}
                  </div>
                </div>

                <hr className="my-6 border-b-1 border-gray-300" />
                <>
                  <div className="flex-auto px-4 py-4">
                    <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase px-4">
                      Dados bancários Pagador
                    </h6>
                    <div className="flex flex-wrap">
                      {/* ITEMS */}
                      <div className="w-full px-4">
                        <div className="relative w-full mb-3">
                          <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                            ISPB
                          </span>
                          <p className="text-gray-800 text-md font-medium">
                            {payment?.debtor?.ispb || '-'}
                          </p>
                        </div>
                      </div>
                      <div className="w-full px-4">
                        <div className="relative w-full mb-3">
                          <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                            Agência
                          </span>
                          <p className="text-gray-800 text-md font-medium">
                            {payment?.debtor?.issuer || '-'}
                          </p>
                        </div>
                      </div>
                      <div className="w-full px-4">
                        <div className="relative w-full mb-3">
                          <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                            Conta
                          </span>
                          <p className="text-gray-800 text-md font-medium">
                            {payment?.debtor?.number || '-'}
                          </p>
                        </div>
                      </div>
                      <div className="w-full px-4">
                        <div className="relative w-full mb-3">
                          <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                            Nome
                          </span>
                          <p className="text-gray-800 text-md font-medium">
                            {payment?.debtor?.name ||
                              payment?.user?.name ||
                              '-'}
                          </p>
                        </div>
                      </div>
                      <div className="w-full px-4">
                        <div className="relative w-full mb-3">
                          <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                            CPF/CNPJ
                          </span>
                          <p className="text-gray-800 text-md font-medium">
                            {payment?.debtor?.taxId ||
                              formatTaxId(payment?.user?.taxId) ||
                              '-'}
                          </p>
                        </div>
                      </div>
                      <div className="w-full px-4">
                        <div className="relative w-full mb-3">
                          <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                            Tipo de conta
                          </span>
                          <p className="text-gray-800 text-md font-medium">
                            {getAccountTypeName(payment?.debtor?.accountType) ||
                              '-'}
                          </p>
                        </div>
                      </div>
                      {/* END ITEMS */}
                    </div>
                  </div>
                  <hr className="my-6 border-b-1 border-gray-300" />
                </>

                <div className="flex-auto px-4 py-4">
                  <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase px-4">
                    Raw data
                  </h6>
                  <JSONTree
                    data={payment}
                    hideRoot
                    sortObjectKeys
                    invertTheme
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Payment
