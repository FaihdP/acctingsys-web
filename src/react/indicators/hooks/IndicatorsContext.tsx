import { createContext, type Dispatch, type SetStateAction } from "react";
import type { DOCUMENT_TYPES } from "../constants/DocumentTypes";
import type { FILTER_TYPES } from "../constants/FilterTypes";
import type IDateRange from "../interfaces/DateRange";
import type { GridColDef } from "@mui/x-data-grid";
import type { Documents } from "@/interfaces/Documents";

export interface IFilter {
  dateRange: IDateRange,
  fields?: { field: string, value: string }[]
}

interface IIndicatorsContext {
  data: any[],
  setData: Dispatch<SetStateAction<any[]>>,
  document: DOCUMENT_TYPES,
  filterType: FILTER_TYPES,
  setFilterType: Dispatch<SetStateAction<FILTER_TYPES>>,
  handleChangeDocument: (document: DOCUMENT_TYPES) => void,
  filter: IFilter,
  handleChangeFilter: (field: string, data: any) => void,
  handleChangeDateFilter: (field: string, data: string) => void,
  handleChangeField: (field: string, value: string) => void,
  columns: GridColDef[],
  selectedData: any[],
  setSelectedData: Dispatch<SetStateAction<any[]>>,
  groupBy: keyof Documents | undefined,
  setGroupBy: Dispatch<SetStateAction<keyof Documents | undefined>>,
  isLoading: boolean
}

const IndicatorsContext = createContext({} as IIndicatorsContext)
export default IndicatorsContext