import useSWR from 'swr'

export const useBilling = ({ startDate, endDate }) => {
  const params = new URLSearchParams()
  if (startDate) params.set('startDate', startDate)
  if (endDate) params.set('endDate', endDate)

  const { data, error } = useSWR({ path: `/billing?${params.toString()}` })

  return {
    billing: data?.data,
    isLoading: !error && !data?.data,
    isError: error,
    isEmpty:
      !error && data?.data && Array.isArray(data?.data) && !data?.data?.length,
  }
}
