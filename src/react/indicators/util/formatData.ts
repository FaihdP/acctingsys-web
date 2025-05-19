import type { Documents } from "@/interfaces/Documents";
import formatDate from "./formatDate";

export default function formatData(documents: Documents[], field: keyof Documents) {
  if (!documents || documents.length === 0) return []
  if (!field) return processData(documents)

  const groupedData = groupData(documents, field)
  if (!groupedData) return []
  const knownFieldValues = new Set<string>()
  documents.forEach((document) => {
    const fieldValue = document[field] as string
    const isKnowFieldValue = knownFieldValues.has(fieldValue)
    if (!isKnowFieldValue) knownFieldValues.add(fieldValue)
  })
  
  const accumulatedData = {}
  Object.entries(groupedData).forEach((group: any[]) => {
    knownFieldValues.add(group[0])
    accumulateData(group[1] ?? [], accumulatedData, group[0], knownFieldValues)
  })

  const result = Object.values(accumulatedData)
  return result
}

function processData(documents: Documents[]) {
  sortData(documents)
  const accumlatedData = accumulateData(documents)
  return Object.values(accumlatedData)
}

function sortData(documents: any[]) {
  // Modifies the original array
  documents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

function accumulateData(
  documents: Documents[], 
  accumulator?: any, 
  accumulateFieldValue?: string, 
  knownFieldValues?: Set<string>, 
) {
  return documents.reduce(
    (acc, item) => {
      const date = formatDate(item.date.toString())
      const fieldName = accumulateFieldValue || "value"
      acc[date] ||= { date, [fieldName]: 0, data: [] }
      acc[date].data.push(item)
      const fieldValues = knownFieldValues ? Array.from(knownFieldValues) : ["value"]
      fieldValues.forEach((fieldValue) => {
        acc[date][fieldValue] = (acc[date][fieldValue] || 0) + (fieldValue === fieldName ? item.value : 0)
      })

      return acc
    }, 
    accumulator || {}
  )
}

function groupData(documents: Documents[], field: string) {
  return Object.groupBy(documents, (doc) => {
    if (field in doc) return (doc as any)[field] as PropertyKey;
    return "undefined" as PropertyKey;
  });
}