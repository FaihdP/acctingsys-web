import { DOCUMENT_TYPES } from "@/react/indicators/constants/DocumentTypes"
import type IDateRange from "@/react/indicators/interfaces/DateRange";

export async function getDataTest(
  documentType: DOCUMENT_TYPES, 
  filter: { field?: string, value?: string, dateRange: IDateRange }
) {
  const getterDocuments = {
    [DOCUMENT_TYPES.INVOICES]: async () => (await import("@react/indicators/constants/data/invoices.json")).default,
    [DOCUMENT_TYPES.BUY_INVOICES]: async () => (await import("@react/indicators/constants/data/invoices.json")).default,
    [DOCUMENT_TYPES.SALE_INVOICES]: async () => (await import("@react/indicators/constants/data/invoices.json")).default,
    [DOCUMENT_TYPES.EXPENSES]: async () => (await import("@react/indicators/constants/data/expenses.json")).default,
    [DOCUMENT_TYPES.PAYMENTS]: async () => (await import("@react/indicators/constants/data/payments.json")).default
  }

  const originalData = await getterDocuments[documentType]()
  // Add this object copy to avoid modify the orginal data reference (static JSON importer)
  const result = JSON.parse(JSON.stringify(originalData))
  return result.filter((item: any) => {
    if (documentType === DOCUMENT_TYPES.SALE_INVOICES || documentType === DOCUMENT_TYPES.BUY_INVOICES) {
      item.person = item.person ? `${item.person.name} ${item.person.lastname}` : "Desconocido"
    }

    if (documentType === DOCUMENT_TYPES.PAYMENTS) {
      if (!item.bank) {
        item.bank = item.type === "DIGITAL" ? "Desconocido" : "Efectivo"
      }
    }

    const { dateRange, field, value } = filter
    // TODO: Fix problem with dates in the same day with the filter
    const itemDate = new Date(item.date)
    const itemDateOnly = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate())
    
    const startDate = new Date(dateRange.start)
    const startDateOnly = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
    
    const endDate = new Date(dateRange.end)
    const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())

    let filterField = true
    if (field && value) filterField = item[field] === value
    return itemDateOnly >= startDateOnly && itemDateOnly <= endDateOnly && filterField
  })
}