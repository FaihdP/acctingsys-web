import type { DocumentsArray } from "@/interfaces/DocumentsArray";
import formatDate from "./formatDate";
import { DOCUMENT_TYPES } from "../constants/DocumentTypes";
import { DOCUMENT_FIELDS } from "../constants/DocumentFields";

export default function formatData(data: DocumentsArray, field: string, documentType?: DOCUMENT_TYPES) {
  if (!field) return processData(data)
  
  const groupedData = groupData(data, field)
  if (!groupedData) return []
  const accumulatedData = {}
  Object.entries(groupedData).forEach((group: any[], index) => {
    accumulateData(group[1] ?? [], accumulatedData, field, group[0], documentType)
  })

  return Object.values(accumulatedData)
}

function processData(data: DocumentsArray) {
  sortData(data)
  const accumlatedData = accumulateData(data)
  return Object.values(accumlatedData)
}

function sortData(data: any[]) {
  // Modifies the original array
  data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

function accumulateData(
  data: any[], 
  accumulator: any = {}, 
  field?: string,
  fieldValue?: string, 
  documentType?: DOCUMENT_TYPES, 
) {
  data.reduce(
    (_, item) => {
      const date = formatDate(item.date)
      accumulator[date] = accumulator[date] ?? { date, [fieldValue || "value"]: 0 }
      if (fieldValue && documentType && field) {
        console.log(field)
        const values = DOCUMENT_FIELDS.get(documentType)[field].values
        console.log(values)
        values.forEach((otherField: string) => {
          accumulator[date][otherField] = accumulator[date][otherField] ?? 0    
          accumulator[date][fieldValue] += item.value
        })
      } else {
        accumulator[date]["value"] = accumulator[date]["value"] ?? 0
        accumulator[date]["value"] += item.value
      }
      return accumulator
    }, 
    {}
  )

  return accumulator
}

function groupData(data: DocumentsArray, field: string) {
  return Object.groupBy(data, (doc) => {
    if (field in doc) return (doc as any)[field] as PropertyKey;
    return "undefined" as PropertyKey;
  });
}