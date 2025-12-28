import { useMemo, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { View } from "tamagui";
import {
  VictoryChart,
  VictoryArea,
  VictoryTheme,
  VictoryAxis,
  VictoryContainer,
} from "victory";

const CHART_HEIGHT = 32;

export const MiniChart = ({
  chartData,
}: {
  chartData: { value: number; date: string }[];
}) => {
  const [parentWidth, setParentwidth] = useState<number>(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setParentwidth(e.nativeEvent.layout.width);
  };

  const minValue = useMemo(
    () => Math.min(...chartData.map((item) => item.value)),
    [chartData]
  );

  const maxValue = useMemo(
    () => Math.max(...chartData.map((item) => item.value)),
    [chartData]
  );

  return (
    <View f={0.8} onLayout={onLayout}>
      <View height={CHART_HEIGHT} width={parentWidth}>
        <VictoryChart
          height={CHART_HEIGHT}
          width={parentWidth}
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
                fill: "#DEFBE6",
                stroke: "#43A047",
                strokeWidth: 1.5,
              },
            }}
          />
        </VictoryChart>
      </View>
    </View>
  );
};
