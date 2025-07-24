export default interface Column {
  title: string
  key: string
  getter?: (value: any) => any
}