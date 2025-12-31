import { View, XStack } from "tamagui";
import { useWindowDimensions } from "react-native";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import { useDashboardStore } from "data/stores/dashboard-store";
import { LabelText } from "ui/display/typography";
import { LineChart } from "react-gifted-charts";
import { formatAmount } from "helpers/format-amount";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryContainer,
  VictoryTheme,
} from "victory";

const CHART_HEIGHT = 60;
const POINTER_LABEL_WIDTH = 120;
const YAXIS_EXTRA_HEIGHT = 20;

function subtractPlaceValue(num: number) {
  const magnitude = Math.pow(10, Math.floor(Math.log10(num)));
  return num - magnitude;
}

export const NetworthChart = () => {
  const [measure, setMeasure] = useState<any>(null);
  const { chartData } = useDashboardStore((store) => store.networth)!;
  const { width: screenWidth } = useWindowDimensions();

  const LEFT =
    measure <= POINTER_LABEL_WIDTH / 3
      ? POINTER_LABEL_WIDTH / 2 - 1
      : measure >= screenWidth - 72 - POINTER_LABEL_WIDTH / 2
      ? -POINTER_LABEL_WIDTH / 2
      : 0;

  const minValue = useMemo(
    () => Math.min(...chartData.map((item) => item.value)),
    [chartData]
  );

  const maxValue = useMemo(
    () => Math.max(...chartData.map((item) => item.value)),
    [chartData]
  );

  const startLabel = format(chartData[0].date, "MMM dd");
  const endLabel = format(chartData[chartData.length - 1].date, "MMM dd");

  return (
    <View mt="$6">
      <View height={CHART_HEIGHT} width={screenWidth - 72}>
        <VictoryChart
          height={CHART_HEIGHT}
          width={screenWidth - 72}
          padding={0}
          domainPadding={{
            y: [10, 0],
          }}
          containerComponent={
            <VictoryContainer responsive={false} style={{ touchAction: "none" }} />
          }
          theme={VictoryTheme.clean}
        >
          <VictoryAxis
            dependentAxis
            tickFormat={() => ""}
            style={{ axis: { strokeWidth: 0 } }}
          />
          <VictoryArea
            domain={{
              y: [minValue, maxValue + (maxValue - minValue) * 0.02],
            }}
            data={chartData.map((item) => ({ x: item.date, y: item.value }))}
            style={{
              data: {
                fill: "#E5F6FF",
                stroke: "#1192E8",
                strokeWidth: 1.5,
              },
            }}
          />
        </VictoryChart>
      </View>
      <XStack jc="space-between" mt="$2">
        <LabelText fontVariant={["lining-nums", "tabular-nums"]}>{startLabel}</LabelText>
        <LabelText fontVariant={["lining-nums", "tabular-nums"]}>{endLabel}</LabelText>
      </XStack>
    </View>
  );
};
