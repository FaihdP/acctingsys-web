import COLORS from "@styles/colors";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

export default function BarChartView({ data }: { data: { month: string, amount: number }[] }) {
  return (<>
    <BarChart width={900} height={300} data={data} margin={{top: 20, right: 20, bottom: 20, left: 40}}>
      <CartesianGrid strokeDasharray="4 5" />
      <XAxis dataKey="month" />
      <YAxis 
        tickFormatter={(value) =>
          new Intl.NumberFormat('de-DE').format(value)
        }
      />
      <Bar dataKey="amount" fill={COLORS.GREEN} />
    </BarChart>
  </>)
}