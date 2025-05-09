import { DOCUMENT_TYPES } from "@/react/indicators/constants/DocumentTypes";

export default async function getData(documentType: DOCUMENT_TYPES) {
  const urlDocuments = {
    [DOCUMENT_TYPES.INVOICES]: async () => (await import("@react/indicators/constants/invoices.json")).default,
    [DOCUMENT_TYPES.BUY_INVOICES]: async () => (await import("@react/indicators/constants/invoices.json")).default,
    [DOCUMENT_TYPES.SALE_INVOICES]: async () => (await import("@react/indicators/constants/invoices.json")).default,
    [DOCUMENT_TYPES.EXPENSES]: async () => (await import("@react/indicators/constants/expenses.json")).default,
    [DOCUMENT_TYPES.PAYMENTS]: async () => (await import("@react/indicators/constants/payments.json")).default
  }

  return await urlDocuments[documentType]()
}