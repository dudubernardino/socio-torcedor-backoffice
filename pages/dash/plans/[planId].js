import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { fetcher } from 'utils/fetcher'
import { eres } from 'utils/eres'
import { errorAlert } from 'utils/errorAlert'

import { removeEmptyFields } from 'utils/removeEmptyFields'
import { usePlan } from 'dataHooks/plan'
import { PlanForm } from 'components/PlanForm'

function Plan({}) {
  const router = useRouter()
  const [disabled, setDisabled] = useState(true)
  const planId = router?.query?.planId
  const { plan, isLoading, isError, mutate } = usePlan({
    planId,
  })

  const onSubmit = async (data) => {
    const body = removeEmptyFields(data)

    body.sectors = body.sectors?.map((sector) => sector.id)

    const [error, result] = await eres(
      fetcher({
        path: `/plans/${planId}`,
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
        <title>{plan?.name} - Backoffice Sócio API</title>
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
        {!isLoading && !plan && (
          <p className="text-sm font-medium text-center py-4 text-gray-600">
            Não foi possivel carregar a aplicação.
          </p>
        )}
        {!isLoading && (
          <>
            <PlanForm
              disabled={disabled}
              setDisabled={setDisabled}
              plan={plan}
              onSubmit={onSubmit}
            />
          </>
        )}
      </div>
    </>
  )
}

export default Plan
