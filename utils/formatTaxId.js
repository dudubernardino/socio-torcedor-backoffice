import { formatCPF, formatCNPJ } from '@brazilian-utils/brazilian-utils'

export const formatTaxId = (taxId) => {
  if (!taxId) return 'N/A'
  const isHidden = taxId.match(/\*/)
  if (isHidden) return taxId

  return taxId.length === 11
    ? formatCPF(taxId || '', {
        pad: true,
      })
    : formatCNPJ(taxId || '', {
        pad: true,
      })
}
