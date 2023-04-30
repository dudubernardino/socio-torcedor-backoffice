export default async function handler(req, res) {
  if (req.method === 'GET') {
    const uri = `${process.env.NEXT_PUBLIC_SERVER_URL}/teams?${
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
