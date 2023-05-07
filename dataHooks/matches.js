import useSWR from 'swr'

export const useMatches = ({ filterParams }) => {
  const limit = 100
  const params = new URLSearchParams()
  if (limit) params.set('limit', limit)
  if (filterParams?.text) params.set('filter', filterParams?.text)

  const { data, error, mutate } = useSWR({
    path: '/matches',
  })

  return {
    matches: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
