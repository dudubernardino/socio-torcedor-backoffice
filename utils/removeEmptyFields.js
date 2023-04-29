import { JSONStringify } from './JSONStringify'

const isObject = (value) =>
  Object.prototype.toString.call(value) === '[object Object]' &&
  value?.constructor?.name === 'Object'

export const removeEmptyFields = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value === null || value === '' || value === undefined) {
      return acc
    }

    const parsedValue = isObject(value) ? removeEmptyFields(value) : value

    if (JSONStringify(parsedValue) === '{}') return acc
    return {
      ...acc,
      [key]: parsedValue,
    }
  }, {})
}
