export default async function handler(req, res) {
  const {
    query: { userId },
    method,
  } = req
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${userId}/enable`

  if (!userId || userId === 'undefined')
    return res.status(422).json({ error: 'Missing parameter' })

  if (method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' })

  if (method === 'POST') {
    const fetched = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        Authorization: req.headers.authorization,
        'Content-Type': 'application/json',
      },
    })

    const result = await fetched.json()

    return res.status(fetched.status).json(result)
  }
}
