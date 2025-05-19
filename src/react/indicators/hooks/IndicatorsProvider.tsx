import { useEffect, useState } from "react";
import { DOCUMENT_TYPES } from "../constants/DocumentTypes";
import { FILTER_TYPES } from "../constants/FilterTypes";
import IndicatorsContext from "./IndicatorsContext";
import getData from "@/services/getData";
import type { Documents } from "@/interfaces/Documents";
import type IDateRange from "../interfaces/DateRange";
import getInitalDateRange from "../util/getInitialDateRange";
import type { GridColDef } from "@mui/x-data-grid";
import formatDate from "../util/formatDate";

export default function IndicatorsProvider({ children }: { children: React.ReactNode }) {
  const [document, setDocument] = useState<DOCUMENT_TYPES>(DOCUMENT_TYPES.SALE_INVOICES)
  const [filterType, setFilterType] = useState<FILTER_TYPES>(FILTER_TYPES.DATE_RANGE)  
  const [filter, setFilter] = useState<{ dateRange: IDateRange, secondDateRange?: IDateRange, field?: string, value?: string }>({
    dateRange: getInitalDateRange(),
    secondDateRange: getInitalDateRange(),
    field: "type",
    value: "SALE"
  })
  const [data, setData] = useState<Documents[]>([])
  const [secondData, setSecondData] = useState<Documents[]>([])
  const [field, setField] = useState<string>("")
  const [selectedData, setSelectedData] = useState<Documents[]>([])

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

  const columns: GridColDef[] = [
    {
      field: 'InvoiceID',
      headerName: 'Invoice ID',
      width: 250 
    },
    {
      field: 'date',
      headerName: 'Fecha',
      valueFormatter: (params: any) => formatDate(params),
      width: 200
    },
    {
      field: 'value',
      headerName: 'Valor',
      type: 'number',
    },
    {
      field: 'type',
      headerName: 'Tipo',
      valueGetter: (params: any) => params === "BUY" ? "Compra" : "Venta",
    },
    {
      field: 'status',
      headerName: 'Estado',
      // valueGetter: (params: any) => {
      //   const isPaid = params === "Pagada"
      //   const invoiceColors = {
      //     background: isPaid ? "#0D6948" : "#922323",
      //     fontColor: isPaid ? "#FB8383" : "#07F9A2"
      //   }
      //   return (
      //     <span
      //       className="inline-block mx-1 rounded-lg px-[6px]"
      //       style={{
      //         background: invoiceColors?.background,
      //         color: invoiceColors?.fontColor
      //       }}
      //     >
      //       { params }
      //     </span>
      //   )
      // },
    },
    {
      field: 'person',
      headerName: 'Persona',
      valueGetter: (params: any) => params,
      width: 200
    },
  ]

  useEffect(() => {
    async function fetchData() {
      if (filterType === FILTER_TYPES.COMPARISION && filter.secondDateRange) {
        const data = (await getData(document, { ...filter, dateRange: filter.dateRange })) as Documents[]
        setData(data)   
        const secondData = (await getData(document, { ...filter, dateRange: filter.secondDateRange })) as Documents[]
        setSecondData(secondData)
      } else {
        const data = (await getData(document, filter)) as Documents[]
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
      columns,
      selectedData,
      setSelectedData
    }}>
      {children}
    </IndicatorsContext.Provider>
  )

}