import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { getCookie } from 'cookies-next'

import { fetcher } from 'utils/fetcher'
import { eres } from 'utils/eres'
import { errorAlert } from 'utils/errorAlert'
import { JSONParse } from 'utils/JSONParse'

import { UserForm } from 'components/UserForm'

import { removeEmptyFields } from 'utils/removeEmptyFields'
import { useMatch } from 'dataHooks/match'
import { MatchForm } from 'components/MatchForm'

function User({ currentUser }) {
  const router = useRouter()
  const [disabled, setDisabled] = useState(true)
  const matchId = router?.query?.matchId
  const { match, isLoading, isError, mutate } = useMatch({ matchId })

  const [stadiums, setStadiums] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const [error, result] = await eres(fetcher({ path: '/stadiums' }))

      setStadiums(result)
    }

    fetch()
  }, [])

  const onSubmit = async (data) => {
    const body = removeEmptyFields(data)

    const startTime = `${body.dateTime.endDate} ${body.time}`

    body.startTime = startTime

    const [error, result] = await eres(
      fetcher({ path: `/matches/${matchId}`, body, method: 'PATCH' })
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
        <title>
          {match?.id ? `${match.homeTeam} x ${match.awayTeam}` : ''} -
          Backoffice Sócio API
        </title>
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
        {!isLoading && !match && (
          <p className="text-sm font-medium text-center py-4 text-gray-600">
            Não foi possivel carregar o usuário.
          </p>
        )}
        {!isLoading && (
          <MatchForm
            disabled={disabled}
            setDisabled={setDisabled}
            match={match}
            onSubmit={onSubmit}
            currentUser={currentUser}
            stadiums={stadiums}
          />
        )}
      </div>
    </>
  )
}

export default User

export const getServerSideProps = async ({ req, res }) => {
  const data = getCookie('data', { req, res }) || {}

  return {
    props: {
      currentUser: JSONParse(data),
    },
  }
}
