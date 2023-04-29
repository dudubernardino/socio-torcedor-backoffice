import React from 'react'
import { format, parseISO } from 'date-fns'
import {
  BoltIcon,
  CheckIcon,
  PlayIcon,
  ArrowUpRightIcon,
  BoltSlashIcon,
  IdentificationIcon,
  XMarkIcon,
  ArrowPathRoundedSquareIcon,
} from '@heroicons/react/20/solid'
import { Tag } from './Tag'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const IconsByStatus = {
  CREATED: {
    icon: PlayIcon,
    iconBackground: 'bg-gray-400',
  },
  STATUS_TRANSITION: {
    icon: ArrowPathRoundedSquareIcon,
    iconBackground: 'bg-blue-300',
  },
  PAYMENT_SENT_TO_ACCOUNT_HOLDER: {
    icon: ArrowUpRightIcon,
    iconBackground: 'bg-yellow-500',
  },
  CALLBACK_REDIRECT_SUCCESS: {
    icon: BoltIcon,
    iconBackground: 'bg-yellow-500',
  },
  CALLBACK_REDIRECT_DUPLICATED: {
    icon: BoltSlashIcon,
    iconBackground: 'bg-yellow-500',
  },
  CALLBACK_REDIRECT_ERROR: {
    icon: BoltIcon,
    iconBackground: 'bg-red-500',
  },
  DICT_CALL_SUCCESS: {
    icon: IdentificationIcon,
    iconBackground: 'bg-yellow-500',
  },
  DICT_CALL_ERROR: {
    icon: IdentificationIcon,
    iconBackground: 'bg-red-500',
  },
  PAYMENT_COMPLETED: {
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
  PAYMENT_REJECTED: {
    icon: XMarkIcon,
    iconBackground: 'bg-red-500',
  },
  CONSENT_REJECTED: {
    icon: XMarkIcon,
    iconBackground: 'bg-red-500',
  },
  CANCELED: {
    icon: XMarkIcon,
    iconBackground: 'bg-red-500',
  },
  ERROR: {
    icon: XMarkIcon,
    iconBackground: 'bg-red-500',
  },
}

const TextEvents = ({ children }) => (
  <p className="text-sm font-medium text-gray-900">{children}</p>
)

const renderTextsByEvents = (event) => {
  const eventsNames = {
    CREATED: <TextEvents>Transação inicializada.</TextEvents>,
    STATUS_TRANSITION: (
      <TextEvents>
        Mudança de status de{' '}
        <Tag status={event?.metadata?.from}>{event?.metadata?.from}</Tag> para{' '}
        <Tag status={event?.metadata?.to}>{event?.metadata?.to}</Tag>
      </TextEvents>
    ),
    DICT_CALL_SUCCESS: <TextEvents>Sucesso na conexão com DICT.</TextEvents>,
    DICT_CALL_ERROR: <TextEvents>Erro na conexão com DICT.</TextEvents>,
    PAYMENT_SENT_TO_ACCOUNT_HOLDER: (
      <TextEvents>
        Pagamento enviado para processamento no titular da conta.
      </TextEvents>
    ),
    CALLBACK_REDIRECT_SUCCESS: (
      <TextEvents>Sucesso no callback de redirecionamento.</TextEvents>
    ),
    CALLBACK_REDIRECT_DUPLICATED: (
      <TextEvents>Duplicado callback de redirecionamento.</TextEvents>
    ),
    CALLBACK_REDIRECT_ERROR: (
      <TextEvents>Erro no callback de redirecionamento.</TextEvents>
    ),
  }

  return eventsNames[event?.type]
}

export const Events = ({ events }) => (
  <div className="flex-auto px-4 py-4">
    <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase px-4">
      Eventos
    </h6>

    <div className="flow-root px-4">
      <ul role="list" className="-mb-8">
        {events?.map((event, eventIdx) => {
          const IconIcon = IconsByStatus[event.type]
          const dt = parseISO(event.timestamp)
          const formatDate = format(dt, "dd/MM/yyyy 'às' HH:MM:ss")

          return (
            <li key={event.timestamp}>
              <div className="relative pb-8">
                {eventIdx !== events.length - 1 ? (
                  <span
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={classNames(
                        IconIcon?.iconBackground,
                        'h-8 w-8 rounded-full flex items-center justify-center'
                      )}
                    >
                      {IconIcon && (
                        <IconIcon.icon
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4">
                    <div>
                      <div className="whitespace-nowrap text-sm text-gray-500">
                        <time dateTime={event.timestamp}>{formatDate}</time>
                      </div>

                      {renderTextsByEvents(event)}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  </div>
)
