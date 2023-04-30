import useSWR from 'swr'

export const useTeam = ({ teamId }) => {
  const { data, error, mutate } = useSWR({
    path: `/teams/${teamId}`,
  })

  return {
    team: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
