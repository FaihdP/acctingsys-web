import { useEffect, useState } from "react";
import { DOCUMENT_TYPES } from "../constants/DocumentTypes";
import { FILTER_TYPES } from "../constants/FilterTypes";
import IndicatorsContext from "./IndicatorsContext";
import getData from "@/services/getData";
import type { DocumentsArray } from "@/interfaces/DocumentsArray";
import type IDateRange from "../interfaces/DateRange";
import getInitalDateRange from "../util/getInitialDateRange";

export default function IndicatorsProvider({ children }: { children: React.ReactNode }) {
  const [document, setDocument] = useState<DOCUMENT_TYPES>(DOCUMENT_TYPES.SALE_INVOICES)
  const [filterType, setFilterType] = useState<FILTER_TYPES>(FILTER_TYPES.DATE_RANGE)  
  const [filter, setFilter] = useState<{ dateRange: IDateRange, secondDateRange?: IDateRange, field?: string, value?: string }>({
    dateRange: getInitalDateRange(),
    secondDateRange: getInitalDateRange(),
    field: "",
    value: ""
  })
  const [data, setData] = useState<DocumentsArray>([])
  const [secondData, setSecondData] = useState<DocumentsArray>([])
  const [field, setField] = useState<string>("")

  function handleChangeDocument (document: DOCUMENT_TYPES) {
    setField("")
    setFilter((prev) => ({
      ...prev,
      field: "",
      value: ""
    }))

    if ([DOCUMENT_TYPES.SALE_INVOICES, DOCUMENT_TYPES.BUY_INVOICES].includes(document)) {
      setFilter((prev) => ({
        ...prev,
        field: "type",
        value: document === DOCUMENT_TYPES.SALE_INVOICES ? "SALE" : "BUY"
      }))
    }
    
    setDocument(document)
  }

  function handleChangeField (field: string) {
    setField(field)
  }

  function handleChangeFilter (field: string, data: any) {
    setFilter((prev) => ({
      ...prev,
      [field]: data,
    }))
  }

  function handleChangeDateFilter (field: string, data: string) {
    setFilter((prev) => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: data,
      },
    }))
  }

  useEffect(() => {
    async function fetchData() {
      if (filterType === FILTER_TYPES.COMPARISION && filter.secondDateRange) {
        console.log(filter)
        const data = (await getData(document, { ...filter, dateRange: filter.dateRange })) as DocumentsArray
        setData(data)   
        const secondData = (await getData(document, { ...filter, dateRange: filter.secondDateRange })) as DocumentsArray
        setSecondData(secondData)
      } else {
        const data = (await getData(document, filter)) as DocumentsArray
        setData(data) 
      }
    }

    fetchData()
  }, [document, filter, filterType])

  return (
    <IndicatorsContext.Provider value={{
      data,
      setData,
      document,
      filterType,
      setFilterType,
      field,
      handleChangeField,
      handleChangeDocument,
      filter,
      handleChangeFilter,
      handleChangeDateFilter,
    }}>
      {children}
    </IndicatorsContext.Provider>
  )

}