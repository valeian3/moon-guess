import { toast } from 'react-toastify'

export const formatDate = (isoString: string): string => {
  if (!isoString || isNaN(Date.parse(isoString))) {
    return 'Invalid date'
  }

  const date = new Date(isoString)
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Months are 0-based
  const year = date.getUTCFullYear()

  return `${day}.${month}.${year}`
}

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'default'

export const showToast = (type: ToastType, message: string) => {
  switch (type) {
    case 'success':
      return toast.success(message)
    case 'error':
      return toast.error(message)
    case 'info':
      return toast.info(message)
    case 'warning':
      return toast.warning(message)
    default:
      return toast(message)
  }
}
