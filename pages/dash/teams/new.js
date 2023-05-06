import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { toast } from 'react-toastify'

import { fetcher } from 'utils/fetcher'
import { eres } from 'utils/eres'
import { errorAlert } from 'utils/errorAlert'
import { removeEmptyFields } from 'utils/removeEmptyFields'

import { TeamForm } from 'components/TeamForm'

function TeamCreate() {
  const router = useRouter()

  const onSubmit = async (data) => {
    const body = removeEmptyFields(data)

    const [error, result] = await eres(
      fetcher({ path: `/teams`, body, method: 'POST' })
    )

    if (error) {
      return errorAlert(error)
    }

    router.push(`/dash/teams/${result.id}`)
    toast.success('Sucesso!')
  }

  return (
    <>
      <Head>
        <title>Adicionar novo time - Backoffice Sócio API</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        <TeamForm
          onSubmit={onSubmit}
          setDisabled={() => router.back()}
          hasEmailCheckbox
        />
      </div>
    </>
  )
}

export default TeamCreate
