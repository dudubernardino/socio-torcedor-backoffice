export const JSONStringify = (json) => {
  try {
    return JSON.stringify(json)
  } catch (error) {
    return json
  }
}
