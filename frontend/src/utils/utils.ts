export const formatDate = (isoString: string): string => {
  const date = new Date(isoString)
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Months are 0-based
  const year = date.getUTCFullYear()

  return `${day}.${month}.${year}`
}
