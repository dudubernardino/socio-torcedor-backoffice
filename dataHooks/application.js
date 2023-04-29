import useSWR from 'swr'

export const useApplication = ({ customerId, applicationId }) => {
  const { data, error, mutate } = useSWR({
    path: `/customers/${customerId}/apps/${applicationId}`,
  })

  return {
    application: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
