import { useContext } from "react";
import Chart from "./Chart";
import DateRangeFilter from "./DateRangeFilter";
import ComparisionFilter from "./ComparisionFilter";
import { FILTER_TYPES, FILTER_TYPES_TEXTS } from "../constants/FilterTypes";
import { DOCUMENT_TYPES, DOCUMENT_TYPES_TEXTS } from "../constants/DocumentTypes";
import { DOCUMENT_FIELDS } from "../constants/DocumentFields";
import IndicatorsContext from "../hooks/IndicatorsContext";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Spin from "./Spin";
import COLORS from "@/styles/colors";
import formatCurrency from "../util/formatCurrency";

export default function IndicatorsView() {
  const { 
    filter,
    data,
    document, 
    filterType, 
    setFilterType,
    groupBy,
    setGroupBy,
    handleChangeDocument,
    columns,
    isLoading,
    selectedData
  } = useContext(IndicatorsContext)

  const dataWithIds = (selectedData.length > 0 ? selectedData : data || []).map((document, index) => ({
    ...document,
    id: index
  }))

  return (
    <div className="flex flex-col">
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
                  dark:bg-[#1E1E1E]
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
                  dark:bg-[#1E1E1E]
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
            <span className="text-sm">Agrupar por</span>
            <hr className="text-gray-200 mt-1"/>
            <label className="mt-3 flex items-center gap-3">
              <input 
                type="radio" 
                name="groupBy" 
                defaultChecked={groupBy === undefined} 
                onChange ={(e) => setGroupBy(undefined)} 
              />
              <span className="text-sm">Sin agrupación</span>
            </label>
            {
              Object.entries(DOCUMENT_FIELDS.get(document)).map(([key, value]: [string, any]) => {
                const valueField = filter.fields?.find((f) => f.field === key)?.value
                return (
                  <label key={key} className="mt-3 flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="groupBy" 
                      defaultChecked={Boolean(Object.entries(value).find(([k]) => k === valueField))} 
                      onChange ={(e) => setGroupBy(key as any)} 
                    />
                    <span className="text-sm">{value.label}</span>
                  </label>
                )
              })
            }
          </div>
        </div>
        <div className={`
          flex ${filterType === FILTER_TYPES.COMPARISION ? "flex-col" : "flex-col"} 
          w-full 
          lg:ms-10
          overflow-x-auto
        `}>
          <div className="h-[calc(100vh-200px)] mb-[60px]">
            <div className="flex flex-col mb-5 items-center">
              <span>Valor { DOCUMENT_TYPES_TEXTS.get(document) }</span>
              <span className='text-[18px] font-semibold'>
                { isLoading 
                  ? <Spin size={14} /> 
                  : <>$ {formatCurrency(data.reduce((acc, doc) => acc + doc.value, 0))}</>
                }
              </span> 
            </div>
            { isLoading && 
                <div className="h-full flex items-center justify-center text-xl">
                  <Spin /> <span className="ms-5">Cargando...</span>
                </div> 
            }
            { !isLoading && filterType === FILTER_TYPES.DATE_RANGE && <Chart /> }
            {
              !isLoading && filterType === FILTER_TYPES.COMPARISION && <>
                <Chart />
                <Chart />
              </>
            }
          </div>
          {
            filterType !== FILTER_TYPES.COMPARISION && (
              <Paper sx={{ width: '100%' }}>
                <DataGrid
                  rows={dataWithIds}
                  columns={columns}
                  initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } }}}
                  pageSizeOptions={[10, 15]}
                  sx={{ border: 0 }}
                  localeText={{
                    paginationRowsPerPage: "Filas por página",
                  }}
                />
              </Paper>
            )
          }
        </div>
      </div>
      
    </div>
  )
}