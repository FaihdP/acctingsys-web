export default interface Payment {
  date: string
  value: number
  type: "DIGITAL" | "CASH"
  entryKey: string
  branchId: string
  bank?: string
}