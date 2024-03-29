import useSWR from 'swr'

export const useApplication = ({ teamId, applicationId }) => {
  const { data, error, mutate } = useSWR({
    path: `/teams/${teamId}/apps/${applicationId}`,
  })

  return {
    application: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
