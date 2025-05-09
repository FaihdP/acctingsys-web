import { useState } from "react";
import DateRangeInput from "./DateRangeInput";
import type IDateRange from "../interfaces/DateRange";
import getInitalDateRange from "../util/getInitialDateRange";

export default function ComparisionFilter() {
  const [dateRange1, setDateRange1] = useState<IDateRange>()
  const [dateRange2, setDateRange2] = useState<IDateRange>()

  const handleChangeFilter = (field: string, data: string, number?: number) => {
    const setDateRange = number === 1 ? setDateRange1 : setDateRange2;
    setDateRange((prev) => {
      return prev ? { ...prev, [field]: data } : undefined
    })
  }

  return (
    <div className="flex flex-col w-full xl:flex-col mt-8">
      <div className="flex flex-col w-full xl:flex-row">
        <DateRangeInput dateRange={dateRange1} handleChangeFilter={handleChangeFilter} number={1} />
      </div>
      <span className="my-2">Comparar con</span>
      <div className="flex flex-col w-full xl:flex-row">
        <DateRangeInput dateRange={dateRange2} handleChangeFilter={handleChangeFilter} number={2} />
      </div>
    </div>
  )
}