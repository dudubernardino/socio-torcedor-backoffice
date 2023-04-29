export default async function handler(req, res) {
  const {
    query: { customerId, appId },
    method,
  } = req
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/customers/${customerId}/apps/${appId}`

  if (
    !customerId ||
    customerId === 'undefined' ||
    !appId ||
    appId === 'undefined'
  ) {
    return res.status(202).json({ result: 'waiting' })
  }

  if (method === 'PATCH') {
    const fetched = await fetch(url, {
      method: 'PATCH',
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
    query: { limit: 3000 },
  })

  const result = await fetched.json()

  return res.status(fetched.status).json(result)
}
