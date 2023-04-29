import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { toast } from 'react-toastify'
import { getCookie } from 'cookies-next'

import { fetcher } from 'utils/fetcher'
import { eres } from 'utils/eres'
import { JSONParse } from 'utils/JSONParse'
import { removeEmptyFields } from 'utils/removeEmptyFields'
import { errorAlert } from 'utils/errorAlert'

import { UserForm } from 'components/UserForm'

function UserCreate({ currentUser }) {
  const router = useRouter()

  const onSubmit = async (data) => {
    const body = removeEmptyFields(data)

    const [error, result] = await eres(
      fetcher({ path: `/users`, body, method: 'POST' })
    )

    if (error) {
      return errorAlert(error)
    }

    router.push(`/dash/users/${result.id}`)
    toast.success('Sucesso!')
  }

  return (
    <>
      <Head>
        <title>Adicionar novo usuário - Backoffice Iniciador</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        <UserForm
          onSubmit={onSubmit}
          setDisabled={() => router.back()}
          currentUser={currentUser}
        />
      </div>
    </>
  )
}

export default UserCreate

export const getServerSideProps = async ({ req, res }) => {
  const data = getCookie('data', { req, res }) || {}

  return {
    props: {
      currentUser: JSONParse(data),
    },
  }
}
