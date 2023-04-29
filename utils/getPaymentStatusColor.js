export const getPaymentStatusColor = (status) => {
  const statusColors = {
    STARTED: 'text-gray-600',
    ENQUEUED: 'text-yellow-600',
    CONSENT_AWAITING_AUTHORIZATION: 'text-yellow-600',
    CONSENT_AUTHORIZED: 'text-yellow-600',
    PAYMENT_PENDING: 'text-yellow-600',
    PAYMENT_PARTIALLY_ACCEPTED: 'text-yellow-600',
    PAYMENT_SETTLEMENT_PROCESSING: 'text-orange-600',
    PAYMENT_SETTLEMENT_DEBTOR_ACCOUNT: 'text-orange-600',
    PAYMENT_COMPLETED: 'text-green-600',
    CONSENT_REJECTED: 'text-red-600',
    PAYMENT_REJECTED: 'text-red-600',
    ERROR: 'text-red-600',
    CANCELED: 'text-red-600',
  }

  return statusColors[status] || ''
}
