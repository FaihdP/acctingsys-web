import type { GridColDef } from "@mui/x-data-grid"
import formatCurrency from "../util/formatCurrency"
import formatDate from "../util/formatDate"

export const DEFAULT_COLUMNS: GridColDef[] = [
  {
    field: 'date',
    headerName: 'Fecha',
    valueFormatter: (params: any) => formatDate(params),
    width: 200
  },
  {
    field: 'value',
    headerName: 'Valor',
    type: 'number',
    valueFormatter: (params: any) => formatCurrency(params),
  }
]

export const INVOICES_COLUMNS: GridColDef[] = [
  ...DEFAULT_COLUMNS,
  {
    field: 'type',
    headerName: 'Tipo',
    valueGetter: (params: any) => params === "BUY" ? "Compra" : "Venta",
  },
  {
    field: 'status',
    headerName: 'Estado',
    // valueGetter: (params: any) => {
    //   const isPaid = params === "Pagada"
    //   const invoiceColors = {
    //     background: isPaid ? "#0D6948" : "#922323",
    //     fontColor: isPaid ? "#FB8383" : "#07F9A2"
    //   }
    //   return (
    //     <span
    //       className="inline-block mx-1 rounded-lg px-[6px]"
    //       style={{
    //         background: invoiceColors?.background,
    //         color: invoiceColors?.fontColor
    //       }}
    //     >
    //       { params }
    //     </span>
    //   )
    // },
  },
  {
    field: 'person',
    headerName: 'Persona',
    valueGetter: (params: any) => params,
    width: 200
  },
]

export const EXPENSES_COLUMNS: GridColDef[] = [
  ...DEFAULT_COLUMNS,
  {
    field: 'title',
    headerName: 'Titulo',
    width: 300
  }
]

export const PAYMENTS_COLUMNS: GridColDef[] = [
  ...DEFAULT_COLUMNS,
  {
    field: "type",
    headerName: "Tipo de pago",
    valueGetter: (params: any) => params === "DIGITAL" ? "Digital" : "Efectivo",
    width: 200
  },
  {
    field: 'bank',
    headerName: 'Banco',
  }
]