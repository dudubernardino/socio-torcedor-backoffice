import useSWR from 'swr'

export const useStadium = ({ stadiumId }) => {
  const { data, error, mutate } = useSWR({
    path: `/stadiums/${stadiumId}`,
  })

  return {
    stadium: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
