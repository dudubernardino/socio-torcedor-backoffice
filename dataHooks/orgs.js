import useSWR from 'swr'

export const useOrgs = ({ run = true } = {}) => {
  if (!run) return { orgs: [] }

  const limit = 500
  const { data, error } = useSWR({ path: `/orgs?limit=${limit}` })

  return {
    orgs: data?.data,
    isLoading: !error && !data?.data,
    isError: error,
    isEmpty:
      !error && data?.data && Array.isArray(data?.data) && !data?.data?.length,
  }
}
