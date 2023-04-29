export const CpfCnpj = ({
  type = 'tel',
  value = '',
  mask,
  onChange = () => {},
  ...props
}) => {
  const TYPES = {
    CPF: '999.999.999-999',
    CNPJ: '99.999.999/9999-99',
  }
  const MAX_LENGTH = clear(TYPES.CNPJ).length

  let valueInside = clear(value)

  if (valueInside) {
    valueInside = applyMask(valueInside, TYPES[mask || getMask(valueInside)])
  }

  function onLocalChange(ev) {
    let value = clear(ev.target.value)
    const infoMask = getMask(value)

    let nextLength = value.length

    if (nextLength > MAX_LENGTH) return

    value = applyMask(value, TYPES[mask || infoMask])

    ev.target.value = value

    onChange(ev, mask)
  }

  function getMask(value) {
    return value.length > 11 ? 'CNPJ' : 'CPF'
  }

  function applyMask(value, mask) {
    let result = ''

    let inc = 0
    Array.from(value).forEach((letter, index) => {
      if (!mask[index + inc].match(/[0-9]/)) {
        result += mask[index + inc]
        inc++
      }
      result += letter
    })
    return result
  }

  function clear(value) {
    return value && value.replace(/[^0-9]/g, '')
  }

  return (
    <input
      {...props}
      type={type}
      value={valueInside}
      onChange={onLocalChange}
    />
  )
}