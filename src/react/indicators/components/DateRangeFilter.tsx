import DateRangeInput from "./DateRangeInput"
import IndicatorsContext from "../hooks/IndicatorsContext"
import { useContext } from "react"

export default function DateRangeFilter() {
  const { handleChangeDateFilter, filter } = useContext(IndicatorsContext)
  return (
    <div className="flex flex-col w-full xl:flex-row mt-8">
      <DateRangeInput dateRange={filter.dateRange} handleChangeFilter={handleChangeDateFilter} />
    </div>
  )
}