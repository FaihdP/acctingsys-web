import { Line } from "recharts";
import { DOCUMENT_TYPES } from "../constants/DocumentTypes";
import getRandomColor from "./getRandomColor";

export default function renderFilterDocumentLines(documentType: DOCUMENT_TYPES) {
  const FilterInvoiceStatusLines = [
    <Line 
      key="en-deuda"
      dataKey="En deuda" 
      type="bump"
      stroke="#FB8383"
    />,
    <Line 
      key="pagada"
      dataKey="Pagada" 
      type="bump"
      stroke="#07F9A2"
    />
  ];
  
  switch (documentType) {
    case DOCUMENT_TYPES.INVOICES: return FilterInvoiceStatusLines;
    case DOCUMENT_TYPES.BUY_INVOICES: return FilterInvoiceStatusLines;
    case DOCUMENT_TYPES.SALE_INVOICES: return FilterInvoiceStatusLines;
    case DOCUMENT_TYPES.EXPENSES:
      return [
        <Line 
          key="en-deuda-expenses"
          dataKey="En deuda" 
          type="bump"
          stroke="#FB8383"
        />,
        <Line 
          key="pagada-expenses"
          dataKey="Pagada" 
          type="bump"
          stroke="#07F9A2"
        />
      ];
    case DOCUMENT_TYPES.PAYMENTS: 
      return [
        <Line 
          key="cash"
          dataKey="CASH" 
          name="Efectivo"
          type="bump"
          stroke={getRandomColor()}
        />,
        <Line 
          key="digital"
          dataKey="DIGITAL" 
          name="Digital"
          type="bump"
          stroke={getRandomColor()}
        />
      ];
  }
}