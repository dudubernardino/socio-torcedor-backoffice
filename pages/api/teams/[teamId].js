export default async function handler(req, res) {
  const {
    query: { teamId },
  } = req
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/teams/${teamId}`

  if (!teamId || teamId === 'undefined')
    return res.status(202).json({ result: 'waiting' })

  const fetched = await fetch(url, {
    headers: { Authorization: req.headers.authorization },
  })

  const result = await fetched.json()

  return res.status(fetched.status).json(result)
}
