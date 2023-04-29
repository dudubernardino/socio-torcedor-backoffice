import { toast } from 'react-toastify'

export const errorAlert = (error) => {
  const errorMessage =
    typeof error?.info?.message === 'string'
      ? error?.info?.message
      : error?.info?.message?.join(', ')

  toast.error(
    error?.info?.message ? `Please check: ${errorMessage}` : error?.message
  )
}
