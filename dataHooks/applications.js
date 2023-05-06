import useSWR from 'swr'

export const useApplications = ({ teamId }) => {
  const limit = 500
  const { data, error, mutate } = useSWR({
    path: `/teams/${teamId}/apps?limit=${limit}`,
  })

  return {
    applications: data,
    isLoading: !error && !data,
    isError: error,
    isEmpty: !error && data && Array.isArray(data) && !data?.length,
    mutate,
  }
}
