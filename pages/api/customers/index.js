export default async function handler(req, res) {
  if (req.method === 'POST') {
    const fetched = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/customers`,
      {
        method: req.method,
        body: JSON.stringify(req.body),
        headers: {
          Authorization: req.headers.authorization,
          'Content-Type': 'application/json',
        },
      }
    )

    const result = await fetched.json()

    return res.status(fetched.status).json(result)
  }

  if (req.method === 'GET') {
    const fetched = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/customers`,
      {
        headers: { Authorization: req.headers.authorization },
      }
    )

    const result = await fetched.json()

    return res.status(fetched.status).json(result)
  }

  return res.status(404).json({ error: 'Method not found' })
}
