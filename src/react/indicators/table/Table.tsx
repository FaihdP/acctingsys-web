import type Column from "@/interfaces/Column";
import type { Documents } from "@/interfaces/Documents";
import { useEffect, useState } from "react";
import { DOCUMENT_TYPES } from "@/react/indicators/constants/DocumentTypes";
import type { IFilter } from "@/react/indicators/hooks/IndicatorsContext";
import getData from "@/services/getData";
import getBranch from "@/services/getBranch";

const invoiceColumns = [
  { title: "Id", key: "entryKey", getter: (value: string) => value.split("#")[2] },
  { title: "Fecha", key: "date", getter: (value: string) => value.split("T")[0] + " " + value.split("T")[1].split(".")[0] },
  { title: "Valor", key: "value", getter: (value: number) => value },
  { title: "Tipo", key: "type" },
  { title: "Estado", key: "status" },
  { title: "Persona", key: "person" },
  { title: "Sucursal", key: "branchId", getter: async (value: string) => await getBranch(value.split("#")[1]) }
]

const expenseColumns = [
  { title: "Id", key: "entryKey", getter: (value: string) => value.split("#")[2] },
  { title: "Fecha", key: "date", getter: (value: string) => value.split("T")[0] + " " + value.split("T")[1].split(".")[0] },
  { title: "Valor", key: "value", getter: (value: number) => value },
  { title: "Titulo", key: "title" },
  { title: "Descripción", key: "description" },
  { title: "Sucursal", key: "branchId", getter: async (value: string) => await getBranch(value.split("#")[1]) }
]

const paymentColumns = [
  { title: "Id", key: "entryKey", getter: (value: string) => value.split("#")[2] },
  { title: "Fecha", key: "date", getter: (value: string) => value.split("T")[0] + " " + value.split("T")[1].split(".")[0] },
  { title: "Valor", key: "value", getter: (value: number) => value },
  { title: "Tipo", key: "type" },
  { title: "Banco", key: "bank" },
  { title: "Sucursal", key: "branchId", getter: async (value: string) => await getBranch(value.split("#")[1]) }
]

export default function Table({ documentType, filter }: { documentType: DOCUMENT_TYPES, filter: IFilter }) {
  const [data, setData] = useState<(Documents & { processedColumns: any[] })[]>([])
  const columns = (() => {
    switch (documentType) {
      case DOCUMENT_TYPES.INVOICES: return invoiceColumns
      case DOCUMENT_TYPES.SALE_INVOICES:return invoiceColumns
      case DOCUMENT_TYPES.BUY_INVOICES: return invoiceColumns
      case DOCUMENT_TYPES.EXPENSES: return expenseColumns
      case DOCUMENT_TYPES.PAYMENTS: return paymentColumns
      default: return []
    }
  })()

  useEffect(() => {
    async function fetchData() {
      const data = await getData(documentType, filter)

      const processedData = await Promise.all(
        data.map(async (document: Documents) => ({
          ...document,
          processedColumns: await Promise.all(
            columns.map(async (column) => {
              const columnValue = document[column.key as keyof Documents];
              if (!columnValue) return '';
              return column.getter ? await column.getter(columnValue as never) : columnValue;
            })
          )
        }))
      );

      console.log(processedData)

      setData(processedData)
    }
    fetchData()
  }, [])


  return (
    <div 
      className="
        flex
        flex-col
        flex-grow
        shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
        rounded-lg
        bg-[#F4F4F4]
        overflow-auto
      "
    >
      <div className="overflow-y-auto">
        <table className="
          w-full 
          [&>tbody>tr>td:first-child]:pl-4 
          [&>thead>tr>td:first-child]:pl-4
        ">
          <thead
            className="
              shadow-[0_1px_3px_-1px_rgba(0,0,0,0.5)] 
              sticky
              top-0
              bg-white 
              text-left
            "
          >
            <tr
              className="h-[35px] text-[#7A7A7A]"
            >
              { columns.map((column) => (<td key={column.key}>{column.title}</td>)) }
            </tr>
          </thead>
          <tbody>
            { (!data || data.length < 1 ) && (
              <tr>
                <td colSpan={columns.length} className="text-center">Cargando...</td>
              </tr>
            )}
            {data?.map((invoice, index) => (
              <tr 
                key={invoice.entryKey + "_" + index}
                className="
                  bg-white 
                  text-[#5C5C5C]
                  border-gray-100
                  border-b
                  h-[30px]
                  shadow-[0_1px_3px_-1px_rgba(0,0,0,0.1)]
                  hover:bg-[rgb(251,251,251,1)]
                ">
                {invoice.processedColumns.map((value, index) => (
                  <td key={invoice.entryKey + "_" + index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}