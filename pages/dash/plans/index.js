import React from 'react'
import Head from 'next/head'

import { usePlans } from 'dataHooks/plans'
import { Plans } from 'components/Plans'

function PlansHome() {
  const { plans, isLoading, isError, isEmpty, mutate } = usePlans({})

  return (
    <>
      <Head>
        <title>Planos - Backoffice Sócio API</title>
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
        {!isLoading && !plans && (
          <p className="text-sm font-medium text-center py-4 text-gray-600">
            Não foi possivel carregar o cliente.
          </p>
        )}
        {!isLoading && (
          <>
            <Plans
              plans={plans}
              isLoading={isLoading}
              isEmpty={isEmpty}
              isError={isError}
              mutate={mutate}
            />
          </>
        )}
      </div>
    </>
  )
}

export default PlansHome
