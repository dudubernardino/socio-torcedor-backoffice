import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import omit from 'lodash.omit'
import { toast } from 'react-toastify'

import { fetcher } from 'utils/fetcher'
import { eres } from 'utils/eres'
import { errorAlert } from 'utils/errorAlert'

import { CustomerForm } from 'components/CustomerForm'
import { Applications } from 'components/Applications'
import { useCustomer } from 'dataHooks/customer'

function Customer() {
  const router = useRouter()
  const [disabled, setDisabled] = useState(true)
  const customerId = router?.query?.customerId
  const { customer, isLoading, isError, mutate } = useCustomer({
    customerId,
  })

  const onSubmit = async (data) => {
    const body = omit(data, ['id', 'createdAt', 'updatedAt', 'status'])

    const [error, result] = await eres(
      fetcher({ path: `/customers/${customerId}`, body, method: 'PATCH' })
    )

    if (error) {
      return errorAlert(error)
    }

    mutate(result)
    setDisabled(true)
    toast.success('Sucesso!')
  }

  return (
    <>
      <Head>
        <title>{customer?.name || 'Cliente'} - Backoffice Sócio API</title>
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
        {!isLoading && !customer && (
          <p className="text-sm font-medium text-center py-4 text-gray-600">
            Não foi possivel carregar o cliente.
          </p>
        )}
        {!isLoading && (
          <>
            <CustomerForm
              disabled={disabled}
              setDisabled={setDisabled}
              customer={customer}
              onSubmit={onSubmit}
            />
            <Applications customerId={customerId} />
          </>
        )}
      </div>
    </>
  )
}

export default Customer
