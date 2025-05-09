import { useContext } from "react";
import Chart from "./Chart";
import DateRangeFilter from "./DateRangeFilter";
import ComparisionFilter from "./ComparisionFilter";
import { FILTER_TYPES, FILTER_TYPES_TEXTS } from "../constants/FilterTypes";
import { DOCUMENT_TYPES, DOCUMENT_TYPES_TEXTS } from "../constants/DocumentTypes";
import { DOCUMENT_FIELDS } from "../constants/DocumentFields";
import IndicatorsContext from "../hooks/IndicatorsContext";

// try {
//   const response = await fetch(dataURLS[document])
//   if (!response.ok) throw new Error("Failed to fetch data")
//   data = await response.json()
// } catch (error) {
//   console.error("Error fetching data:", error)
//   return <div>Error loading chart</div>
// }

export default function IndicatorsView() {
  const { 
    data, 
    document, 
    filterType, 
    setFilterType,
    handleChangeField,
    handleChangeDocument
  } = useContext(IndicatorsContext)

  return (
    <>
      <div className="flex flex-col lg:flex-row flex-grow w-full overflow-hidden">
        <div className="flex flex-col w-full lg:w-[35%]">
          <div>
            <span className="text-sm">Filtros</span>
            <hr className="text-gray-200 mt-1"/>
            <label className="mt-3 flex items-center gap-3">
              <span className="text-sm whitespace-nowrap">Tipo de documento</span>
              <select 
                defaultValue={document}
                onChange={(e) => handleChangeDocument(e.target.value as DOCUMENT_TYPES)}
                className="
                  flex-1
                  bg-[#F4F4F4] 
                  ps-3
                  shadow-[0_0_3px_0px_rgba(0,0,0,0.5)] theme
                  border 
                  rounded-lg 
                  focus:outline-none
                  h-[35px]
                  border-[#F4F4F4]
                "
              >
                {
                  Array.from(DOCUMENT_TYPES_TEXTS).map(([key, value]) => {
                    return (<option key={key} value={key}>{value}</option>)
                  })
                }
              </select>
            </label>
            <label className="mt-3 flex items-center gap-3">
              <span className="text-sm whitespace-nowrap me-11">Tipo de filtro</span>
              <select 
                defaultValue={filterType}
                onChange={(e) => setFilterType(e.target.value as FILTER_TYPES)}
                className="
                  flex-1
                  bg-[#F4F4F4] 
                  ps-3
                  shadow-[0_0_3px_0px_rgba(0,0,0,0.5)] 
                  border 
                  rounded-lg 
                  focus:outline-none
                  h-[35px]
                  border-[#F4F4F4]
                "
              >
                {
                  Array.from(FILTER_TYPES_TEXTS).map(([key, value]) => {
                    return (<option key={key} value={key}>{value}</option>)
                  })
                }
              </select>
            </label>
            { filterType === FILTER_TYPES.COMPARISION && <ComparisionFilter />}
            { filterType === FILTER_TYPES.DATE_RANGE && <DateRangeFilter />}
          </div>
          <div className="mt-10">
            <span className="text-sm">Campos</span>
            <hr className="text-gray-200 mt-1"/>
            {
              Object.entries(DOCUMENT_FIELDS.get(document)).map(([key, value]: [string, any]) => {
                return (
                  <label key={key} className="mt-3 flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="field" 
                      defaultChecked={false} 
                      onClick={(e) => handleChangeField(key)} 
                    />
                    <span className="text-sm">{value.label}</span>
                  </label>
                )
              })
            }
          </div>
        </div>
        <div className="flex w-full overflow-x-auto lg:ms-10">	
          <Chart />
        </div>
      </div>
    </>
  )
}