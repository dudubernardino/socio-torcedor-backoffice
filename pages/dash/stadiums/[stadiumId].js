import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { getCookie } from 'cookies-next'

import { fetcher } from 'utils/fetcher'
import { eres } from 'utils/eres'
import { errorAlert } from 'utils/errorAlert'
import { JSONParse } from 'utils/JSONParse'

import { removeEmptyFields } from 'utils/removeEmptyFields'
import { useMatch } from 'dataHooks/match'
import { MatchForm } from 'components/MatchForm'
import { useStadium } from 'dataHooks/stadium'
import { StadiumForm } from 'components/StadiumForm'

function Stadium({ currentUser }) {
  const router = useRouter()
  const [disabled, setDisabled] = useState(true)
  const stadiumId = router?.query?.stadiumId
  const { stadium, isLoading, isError, mutate } = useStadium({ stadiumId })

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

    const [error, result] = await eres(
      fetcher({ path: `/stadiums/${stadiumId}`, body, method: 'PATCH' })
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
        <title>{stadium?.id ? stadium.name : ''} - Backoffice Sócio API</title>
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
        {!isLoading && !stadium && (
          <p className="text-sm font-medium text-center py-4 text-gray-600">
            Não foi possivel carregar o usuário.
          </p>
        )}
        {!isLoading && (
          <StadiumForm
            disabled={disabled}
            setDisabled={setDisabled}
            onSubmit={onSubmit}
            currentUser={currentUser}
            stadium={stadium}
          />
        )}
      </div>
    </>
  )
}

export default Stadium

export const getServerSideProps = async ({ req, res }) => {
  const data = getCookie('data', { req, res }) || {}

  return {
    props: {
      currentUser: JSONParse(data),
    },
  }
}
