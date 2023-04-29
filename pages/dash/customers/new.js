import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { toast } from 'react-toastify'

import { fetcher } from 'utils/fetcher'
import { eres } from 'utils/eres'
import { errorAlert } from 'utils/errorAlert'
import { removeEmptyFields } from 'utils/removeEmptyFields'

import { CustomerForm } from 'components/CustomerForm'

function CustomerCreate() {
  const router = useRouter()

  const onSubmit = async (data) => {
    const body = removeEmptyFields(data)

    const [error, result] = await eres(
      fetcher({ path: `/customers`, body, method: 'POST' })
    )

    if (error) {
      return errorAlert(error)
    }

    router.push(`/dash/customers/${result.id}`)
    toast.success('Sucesso!')
  }

  return (
    <>
      <Head>
        <title>Adicionar novo cliente - Backoffice Iniciador</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        <CustomerForm
          onSubmit={onSubmit}
          setDisabled={() => router.back()}
          hasEmailCheckbox
        />
      </div>
    </>
  )
}

export default CustomerCreate
