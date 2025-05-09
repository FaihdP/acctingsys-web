import { createContext, type Dispatch, type SetStateAction } from "react";
import type { DOCUMENT_TYPES } from "../constants/DocumentTypes";
import type { FILTER_TYPES } from "../constants/FilterTypes";

interface IIndicatorsContext {
  data: any[],
  setData: Dispatch<SetStateAction<any[]>>,
  document: DOCUMENT_TYPES,
  filterType: FILTER_TYPES,
  setFilterType: Dispatch<SetStateAction<FILTER_TYPES>>,
  field: string,
  handleChangeField: (field: string) => void,
  handleChangeDocument: (document: DOCUMENT_TYPES) => void,
}

const IndicatorsContext = createContext({} as IIndicatorsContext)
export default IndicatorsContext