export default async function handler(req, res) {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/matches`

  if (req.method === 'POST') {
    const fetched = await fetch(url, {
      method: req.method,
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
