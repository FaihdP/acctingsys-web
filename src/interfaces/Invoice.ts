export default interface Invoice {
  InvoiceID: string,
  date: string 
  value: number
  type: "SALE" | "BUY"
  status: "Pagada" | "En deuda"
  person?: string
}