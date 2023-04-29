export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(404).json({ error: 'Method not found' })
  }

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/users/2fa/enable/${req.query?.code}`
  const options = {
    method: 'POST',
    body: JSON.stringify('{}'),
    headers: {
      'Content-Type': 'application/json',
      Authorization: req.headers.authorization,
    },
  }

  const fetched = await fetch(url, options)
  const result = await fetched.json()

  return res.status(fetched.status).json(result)
}
