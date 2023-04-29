import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import omit from 'lodash.omit'
import { toast } from 'react-toastify'

import { fetcher } from 'utils/fetcher'
import { eres } from 'utils/eres'
import { errorAlert } from 'utils/errorAlert'

import { useApplication } from 'dataHooks/application'
import { ApplicationForm } from 'components/ApplicationForm'
import { removeEmptyFields } from 'utils/removeEmptyFields'

function Application({ banks }) {
  const router = useRouter()
  const [disabled, setDisabled] = useState(true)
  const customerId = router?.query?.customerId
  const applicationId = router?.query?.applicationId
  const { application, isLoading, isError, mutate } = useApplication({
    customerId,
    applicationId,
  })

  const onSubmit = async (data) => {
    const body = removeEmptyFields({
      ...omit(data, [
        'id',
        'createdAt',
        'updatedAt',
        'status',
        'clientId',
        'clientSecret',
        'customerId',
      ]),
      fee: data?.fee ? Math.trunc(Number(data.fee || 0) * 100) : null,
      paymentMethods: data.paymentMethods.map((i) => i?.value || i?.name),
    })

    const [error, result] = await eres(
      fetcher({
        path: `/customers/${customerId}/apps/${applicationId}`,
        body,
        method: 'PATCH',
      })
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
        <title>{application?.name || 'Aplicação'} - Backoffice Iniciador</title>
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
        {!isLoading && !application && (
          <p className="text-sm font-medium text-center py-4 text-gray-600">
            Não foi possivel carregar a aplicação.
          </p>
        )}
        {!isLoading && (
          <>
            <ApplicationForm
              disabled={disabled}
              setDisabled={setDisabled}
              application={application}
              onSubmit={onSubmit}
              banks={banks}
            />
          </>
        )}
      </div>
    </>
  )
}

export default Application

export const getServerSideProps = async ({ req, res }) => {
  const [, response] = await eres(
    fetch('https://static.u4c-iniciador.com.br/prod/banks.json')
  )
  const banks = await response.json()

  return {
    props: {
      banks,
    },
  }
}
