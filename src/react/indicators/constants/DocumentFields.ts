import { DOCUMENT_TYPES } from "./DocumentTypes";

const INVOICE_FIELDS = { 
  status: { 
    label: "Estado",
    values: ["Pagada", "En deuda"]
  }, 
  person: { 
    label: "Persona",
  } 
}
const EXPENSE_FIELDS = { title: { label: "Tipo de gasto"} }
const PAYMENT_FIELDS = { 
  type: { 
    label: "Tipo de pago",
    values: ["DIGITAL", "CASH"]
  }, 
  bank: { label: "Banco" } 
}

export const DOCUMENT_FIELDS = new Map<DOCUMENT_TYPES, any>([
  [DOCUMENT_TYPES.INVOICES, INVOICE_FIELDS],
  [DOCUMENT_TYPES.BUY_INVOICES, INVOICE_FIELDS],
  [DOCUMENT_TYPES.SALE_INVOICES, INVOICE_FIELDS],
  [DOCUMENT_TYPES.EXPENSES, EXPENSE_FIELDS],
  [DOCUMENT_TYPES.PAYMENTS, PAYMENT_FIELDS],
])