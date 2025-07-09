import { DOCUMENT_TYPES } from "@/react/indicators/constants/DocumentTypes";
import type IDateRange from "@/react/indicators/interfaces/DateRange";

export default async function getData(
  documentType: DOCUMENT_TYPES, 
  filter: { 
    dateRange: IDateRange 
    fields?: { field: string, value: string }[]
  }
) {
  let pathQueryString = new URLSearchParams()
  
  if ([DOCUMENT_TYPES.SALE_INVOICES, DOCUMENT_TYPES.BUY_INVOICES].includes(documentType)) {
    pathQueryString.set("type", "invoices")
    documentType = DOCUMENT_TYPES.INVOICES
  }

  if (filter.fields) {
    filter.fields.forEach((field) => {
      pathQueryString.append(field.field, field.value)
    }) 
  }

  if (!pathQueryString.get("branch")) {
    pathQueryString.set("branch", "all")
  }

  if (filter.dateRange) {
    pathQueryString.append("start", filter.dateRange.start)
    pathQueryString.append("end", filter.dateRange.end)
  }

  const res = await fetch('/api/getDocuments?' + pathQueryString, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) return undefined

  if (documentType === DOCUMENT_TYPES.INVOICES) {
    const data = await res.json()
    return data.map((item: any) => ({
      ...item,
      person: item.person || "Desconocido",
    }))
  }

  return await res.json()
}