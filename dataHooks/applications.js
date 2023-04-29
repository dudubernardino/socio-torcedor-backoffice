import useSWR from 'swr'

export const useApplications = ({ customerId }) => {
  const limit = 500
  const { data, error, mutate } = useSWR({
    path: `/customers/${customerId}/apps?limit=${limit}`,
  })

  return {
    applications: data?.data,
    isLoading: !error && !data?.data,
    isError: error,
    isEmpty:
      !error && data?.data && Array.isArray(data?.data) && !data?.data?.length,
    mutate,
  }
}
