import React from 'react'

const statusError = [
  'PAYMENT_REJECTED',
  'CONSENT_REJECTED',
  'CANCELED',
  'ERROR',
]

const makeClassByStatus = (status, prefix) => {
  if (status === 'PAYMENT_COMPLETED') return `${prefix}-green-700`
  return statusError.includes(status)
    ? `${prefix}-red-700`
    : `${prefix}-gray-700`
}

export const Tag = ({ children, status }) => {
  const classNamesByStatus = {
    text: makeClassByStatus(status, 'text'),
    iconBackground: makeClassByStatus(status, 'bg'),
  }

  return (
    <span
      className={`text-xs inline-flex justify-content-center items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white ${classNamesByStatus.text} border`}
    >
      <span
        style={{
          fontSize: '18px',
          borderRadius: '50px',
          padding: '4px',
          marginRight: '6px',
        }}
        className={classNamesByStatus.iconBackground}
      ></span>
      {children}
    </span>
  )
}
