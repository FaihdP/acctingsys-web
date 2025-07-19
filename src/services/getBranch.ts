export default async function getBranch(branchId: string) {
  const branches = new Map([
    ["0001", "LA IGUALDAD"],
    ["0002", "LA IGUALDAD 2"],
  ])
  
  return branches.get(branchId)
}