import { useMemo, useState } from "react";
import { View } from "tamagui";
import { LayoutChangeEvent } from "react-native";
import { Area, CartesianChart, Line } from "victory-native";

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

  return (
    <View f={0.8} onLayout={onLayout}>
      <View height={CHART_HEIGHT} width={parentWidth}>
        <CartesianChart
          data={chartData}
          xKey="date"
          yKeys={["value"]}
          domainPadding={{ bottom: 10 }}
          axisOptions={{ lineWidth: 0 }}
          frame={{ lineWidth: 0 }}
        >
          {({ points, chartBounds }) => (
            <>
              <Line points={points.value} strokeWidth={1.5} color="#43A047" />
              <Area points={points.value} y0={chartBounds.bottom} color="#DEFBE6" />
            </>
          )}
        </CartesianChart>
      </View>
    </View>
  );
};
