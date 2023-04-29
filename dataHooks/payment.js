import useSWR from 'swr'

export const usePayment = ({ paymentId }) => {
  const { data, error, mutate } = useSWR({
    path: `/payments/${paymentId}`,
  })

  return {
    payment: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
