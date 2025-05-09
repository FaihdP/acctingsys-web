import { useEffect, useState } from "react";
import { DOCUMENT_TYPES } from "../constants/DocumentTypes";
import { FILTER_TYPES } from "../constants/FilterTypes";
import IndicatorsContext from "./IndicatorsContext";
import getData from "@/services/getData";
import type { DocumentsArray } from "@/interfaces/DocumentsArray";

export default function IndicatorsProvider({ children }: { children: React.ReactNode }) {
  const [document, setDocument] = useState<DOCUMENT_TYPES>(DOCUMENT_TYPES.INVOICES)
  const [filterType, setFilterType] = useState<FILTER_TYPES>(FILTER_TYPES.DATE_RANGE)  
  const [data, setData] = useState<DocumentsArray>([])
  const [field, setField] = useState<string>("")

  function handleChangeDocument (document: DOCUMENT_TYPES) {
    setField("")
    setDocument(document)
  }

  function handleChangeField (field: string) {
    setField(field)
  }

  useEffect(() => {
    async function fetchData() {
      const data = (await getData(document)) as DocumentsArray
      setData(data)
    }

    fetchData()
  }, [document])

  return (
    <IndicatorsContext.Provider value={{
      data,
      setData,
      document,
      filterType,
      setFilterType,
      field,
      handleChangeField,
      handleChangeDocument
    }}>
      {children}
    </IndicatorsContext.Provider>
  )

}