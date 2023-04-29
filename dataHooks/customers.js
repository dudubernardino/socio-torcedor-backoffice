import useSWR from 'swr'

export const useCustomers = () => {
  const limit = 500
  const { data, error } = useSWR({ path: `/customers?limit=${limit}` })

  return {
    customers: data?.data,
    isLoading: !error && !data?.data,
    isError: error,
    isEmpty:
      !error && data?.data && Array.isArray(data?.data) && !data?.data?.length,
  }
}
