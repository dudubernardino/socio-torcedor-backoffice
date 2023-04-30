import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { JSONTree } from 'react-json-tree'

import accountTypes from 'utils/accountTypes.json'
import { useTeam } from 'dataHooks/team'

function Team() {
  const router = useRouter()
  const teamId = router?.query?.teamId
  const { team, isLoading, isError } = useTeam({ teamId })
  const getAccountTypeName = (value) =>
    value ? accountTypes.find((item) => item.value === value)?.label : null

  return (
    <>
      <Head>
        <title>{`Time ${team?.id}`} - Backoffice Sócio API</title>
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
        {!isLoading && !team && (
          <p className="text-sm font-medium text-center py-4 text-gray-600">
            Não foi possivel carregar o time.
          </p>
        )}
        {!isLoading && (
          <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                  <div className="text-left flex">
                    <h6 className="text-gray-700 text-xl font-bold">Time</h6>
                  </div>
                </div>

                <div className="flex-auto px-4 py-4">
                  <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase px-4">
                    Identificadores
                  </h6>
                  <div className="flex flex-wrap">
                    {/* ITEMS */}
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          id
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {team?.id || '-'}
                        </p>
                      </div>
                    </div>

                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <span className="block uppercase text-gray-600 text-xs font-bold mb-2">
                          name
                        </span>
                        <p className="text-gray-800 text-md font-medium">
                          {team?.name || '-'}
                        </p>
                      </div>
                    </div>

                    {/* END ITEMS */}
                  </div>
                </div>

                <hr className="my-6 border-b-1 border-gray-300" />

                <div className="flex-auto px-4 py-4">
                  <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase px-4">
                    Raw data
                  </h6>
                  <JSONTree data={team} hideRoot sortObjectKeys invertTheme />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Team
