export const formatDate = (date) => {
  const formatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' })
  return formatter.format(new Date(date))
}