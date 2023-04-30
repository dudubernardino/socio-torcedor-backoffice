import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { toast } from 'react-toastify'

import { fetcher } from 'utils/fetcher'
import { errorAlert } from 'utils/errorAlert'
import { eres } from 'utils/eres'
import { removeEmptyFields } from 'utils/removeEmptyFields'

import { OrgForm } from 'components/OrgForm'

function OrgCreate() {
  const router = useRouter()

  const onSubmit = async (data) => {
    const body = removeEmptyFields(data)

    const [error, result] = await eres(
      fetcher({ path: `/orgs`, body, method: 'POST' })
    )

    if (error) {
      return errorAlert(error)
    }

    router.push(`/dash/orgs/${result?.id}`)
    toast.success('Sucesso!')
  }

  return (
    <>
      <Head>
        <title>Adicionar nova organização - Backoffice Sócio API</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        <OrgForm onSubmit={onSubmit} setDisabled={() => router.back()} />
      </div>
    </>
  )
}

export default OrgCreate
