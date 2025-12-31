import { View, XStack } from "tamagui";
import { useWindowDimensions } from "react-native";
import { format } from "date-fns";
import { useDashboardStore } from "data/stores/dashboard-store";
import { LabelText } from "ui/display/typography";
import { Area, CartesianChart, Line } from "victory-native";

const CHART_HEIGHT = 60;

export const NetworthChart = () => {
  const { chartData } = useDashboardStore((store) => store.networth)!;
  const { width: screenWidth } = useWindowDimensions();

  const startLabel = format(chartData[0].date, "MMM dd");
  const endLabel = format(chartData[chartData.length - 1].date, "MMM dd");

  return (
    <View mt="$6">
      <View height={CHART_HEIGHT} width={screenWidth - 74}>
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
              <Line points={points.value} strokeWidth={1.5} color="#1192E8" />
              <Area points={points.value} y0={chartBounds.bottom} color="#E5F6FF" />
            </>
          )}
        </CartesianChart>
      </View>
      <XStack jc="space-between" mt="$2">
        <LabelText fontVariant={["lining-nums", "tabular-nums"]}>{startLabel}</LabelText>
        <LabelText fontVariant={["lining-nums", "tabular-nums"]}>{endLabel}</LabelText>
      </XStack>
    </View>
  );
};
