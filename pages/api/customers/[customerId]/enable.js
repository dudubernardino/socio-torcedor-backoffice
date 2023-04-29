export default async function handler(req, res) {
  const {
    query: { customerId },
    method,
  } = req
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/customers/${customerId}/enable`

  if (!customerId || customerId === 'undefined')
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
