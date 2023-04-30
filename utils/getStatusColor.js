export const getStatusColor = (status) => {
  const statusColors = {
    ACTIVE: 'text-green-600',
    INACTIVE: 'text-red-600',
  }

  return statusColors[status] || ''
}
