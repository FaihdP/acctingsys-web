import { createContext, type Dispatch, type SetStateAction } from "react";
import type { DOCUMENT_TYPES } from "../constants/DocumentTypes";
import type { FILTER_TYPES } from "../constants/FilterTypes";
import type IDateRange from "../interfaces/DateRange";

interface IIndicatorsContext {
  data: any[],
  setData: Dispatch<SetStateAction<any[]>>,
  document: DOCUMENT_TYPES,
  filterType: FILTER_TYPES,
  setFilterType: Dispatch<SetStateAction<FILTER_TYPES>>,
  field: string,
  handleChangeField: (field: string) => void,
  handleChangeDocument: (document: DOCUMENT_TYPES) => void,
  filter: { dateRange: IDateRange, secondDateRange?: IDateRange, field?: string, value?: string },
  handleChangeFilter: (field: string, data: any) => void,
  handleChangeDateFilter: (field: string, data: string) => void,
}

const IndicatorsContext = createContext({} as IIndicatorsContext)
export default IndicatorsContext