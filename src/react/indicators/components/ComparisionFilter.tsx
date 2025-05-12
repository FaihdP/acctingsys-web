import DateRangeInput from "./DateRangeInput";
import IndicatorsContext from "../hooks/IndicatorsContext";
import { useContext } from "react";

export default function ComparisionFilter() {
  const { handleChangeFilter, filter } = useContext(IndicatorsContext)

  const handleChangeDateRange = (field: string, data: string, number?: number) => {
    handleChangeFilter(number === 1 ? "dateRange" : "secondDateRange", { [field]: data })
  }

  return (
    <div className="flex flex-col w-full xl:flex-col mt-8">
      <div className="flex flex-col w-full xl:flex-row">
        <DateRangeInput dateRange={filter.dateRange} handleChangeFilter={handleChangeDateRange} number={1} />
      </div>
      <span className="my-2">Comparar con</span>
      <div className="flex flex-col w-full xl:flex-row">
        <DateRangeInput dateRange={filter.secondDateRange} handleChangeFilter={handleChangeDateRange} number={2} />
      </div>
    </div>
  )
}