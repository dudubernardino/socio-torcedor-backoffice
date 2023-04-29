export default async function handler(req, res) {
  const {
    query: { orgId },
    method,
  } = req
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/organizations/${orgId}`

  if (!orgId || orgId === 'undefined')
    return res.status(422).json({ error: 'Missing org id' })

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

  if (req.method === 'GET') {
    const fetched = await fetch(url, {
      headers: { Authorization: req.headers.authorization },
    })

    const result = await fetched.json()
    return res.status(fetched.status).json(result)
  }

  return res.status(404).json({ error: 'Method not found' })
}