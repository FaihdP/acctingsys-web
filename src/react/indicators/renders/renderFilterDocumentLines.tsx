import { useContext } from "react";
import { Line } from "recharts";
import getRandomColor from "../util/getRandomColor";
import IndicatorsContext from "../hooks/IndicatorsContext";

export default function renderFilterDocumentLines(fieldValues: string[]) {
  const { setSelectedData } = useContext(IndicatorsContext)
  return fieldValues.map((fieldValue) => (
    <Line 
      key={fieldValue}
      dataKey={fieldValue} 
      type="bump"
      stroke={getRandomColor()}
      activeDot={{ onClick: (_, index) => setSelectedData((index as any).payload.data) }}
    />
  ))
}