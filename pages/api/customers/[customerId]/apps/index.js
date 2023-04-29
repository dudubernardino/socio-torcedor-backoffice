export default async function handler(req, res) {
  const {
    query: { customerId },
    method,
  } = req
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/customers/${customerId}/apps`

  if (!customerId || customerId === 'undefined')
    return res.status(202).json({ result: 'waiting' })

  if (method === 'POST') {
    const fetched = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        Authorization: req.headers.authorization,
        'Content-Type': 'application/json',
      },
    })

    const result = await fetched.json()

    return res.status(fetched.status).json(result)
  }

  const fetched = await fetch(url, {
    headers: { Authorization: req.headers.authorization },
    // in the future paginate
    query: { limit: 3000 },
  })

  const result = await fetched.json()

  return res.status(fetched.status).json(result)
}
