import { View } from "tamagui";
import { useCashflowScreenStore } from "../store/cashflow-screen-store";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import { BodyText } from "ui/display/typography";

const CHART_HEIGHT = 180;

export const Chart = ({
  chartData,
}: {
  chartData: {
    value: number;
    date: string;
  }[];
}) => {
  const activeTab = useCashflowScreenStore((store) => store.activeTab);

  return (
    <View height={CHART_HEIGHT}>
      <VictoryChart padding={0} domainPadding={{ y: [0, 40] }} theme={VictoryTheme.clean}>
        <VictoryAxis
          dependentAxis
          tickFormat={() => ""}
          style={{ axis: { strokeWidth: 0 } }}
        />
        <svg style={{ height: 0 }}>
          <defs>
            <linearGradient id="myGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                stopColor={activeTab === "EXPENSES" ? "#FFB3B8" : "#6FDC8C"}
              />
              <stop
                offset="100%"
                stopColor={activeTab === "EXPENSES" ? "#FFD7D9" : "#A7F0BA"}
              />
            </linearGradient>
          </defs>
        </svg>

        <VictoryBar
          data={chartData.map((item) => ({ x: item.date, y: item.value }))}
          labelComponent={
            <VictoryTooltip centerOffset={{ y: -20 }} style={{ fontSize: 24 }} />
          }
          labels={({ datum }) => datum.y}
          barRatio={0.8}
          cornerRadius={{ top: 5 }}
          style={{
            data: {
              fill: "url(#myGradient)",
            },
          }}
        />
      </VictoryChart>
    </View>
  );
};
