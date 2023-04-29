export default async function handler(req, res) {
  if (req.method === 'GET') {
    const query = req.url.split('?')[1]
    const uri = `${process.env.NEXT_PUBLIC_SERVER_URL}/reports/reg-open-finance-weekly?${query}`
    const fetched = await fetch(uri, {
      headers: {
        Authorization: req.headers.authorization,
      },
    })

    const result = await fetched.text()
    return res.status(fetched.status).send(result)
  }

  return res.status(404).json({ error: 'Method not found' })
}
