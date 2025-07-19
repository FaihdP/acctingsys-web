import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useContext, useEffect, useState } from "react";
import IndicatorsContext from "../hooks/IndicatorsContext";
import formatData from "../util/formatData";
import formatDateTicks from "../util/formatDateTicks";
import getRandomColor from "../util/getRandomColor";
import formatCurrency from "../util/formatCurrency";
import getInterval from "../util/getInterval";
import renderFilterDocumentLines from "../renders/renderFilterDocumentLines";
import type { Documents } from "@/interfaces/Documents";

export default function Chart() {
  const { data, setSelectedData, groupBy } = useContext(IndicatorsContext)
  const [dataFormated, setDataFormated] = useState<any[]>([])

  useEffect(() => {
    const result = formatData(data, groupBy as keyof Documents)
    setDataFormated(result)    
  }, [data, groupBy])

  if (!groupBy) return (
    <ResponsiveContainer width="100%" height="100%" minWidth={600}>
      <LineChart 
        width={1200}
        height={800}
        data={dataFormated}
        style={{ 
          width: "100%", 
          display: "flex",	
          flex: 1,
          flexGrow: 1,
        }} 
        margin={{top: 20, right: 20, bottom: 20, left: 40}}
      >
        <CartesianGrid strokeDasharray="4 5" />
        <XAxis 
          dataKey="date" interval={getInterval(dataFormated.length)}
          tickFormatter={(value) => formatDateTicks(value)} 
        />
        <YAxis tickFormatter={(value) => formatCurrency(value)} />
        <Tooltip  
          formatter={(value: number) => [`${formatCurrency(value)}`, "Valor"]}
        />
        <Line 
          dataKey="value" 
          type="bump"
          stroke={getRandomColor()}
          activeDot={{ onClick: (_, index) => setSelectedData((index as any).payload.data) }}
        />
        <Legend formatter={() => "Valor"}/>
        <Brush height={10} />
      </LineChart>
    </ResponsiveContainer>
  )
  
  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={600}>
      <LineChart 
        width={1200}
        height={800}
        data={dataFormated}
        style={{ 
          width: "100%", 
          display: "flex",	
          flex: 1,
          flexGrow: 1,
        }} 
        margin={{top: 20, right: 20, bottom: 20, left: 40}}
      >
        <CartesianGrid strokeDasharray="4 5" />
        <XAxis 
          dataKey="date" interval={getInterval(dataFormated.length)}
          tickFormatter={(value) => formatDateTicks(value)} 
        />
        <YAxis tickFormatter={(value) => formatCurrency(value)} />
        <Tooltip  
          formatter={(value: number, name) => [`${formatCurrency(value)}`, "Valor"]}
        />
        {renderFilterDocumentLines(Object.keys(dataFormated[0] || {}).filter((key) => !["date", "data"].includes(key)))}
        <Brush height={10} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  )
}