import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Head from 'next/head'

import { fetcher } from 'utils/fetcher'
import { eres } from 'utils/eres'
import { removeEmptyFields } from 'utils/removeEmptyFields'
import { errorAlert } from 'utils/errorAlert'

import { usePlans } from 'dataHooks/plans'
import { PlanForm } from 'components/PlanForm'

function PlanNew({}) {
  const [disabled, setDisabled] = useState(true)

  const { mutate } = usePlans({})

  const onSubmit = async (data) => {
    const body = removeEmptyFields({
      ...data,
    })

    if (body.sectors) body.sectors = body.sectors?.map((sector) => sector.value)

    body.price = Number(body.price)

    const [error, result] = await eres(
      fetcher({
        path: `/plans`,
        body,
        method: 'POST',
      })
    )

    if (error) {
      return errorAlert(error)
    }

    mutate(result)
    toast.success('Sucesso!')
  }

  return (
    <>
      <Head>
        <title>Novo plano - Backoffice Iniciador</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        <PlanForm
          disabled={disabled}
          setDisabled={setDisabled}
          onSubmit={onSubmit}
        />
      </div>
    </>
  )
}

export default PlanNew

export const getServerSideProps = async ({ req, res }) => {
  const [, response] = await eres(
    fetch('https://static.u4c-iniciador.com.br/prod/banks.json')
  )
  const banks = await response.json()

  return {
    props: {
      banks,
    },
  }
}
