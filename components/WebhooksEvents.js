import React from 'react'
import { format, parseISO } from 'date-fns'
import { BoltIcon } from '@heroicons/react/20/solid'
import { Tag } from './Tag'
import { useWebhooks } from 'dataHooks/webhooks'

export const WebhooksEvents = ({ paymentInitiationId }) => {
  const { webhooks, loading } = useWebhooks({ paymentInitiationId })
  if (!webhooks?.length || loading) return null

  return (
    <div className="flex-auto px-4 py-4">
      <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase px-4">
        Eventos de mudança de status via Webhook
      </h6>

      <div className="flow-root px-4">
        <ul role="list" className="-mb-8">
          {webhooks?.map((event, eventIdx) => {
            const dt = parseISO(event.createdAt)
            const formatDate = format(dt, "dd/MM/yyyy 'às' HH:MM:ss")

            return (
              <li key={event.id}>
                <div className="relative pb-8">
                  {eventIdx !== webhooks.length - 1 ? (
                    <span
                      className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={
                          'h-8 w-8 rounded-full flex items-center justify-center bg-yellow-500'
                        }
                      >
                        <BoltIcon
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4">
                      <div>
                        <div className="whitespace-nowrap text-sm text-gray-500">
                          <time dateTime={event.timestamp}>{formatDate}</time>
                        </div>

                        <p className="text-sm font-medium text-gray-900">
                          Status alterado:{' '}
                          <Tag status={event?.requestBody?.status}>
                            {event?.requestBody?.status}
                          </Tag>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <hr className="my-6 border-b-1 border-gray-300" />
    </div>
  )
}
