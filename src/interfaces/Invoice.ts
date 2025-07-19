export default interface Invoice {
  date: string 
  value: number
  branchId: string
  entryKey: string
  type: "SALE" | "BUY"
  status: "Pagada" | "En deuda"
  person?: string
}