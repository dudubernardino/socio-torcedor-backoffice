import useSWRInfinite from 'swr/infinite'

export const usePayments = ({ filterParams }) => {
  const limit = 100
  const params = new URLSearchParams()
  if (limit) params.set('limit', limit)
  if (filterParams?.text) params.set('filter', filterParams?.text)
  if (filterParams?.startDate) params.set('startDate', filterParams?.startDate)
  if (filterParams?.endDate) params.set('endDate', filterParams?.endDate)

  const getKey = (pageIndex, previousPageData) => {
    // reached the end
    if (previousPageData && !previousPageData.data) return null

    // first page, we don't have `previousPageData`
    if (pageIndex === 0) return { path: `/payments?${params.toString()}` }

    const afterCursor = previousPageData?.cursor?.afterCursor
    if (afterCursor) params.set('afterCursor', afterCursor)

    // add the cursor to the API endpoint
    return { path: `/payments?${params.toString()}` }
  }

  const { data, error, isValidating, size, setSize } = useSWRInfinite(getKey)
  const payments = data?.reduce(
    (acc, item) => (Array.isArray(item?.data) ? [...acc, ...item.data] : acc),
    []
  )

  return {
    payments,
    isLoading: !error && !data,
    isError: error,
    isEmpty: !error && payments && !payments?.length,
    size,
    setSize,
    isRefreshing: isValidating && data && data.length === size,
    isTheEnd: !data?.[data?.length - 1]?.cursor?.afterCursor,
  }
}
