import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import omit from 'lodash.omit'
import { toast } from 'react-toastify'
import { getCookie } from 'cookies-next'

import { fetcher } from 'utils/fetcher'
import { eres } from 'utils/eres'
import { errorAlert } from 'utils/errorAlert'
import { JSONParse } from 'utils/JSONParse'

import { UserForm } from 'components/UserForm'

import { useUser } from 'dataHooks/user'

function User({ currentUser }) {
  const router = useRouter()
  const [disabled, setDisabled] = useState(true)
  const userId = router?.query?.userId
  const { user, isLoading, isError, mutate } = useUser({ userId })

  const onSubmit = async (data) => {
    const body = omit(data, [
      'id',
      'createdAt',
      'updatedAt',
      'secret',
      'status',
      'customerId',
      'enable2FA',
      'organizationId',
      'organizationType',
    ])

    const [error, result] = await eres(
      fetcher({ path: `/users/${userId}`, body, method: 'PATCH' })
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
        <title>{user?.name || ''} Usuário - Backoffice Iniciador</title>
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
        {!isLoading && !user && (
          <p className="text-sm font-medium text-center py-4 text-gray-600">
            Não foi possivel carregar o usuário.
          </p>
        )}
        {!isLoading && (
          <UserForm
            disabled={disabled}
            setDisabled={setDisabled}
            user={user}
            onSubmit={onSubmit}
            currentUser={currentUser}
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
