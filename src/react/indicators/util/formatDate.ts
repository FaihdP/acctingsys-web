export default function formatDate(dateString: string) {
  const date = new Date(dateString)
  const dateTimeFormat = new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  return dateTimeFormat.format(date)
}