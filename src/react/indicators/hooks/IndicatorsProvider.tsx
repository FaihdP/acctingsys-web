import { useEffect, useState } from "react";
import { DOCUMENT_TYPES } from "../constants/DocumentTypes";
import { FILTER_TYPES } from "../constants/FilterTypes";
import IndicatorsContext, { type IFilter } from "./IndicatorsContext";
import getData from "@/services/getData";
import type { Documents } from "@/interfaces/Documents";
import getInitalDateRange from "../util/getInitialDateRange";
import type { GridColDef } from "@mui/x-data-grid";
import { INVOICES_COLUMNS, EXPENSES_COLUMNS, PAYMENTS_COLUMNS } from "../constants/TablesColumns";

export default function IndicatorsProvider({ children }: { children: React.ReactNode }) {
  // TODO: move document and filterType in filter state
  const [document, setDocument] = useState<DOCUMENT_TYPES>(DOCUMENT_TYPES.SALE_INVOICES)
  const [filterType, setFilterType] = useState<FILTER_TYPES>(FILTER_TYPES.DATE_RANGE)  
  const [groupBy, setGroupBy] = useState<keyof Documents | undefined>()
  const [filter, setFilter] = useState<IFilter>({
    dateRange: getInitalDateRange(),
    fields: []
  })
  const [data, setData] = useState<Documents[]>([])
  const [selectedData, setSelectedData] = useState<Documents[]>([])
  const [columns, setColumns] = useState<GridColDef[]>(INVOICES_COLUMNS)
  const [isLoading, setIsLoading] = useState(false)

  function handleChangeDocument (document: DOCUMENT_TYPES) {
    setGroupBy(undefined)
    setFilter((prev) => ({
      ...prev,
      fields: []
    }))

    if ([DOCUMENT_TYPES.SALE_INVOICES, DOCUMENT_TYPES.BUY_INVOICES].includes(document)) {
      setColumns(INVOICES_COLUMNS)
      setFilter((prev) => ({
        ...prev,
        fields: [
          { field: "type", value: document === DOCUMENT_TYPES.SALE_INVOICES ? "SALE" : "BUY" }
        ]
      }))
    } else {
      setColumns(document === DOCUMENT_TYPES.EXPENSES ? EXPENSES_COLUMNS : PAYMENTS_COLUMNS)
    }
    
    setDocument(document)
  }

  function handleChangeField (field: string, value: string) {
    setFilter((prev) => {
      return {
        ...prev,
        fields: [
          ...(prev.fields ?? []),
          { field, value }
        ]
      }
    })
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
      setIsLoading(true)
      const data = (await getData(document, filter)) as Documents[]
      setData(data) 
      setIsLoading(false)
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
      handleChangeDocument,
      handleChangeField,
      filter,
      handleChangeFilter,
      handleChangeDateFilter,
      columns,
      selectedData,
      setSelectedData,
      groupBy,
      setGroupBy,
      isLoading
    }}>
      {children}
    </IndicatorsContext.Provider>
  )

}