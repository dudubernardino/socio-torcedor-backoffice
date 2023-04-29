export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(404).json({ error: 'Method not found' })
  }

  const query = req.url.split('?')[1]
  const uri = `${process.env.NEXT_PUBLIC_SERVER_URL}/billing?${query}`
  const fetched = await fetch(uri, {
    headers: {
      Authorization: req.headers.authorization,
    },
  })

  const result = await fetched.json()

  return res.status(fetched.status).send(result)
}
