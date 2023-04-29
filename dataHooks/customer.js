import useSWR from 'swr'

export const useCustomer = ({ customerId }) => {
  const { data, error, mutate } = useSWR({
    path: `/customers/${customerId}`,
  })

  return {
    customer: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
