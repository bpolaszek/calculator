export const useFormatDate = () => {
  const formatter = new Intl.DateTimeFormat('default', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (date: Date | string) => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date
    return formatter.format(parsedDate)
  }
}