import { DOCUMENT_FIELDS } from "@/react/indicators/constants/DocumentFields";
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
  const isDocumentTypeBuy = DOCUMENT_TYPES.BUY_INVOICES === documentType
  
  if ([DOCUMENT_TYPES.SALE_INVOICES, DOCUMENT_TYPES.BUY_INVOICES].includes(documentType)) {
    pathQueryString.set("type", "invoices")
    documentType = DOCUMENT_TYPES.INVOICES
  } else {
    pathQueryString.set("type", documentType)
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
    const documentFields = DOCUMENT_FIELDS.get(documentType)
    if (documentFields) {
      const newData = await Promise.all(data.map(async (item: any) => ({
        ...item,
        person: documentFields.person.getterText(item.person),
        branchId: await documentFields.branchId.getterText(item.branchId.replace("BRANCH#", "")),
      })))
      return newData.filter((item: any) => item.type === (isDocumentTypeBuy ? "BUY" : "SALE"))
    }
    return data.filter((item: any) => item.type === (isDocumentTypeBuy ? "BUY" : "SALE"))

  }

  if (documentType === DOCUMENT_TYPES.PAYMENTS) {
    const data = await res.json()
    const documentFields = DOCUMENT_FIELDS.get(documentType)
    if (documentFields) {
      const newData = await Promise.all(data.map(async (item: any) => ({
        ...item,
        bank: item.bank || "Ninguno",
        branchId: await documentFields.branchId.getterText(item.branchId.replace("BRANCH#", "")),
        type: documentFields.type.getterText(item.type),
      })))
      return newData
    }
    return data
  }

  return await res.json()
}