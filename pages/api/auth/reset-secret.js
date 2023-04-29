export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(404).json({ error: 'Method not found' })
  }

  const { token, ...passData } = req.body || {}

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/reset-secret`
  const options = {
    method: 'POST',
    body: JSON.stringify(passData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const fetched = await fetch(url, options)
  const result = await fetched.json()

  return res.status(fetched.status).json(result)
}
