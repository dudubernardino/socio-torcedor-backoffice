import useSWR from 'swr'

export const useTeams = ({ filterParams }) => {
  const limit = 100
  const params = new URLSearchParams()
  if (limit) params.set('limit', limit)
  if (filterParams?.text) params.set('filter', filterParams?.text)

  const { data, error, mutate } = useSWR({
    path: '/teams',
  })

  return {
    teams: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
