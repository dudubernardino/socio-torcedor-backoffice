export const formatRole = (role) => {
  if (role.includes('CUSTOMER_ADMIN')) return 'Admin cliente'
  if (role.includes('CUSTOMER_OPERATOR')) return 'Operador cliente'
  if (role.includes('ORG_ADMIN')) return 'Admin'
  if (role.includes('ORG_OPERATOR')) return 'Operador'
}
