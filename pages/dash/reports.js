import React, { useState } from 'react'
import Head from 'next/head'
import { getCookie } from 'cookies-next'
import Datepicker from 'react-tailwindcss-datepicker'

import { eres } from 'utils/eres'
import { errorAlert } from 'utils/errorAlert'

function Reports({ jwt }) {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  })

  const downloadReportInterval = async () => {
    const [error] = await eres(
      fetch(
        `/api/reports/reg-open-finance-weekly?startDate=${value?.startDate}&endDate=${value?.endDate}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
        .then((response) => response.blob())
        .then((blob) => {
          // Create blob link to download
          const url = window.URL.createObjectURL(new Blob([blob]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute(
            'download',
            `report-${value?.startDate}-${value?.endDate}-${Date.now()}.csv`
          )

          // Append to html link element page
          document.body.appendChild(link)

          // Start download
          link.click()

          // Clean up and remove the link
          link.parentNode.removeChild(link)
        })
    )

    if (error) {
      return errorAlert(error)
    }
  }

  return (
    <>
      <Head>
        <title>2FA - Backoffice Sócio API</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        <div className="px-4 md:px-10 mx-auto w-full bg-gray-100 py-6">
          <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-700 text-xl font-bold">
                  Relatório regulatório
                </h6>
              </div>
            </div>
            <div className="flex-auto px-6 py-10 pt-0">
              <p className="mt-4 mb-4">
                Geração de relatório por intervalo de datas
              </p>
              <div className="w-96 flex">
                <Datepicker
                  i18n={'pt-br'}
                  configs={{
                    shortcuts: {
                      today: 'Hoje',
                      yesterday: 'Ontem',
                      past: (period) => `Últimos ${period} dias`,
                      currentMonth: 'Mês atual',
                      pastMonth: 'Último mês',
                    },
                    footer: {
                      cancel: 'Cancelar',
                      apply: 'Aplicar',
                    },
                  }}
                  value={value}
                  onChange={setValue}
                  showShortcuts
                  separator="~"
                  displayFormat="DD/MM/YYYY"
                />
                <button
                  className="ml-4 bg-gray-700 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => downloadReportInterval()}
                >
                  Gerar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reports

export const getServerSideProps = async ({ req, res }) => {
  const jwt = getCookie('jwt', { req, res }) || ''

  return {
    props: {
      jwt,
    },
  }
}
