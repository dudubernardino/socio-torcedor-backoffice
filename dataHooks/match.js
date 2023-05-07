import useSWR from 'swr'

export const useMatch = ({ matchId }) => {
  const { data, error, mutate } = useSWR({
    path: `/matches/${matchId}`,
  })

  return {
    match: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
