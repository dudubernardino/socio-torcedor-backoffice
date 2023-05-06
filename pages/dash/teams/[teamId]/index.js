import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import omit from 'lodash.omit'
import { toast } from 'react-toastify'

import { fetcher } from 'utils/fetcher'
import { eres } from 'utils/eres'
import { errorAlert } from 'utils/errorAlert'

import { Applications } from 'components/Applications'
import { useTeam } from 'dataHooks/team'
import { TeamForm } from 'components/TeamForm'

function Team() {
  const router = useRouter()
  const [disabled, setDisabled] = useState(true)
  const teamId = router?.query?.teamId
  const { team, isLoading, isError, mutate } = useTeam({
    teamId,
  })

  const onSubmit = async (data) => {
    const body = omit(data, ['id', 'createdAt', 'updatedAt', 'status'])

    const [error, result] = await eres(
      fetcher({ path: `/teams/${teamId}`, body, method: 'PATCH' })
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
        <title>{team?.name || 'Cliente'} - Backoffice Sócio API</title>
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
        {!isLoading && !team && (
          <p className="text-sm font-medium text-center py-4 text-gray-600">
            Não foi possivel carregar o cliente.
          </p>
        )}
        {!isLoading && (
          <>
            <TeamForm
              disabled={disabled}
              setDisabled={setDisabled}
              team={team}
              onSubmit={onSubmit}
            />
            <Applications teamId={teamId} />
          </>
        )}
      </div>
    </>
  )
}

export default Team
