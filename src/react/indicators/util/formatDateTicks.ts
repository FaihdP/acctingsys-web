export default function formatDateTicks(dateString: string) {
  const [day, month, year] = dateString.split("/");
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  const daysDifference = 10;

  const formatOptions = [
    { condition: daysDifference > 300, options: { year: "numeric" } },
    //{ condition: daysDifference > 90, options: { year: "numeric", month: "short" } },
    { condition: daysDifference > 30, options: { month: "short", year: "numeric" } },
    { condition: true, options: { day: "2-digit", month: "2-digit", year: "numeric" } }
  ];

  const selectedFormat = formatOptions.find(({ condition }) => condition)?.options;

  return new Intl.DateTimeFormat("es-CO", selectedFormat as any)
    .format(date)
    .replace(/ de /g, " ")
    .replace(/([a-záéíóúñ]+) /i, "$1. ");
}