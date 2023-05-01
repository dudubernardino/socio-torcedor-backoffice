export const formatGender = (gender) => {
  if (gender.includes('FEMALE')) return 'Feminino'
  if (gender.includes('MALE')) return 'Masculino'
  if (gender.includes('NON_BINARY')) return 'Não Binário'
  if (gender.includes('OTHER')) return 'Outro'
}
