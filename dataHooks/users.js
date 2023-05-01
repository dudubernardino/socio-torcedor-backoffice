import useSWR from 'swr'

export const useUsers = () => {
  const limit = 500
  const { data, error } = useSWR({ path: `/users?limit=${limit}` })

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
    isEmpty:
      !error && data?.data && Array.isArray(data?.data) && !data?.data?.length,
  }
}
