import type IDateRange from "../interfaces/DateRange";

interface DateRangeInputProps {
  dateRange?: IDateRange, 
  handleChangeFilter: (field: string, data: string, number?: number) => void,
  number?: number
}

export default function DateRangeInput({ 
  dateRange, 
  handleChangeFilter,
  number
}: DateRangeInputProps) {
  return (
    <>
      <label className="flex items-center gap-3">
        <span className="text-sm whitespace-nowrap">Desde</span>
        <input 
          defaultValue={dateRange?.start || ""}
          onChange={(e) => handleChangeFilter("start", e.target.value, number)}
          type="date" 
          className="
            flex-1
            bg-[#F4F4F4] 
            dark:bg-[#1E1E1E]
            ps-3
            shadow-[0_0_3px_0px_rgba(0,0,0,0.5)] 
            border 
            rounded-lg 
            focus:outline-none
            h-[35px]
            border-[#F4F4F4]
          "
        />
      </label>
      <label className="flex items-center gap-3 ms-0 xl:ms-3 mt-2 xl:mt-0">
        <span className="text-sm whitespace-nowrap">Hasta</span>
        <input 
          defaultValue={dateRange?.end || ""}
          onChange={(e) => handleChangeFilter("end", e.target.value)}
          type="date" 
          className="
            flex-1
            bg-[#F4F4F4] 
            dark:bg-[#1E1E1E]
            ps-3
            shadow-[0_0_3px_0px_rgba(0,0,0,0.5)] 
            border 
            rounded-lg 
            focus:outline-none
            h-[35px]
            border-[#F4F4F4]
          "
        />
      </label>
    </>
  )
}
