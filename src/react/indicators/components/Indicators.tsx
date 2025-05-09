import IndicatorsProvider from "../hooks/IndicatorsProvider";
import IndicatorsView from "./IndicatorsView";

export default function Indicators() {
  return (
    <IndicatorsProvider>
      <IndicatorsView />
    </IndicatorsProvider>
  )
}