export const formatRole = (role) => {
  if (role.includes('SUPER_ADMIN')) return 'Super Admin'
  if (role.includes('ADMIN')) return 'Admin'
  if (role.includes('MANAGER')) return 'Manager'
  if (role.includes('USER')) return 'User'
}
