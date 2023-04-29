export default async function handler(req, res) {
  const {
    query: { paymentId },
  } = req
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/payments/${paymentId}`

  if (!paymentId || paymentId === 'undefined')
    return res.status(202).json({ result: 'waiting' })

  const fetched = await fetch(url, {
    headers: { Authorization: req.headers.authorization },
  })

  const result = await fetched.json()

  return res.status(fetched.status).json(result)
}
