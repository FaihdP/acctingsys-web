export enum DOCUMENT_TYPES {
  INVOICES = "invoices",
  BUY_INVOICES = "buyInvoices",
  SALE_INVOICES = "saleInvoices",
  EXPENSES = "expenses",
  PAYMENTS = "payments",
}

export const DOCUMENT_TYPES_TEXTS = new Map([
  // [DOCUMENT_TYPES.INVOICES, "Factura"],
  [DOCUMENT_TYPES.BUY_INVOICES, "Factura - Compra"],
  [DOCUMENT_TYPES.SALE_INVOICES, "Factura - Venta"],
  [DOCUMENT_TYPES.EXPENSES, "Gasto"],
  [DOCUMENT_TYPES.PAYMENTS, "Pago"],
])