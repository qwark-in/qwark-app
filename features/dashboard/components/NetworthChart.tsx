import { View, XStack } from "tamagui";
import { useWindowDimensions } from "react-native";
import { useMemo, useState } from "react";
import { LineChart } from "react-native-gifted-charts";
import { format } from "date-fns";
import { useDashboardStore } from "data/stores/dashboard-store";
import { formatAmount } from "helpers/format-amount";
import { LabelText } from "ui/display/typography";

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

  const startLabel = format(chartData[0].date, "MMM dd");
  const endLabel = format(chartData[chartData.length - 1].date, "MMM dd");

  const chartDataMemo = useMemo(
    () => chartData.map((item) => ({ ...item })),
    [chartData]
  ); // To solve object freeze issue in gifted charts

  return (
    <View>
      <LineChart
        areaChart
        startFillColor="#E5F6FF"
        startOpacity={1}
        endFillColor="#E5F6FF"
        endOpacity={1}
        data={chartDataMemo}
        color1="#1192E8"
        thickness1={1.5}
        lineGradient={false}
        curved
        width={screenWidth - 74}
        height={CHART_HEIGHT}
        yAxisOffset={subtractPlaceValue(minValue)}
        initialSpacing={0} //[*WEIRD*] Ideal: {0}. But tooltip for 1st data point doesn't work when spacing goes less than 7
        adjustToWidth
        hideAxesAndRules
        hideDataPoints
        hideYAxisText
        yAxisThickness={0}
        yAxisLabelWidth={0}
        xAxisLabelsHeight={0}
        hideRules
        getPointerProps={({ pointerX }) => {
          //   setIsPointerEnabled(pointerX !== 0);
          setMeasure(pointerX);
        }}
        yAxisExtraHeight={YAXIS_EXTRA_HEIGHT}
        pointerConfig={{
          pointerStripWidth: 0,
          shiftPointerLabelY: 30,
          shiftPointerLabelX: -(POINTER_LABEL_WIDTH - 24) / 2,
          pointerLabelWidth: POINTER_LABEL_WIDTH,
          pointerStripUptoDataPoint: false,
          pointerStripHeight: CHART_HEIGHT - 10,
          activatePointersOnLongPress: true,
          pointerComponent: () => {
            return (
              <View jc="center" ai="center" transform={[{ translateY: -1 }]} zIndex={-1}>
                <View
                  width={14}
                  height={14}
                  opacity={0.4}
                  bg={"#475c82"}
                  borderRadius={9999}
                />
                <View
                  pos="absolute"
                  top={3.5}
                  left={3.5}
                  width={7}
                  height={7}
                  bg={"#597ab8"}
                  br={9999}
                />
              </View>
            );
          },

          pointerLabelComponent: (items) => {
            const formattedAmount = formatAmount(items[0].value);
            return (
              <View
                style={{
                  paddingHorizontal: 6,
                  paddingVertical: 3,
                  borderWidth: 0.5,
                  borderColor: "#3b3b3d",
                  backgroundColor: "#fff",
                  left: LEFT,
                }}
              >
                <XStack gap="$1">
                  <LabelText fow="$emphasized" textAlign="center" color="$text/secondary">
                    {`${format(items[0].date, "dd/MM/yy")}`}
                  </LabelText>
                  <View borderLeftWidth={1} borderColor="$stroke/secondary"></View>
                  <LabelText fow="$emphasized">{formattedAmount}</LabelText>
                </XStack>
              </View>
            );
          },
        }}
      />
      <XStack jc="space-between">
        <LabelText fontVariant={["lining-nums", "tabular-nums"]}>{startLabel}</LabelText>
        <LabelText fontVariant={["lining-nums", "tabular-nums"]}>{endLabel}</LabelText>
      </XStack>
    </View>
  );
};
