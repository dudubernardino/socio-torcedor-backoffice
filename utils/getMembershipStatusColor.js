export const getMembershipStatusColor = (status) => {
  const statusColors = {
    ACTIVE: 'text-green-600',
    INACTIVE: 'text-red-600',
    CANCELED: 'text-red-600',
    PENDING: 'PENDING',
    REJECTED: 'REJECTED',
    OVERDUE: 'OVERDUE',
  }

  return statusColors[status] || ''
}
