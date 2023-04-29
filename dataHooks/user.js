import useSWR from 'swr'

export const useUser = ({ userId }) => {
  const { data, error, mutate } = useSWR({ path: `/users/${userId}` })

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
