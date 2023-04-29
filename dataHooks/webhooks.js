import useSWRInfinite from 'swr/infinite'

export const useWebhooks = ({ startDate, endDate, paymentInitiationId }) => {
  const limit = 50
  const params = new URLSearchParams()
  if (limit) params.set('limit', limit)
  if (startDate) params.set('startDate', startDate)
  if (endDate) params.set('endDate', endDate)
  if (paymentInitiationId)
    params.set('paymentInitiationId', paymentInitiationId)

  const getKey = (pageIndex, previousPageData) => {
    // reached the end
    if (previousPageData && !previousPageData.data) return null

    // first page, we don't have `previousPageData`
    if (pageIndex === 0)
      return { path: `/payments/logs/webhooks?${params.toString()}` }

    const afterCursor = previousPageData?.cursor?.afterCursor
    if (afterCursor) params.set('afterCursor', afterCursor)

    // add the cursor to the API endpoint
    return { path: `/payments/logs/webhooks?${params.toString()}` }
  }

  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite(getKey)
  const webhooks = data?.reduce(
    (acc, item) => (Array.isArray(item?.data) ? [...acc, ...item.data] : acc),
    []
  )

  return {
    webhooks,
    isLoading,
    isError: error,
    isEmpty: !error && webhooks && !webhooks?.length,
    size,
    setSize,
    isRefreshing: isValidating && data && data.length === size,
    isTheEnd: !data?.[data?.length - 1]?.cursor?.afterCursor,
  }
}
