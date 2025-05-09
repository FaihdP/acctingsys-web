import { useState, type ChangeEvent } from "react"
import getInitalDateRange from "../util/getInitialDateRange"
import DateRangeInput from "./DateRangeInput"
import type IDateRange from "../interfaces/DateRange"

export default function DateRangeFilter() {
  const [dateRange, setDateRange] = useState<IDateRange>(getInitalDateRange())

  const handleChangeFilter = (field: string, data: string) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: data,
    }))
  }

  return (
    <div className="flex flex-col w-full xl:flex-row mt-8">
      <DateRangeInput dateRange={dateRange} handleChangeFilter={handleChangeFilter} />
    </div>
  )
}