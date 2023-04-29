export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(404).json({ error: 'Method not found' })
  }

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh-token`
  const options = {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: req.headers.authorization,
    },
  }

  const fetched = await fetch(url, options)
  const result = await fetched.json()

  return res.status(fetched.status).json(result)
}
