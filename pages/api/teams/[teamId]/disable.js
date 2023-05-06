export default async function handler(req, res) {
  const {
    query: { teamId },
    method,
  } = req
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/teams/${teamId}/disable`

  if (!teamId || teamId === 'undefined')
    return res.status(422).json({ error: 'Missing parameter' })

  if (method !== 'PATCH')
    return res.status(405).json({ error: 'Method not allowed' })

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
}
