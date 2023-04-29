import useSWR from 'swr'

export const useOrg = ({ orgId }) => {
  const { data, error, mutate } = useSWR({ path: `/orgs/${orgId}` })

  return {
    org: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
