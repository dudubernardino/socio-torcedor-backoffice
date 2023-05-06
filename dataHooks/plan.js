import useSWR from 'swr'

export const usePlan = ({ planId }) => {
  const { data, error, mutate } = useSWR({
    path: `/plans/${planId}`,
  })

  return {
    plan: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
