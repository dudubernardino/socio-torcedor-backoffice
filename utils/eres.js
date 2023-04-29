export const eres = (promise) =>
  promise.then((result) => [null, result]).catch((err) => [err])
