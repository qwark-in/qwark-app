import { LineChart } from "react-native-gifted-charts";
import { useMemo, useState } from "react";
import { View } from "tamagui";
import { LayoutChangeEvent } from "react-native";

const CHART_HEIGHT = 32;

function subtractPlaceValue(num: number) {
  const magnitude = Math.pow(10, Math.floor(Math.log10(num)));
  return num - magnitude;
}

export const MiniChart = ({
  chartData,
}: {
  chartData: { value: number; date: string }[];
}) => {
  const [parentWidth, setParentwidth] = useState<number>(0);
  const minValue = useMemo(
    () => Math.min(...chartData.map((item) => item.value)),
    [chartData]
  );

  const onLayout = (e: LayoutChangeEvent) => {
    setParentwidth(e.nativeEvent.layout.width);
  };

  const chartDataMemo = useMemo(
    () => chartData.map((item) => ({ ...item })),
    [chartData]
  ); // To solve object freeze issue in gifted charts

  return (
    <View f={0.8} onLayout={onLayout}>
      <LineChart
        areaChart
        startFillColor="#DEFBE6"
        startOpacity={1}
        endFillColor="#DEFBE6"
        endOpacity={1}
        data={chartDataMemo}
        color1="#43A047"
        thickness1={1.5}
        width={parentWidth}
        height={CHART_HEIGHT}
        yAxisOffset={subtractPlaceValue(minValue)}
        initialSpacing={0}
        adjustToWidth
        hideAxesAndRules
        hideDataPoints
        hideYAxisText
        yAxisThickness={0}
        yAxisLabelWidth={0}
        xAxisLabelsHeight={0}
        hideRules
      />
    </View>
  );
};
