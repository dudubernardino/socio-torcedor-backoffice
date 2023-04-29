export const JSONParse = (json) => {
  try {
    return JSON.parse(json)
  } catch (error) {
    return json
  }
}
