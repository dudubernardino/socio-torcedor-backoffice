export default async function handler(req, res) {
  if (req.method === 'POST') {
    const fetched = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/plans`, {
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
    const uri = `${process.env.NEXT_PUBLIC_SERVER_URL}/plans?${
      req.url.split('?')[1]
    }`
    const fetched = await fetch(uri, {
      headers: { Authorization: req.headers.authorization },
    })

    const result = await fetched.json()
    return res.status(fetched.status).json(result)
  }

  return res.status(404).json({ error: 'Method not found' })
}
