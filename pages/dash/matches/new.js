import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { toast } from 'react-toastify'
import { getCookie } from 'cookies-next'

import { fetcher } from 'utils/fetcher'
import { eres } from 'utils/eres'
import { JSONParse } from 'utils/JSONParse'
import { removeEmptyFields } from 'utils/removeEmptyFields'
import { errorAlert } from 'utils/errorAlert'

import { MatchForm } from 'components/MatchForm'

function MatchCreate({ currentUser }) {
  const router = useRouter()

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
      fetcher({ path: `/matches`, body, method: 'POST' })
    )

    if (error) {
      return errorAlert(error)
    }

    router.push(`/dash/matches/${result.id}`)
    toast.success('Sucesso!')
  }

  return (
    <>
      <Head>
        <title>Adicionar nova partidas - Backoffice Sócio API</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        <MatchForm
          onSubmit={onSubmit}
          setDisabled={() => router.back()}
          currentUser={currentUser}
          stadiums={stadiums}
        />
      </div>
    </>
  )
}

export default MatchCreate

export const getServerSideProps = async ({ req, res }) => {
  const data = getCookie('data', { req, res }) || {}

  return {
    props: {
      currentUser: JSONParse(data),
    },
  }
}
