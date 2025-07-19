export default interface Expense {
  date: string
  value: number
  entryKey: string
  branchId: string
  title: string
  description?: string
}