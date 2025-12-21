import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { View, XStack } from "tamagui";
import { format, isAfter, isWithinInterval } from "date-fns";
import * as Haptics from "expo-haptics";
import { getDataTotalByDuration, sortChartData, getPointerLabelWidth } from "../helpers";
import { getChartData } from "../helpers/getChartData";
import { CashFlow } from "data/models/dashboard";
import { useCashflowScreenStore } from "../store/CashflowScreenStore";
import { BodyText, TitleText } from "ui/display/typography";
import { timeframes } from "features/dashboard/constants";
import { TimeframeSelector } from "features/dashboard/components/TimeframeSelectorCustom";
import { formatAmount } from "helpers/format-amount";

const CHART_HEIGHT = 180;
const YAXIS_EXTRA_HEIGHT = 30;
const SPACING_TO_BARWIDTH_RATIO = 0.8;

type CashflowChartProps = {
  cashflow: CashFlow[];
};

export const CashflowChart: React.FC<CashflowChartProps> = ({ cashflow }) => {
  const appliedFilters = useCashflowScreenStore((store) => store.appliedFilters);
  const setDuration = useCashflowScreenStore((store) => store.setDuration);

  const data = cashflow.flatMap((item) =>
    item.transactions
      .filter((item) =>
        isWithinInterval(item.date, {
          start: new Date(appliedFilters.dates.fromDate),
          end: new Date(appliedFilters.dates.toDate),
        })
      )
      .map((a) => ({ value: a.amount, date: a.date }))
  );

  const dataTotalByDate = getDataTotalByDuration(data, appliedFilters.duration);
  const dataSorted = sortChartData(dataTotalByDate);
  const chartData = getChartData(dataSorted);

  // Chart X-axis labels
  const startLabel = format(appliedFilters.dates.fromDate, "dd MMM");
  const endLabel = format(appliedFilters.dates.toDate, "dd MMM");

  useEffect(() => {
    const lastTransactionDate = cashflow
      .map((item) => item.lastTransactionDate)
      .reduce((acc, curr) => (isAfter(curr, acc) ? curr : acc));

    setDuration("1M", new Date(lastTransactionDate));
  }, []);

  return (
    <View mb="$3">
      {dataSorted.length !== 0 ? (
        // <ChartComponent chartData={chartData} />
        <BodyText>Chart Placeholder</BodyText>
      ) : (
        <View h={CHART_HEIGHT + YAXIS_EXTRA_HEIGHT + 5} ai="center" jc="center">
          <TitleText>No Data Found</TitleText>
        </View>
      )}

      <XStack jc="space-between">
        <BodyText>{startLabel}</BodyText>
        <BodyText>{endLabel}</BodyText>
      </XStack>

      <View py="$2" mt="$3">
        <TimeframeSelector
          timeframes={timeframes}
          onTimeframeSelect={setDuration}
          selectedTimeframeValue={appliedFilters.duration}
        />
      </View>
    </View>
  );
};

// const ChartComponent = ({ chartData }) => {
//   const { width: screenWidth } = useWindowDimensions();
//   const [measure, setMeasure] = useState<any>(null);
//   const activeTab = useCashflowScreenStore((store) => store.activeTab);
//   const appliedFilters = useCashflowScreenStore((store) => store.appliedFilters);
//   const [focusedBarIndex, setFocusedBarIndex] = useState<number>(0);
//   const setIsPointerEnabled = useCashflowScreenStore(
//     (store) => store.setIsPointerEnabled
//   );

//   useEffect(() => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
//   }, [focusedBarIndex]);

//   const POINTER_LABEL_WIDTH = getPointerLabelWidth(appliedFilters.dates);

//   const chartWidth = screenWidth - 40; // px={40}
//   const sectionWidth = chartWidth / chartData.length;
//   /**
//    * barWidth + spacing = sectionWidth
//    * spacing = SPACING_TO_BARWIDTH_RATIO * barWidth
//    */
//   const barWidth = sectionWidth / (1 + SPACING_TO_BARWIDTH_RATIO);
//   const spacing = barWidth * SPACING_TO_BARWIDTH_RATIO;

//   return (
//     <BarChart
//       data={chartData}
//       showGradient
//       gradientColor={activeTab === "EXPENSES" ? "#FFB3B8" : "#6FDC8C"}
//       frontColor={activeTab === "EXPENSES" ? "#FFD7D9" : "#A7F0BA"}
//       focusedBarConfig={{
//         color: activeTab === "EXPENSES" ? "#FF8389" : "#42BE65",
//         gradientColor: activeTab === "EXPENSES" ? "#FF8389" : "#42BE65",
//       }}
//       focusedBarIndex={focusedBarIndex}
//       focusBarOnPress
//       width={screenWidth - 40}
//       barWidth={barWidth}
//       spacing={spacing}
//       height={CHART_HEIGHT}
//       initialSpacing={spacing / 2}
//       endSpacing={0}
//       minHeight={0}
//       // hideAxesAndRules
//       xAxisColor={"#e0e0e0"}
//       hideYAxisText
//       xAxisLabelsHeight={0}
//       yAxisThickness={0}
//       yAxisLabelWidth={0}
//       hideRules
//       getPointerProps={({ pointerX, pointerIndex }) => {
//         setIsPointerEnabled(pointerX !== 0);
//         setMeasure(pointerX);
//         setFocusedBarIndex(pointerIndex);
//       }}
//       yAxisExtraHeight={YAXIS_EXTRA_HEIGHT}
//       pointerConfig={{
//         pointerStripColor: "#6F6F6F",
//         pointerStripWidth: 0.5,
//         shiftPointerLabelY: POINTER_LABEL_WIDTH / 2 - 16,
//         shiftPointerLabelX: -(POINTER_LABEL_WIDTH - 24) / 2,
//         pointerLabelWidth: POINTER_LABEL_WIDTH,
//         pointerStripUptoDataPoint: false,
//         pointerStripHeight: CHART_HEIGHT + 10,
//         pointerColor: "transparent",
//         activatePointersOnLongPress: true,
//         pointerLabelComponent: (items) => {
//           const formattedAmount = formatAmount(items[0].value);

//           // Left padding for pointer label
//           const LEFT =
//             measure <= POINTER_LABEL_WIDTH / 2
//               ? POINTER_LABEL_WIDTH / 2 - 10
//               : measure > screenWidth - 72 - POINTER_LABEL_WIDTH / 2
//               ? -(POINTER_LABEL_WIDTH / 2)
//               : 0;

//           return (
//             <View
//               style={{
//                 paddingHorizontal: 6,
//                 paddingVertical: 3,
//                 left: LEFT,
//               }}
//             >
//               <XStack gap="$2">
//                 <BodyText ta="center" color="$text/secondary">
//                   {`${items[0].date}`}
//                 </BodyText>
//                 <View blw={1} boc="$stroke/secondary"></View>
//                 <BodyText
//                   fow="$emphasized"
//                   color={activeTab === "EXPENSES" ? "$text/error" : "$text/success"}
//                 >
//                   {formattedAmount}
//                 </BodyText>
//               </XStack>
//             </View>
//           );
//         },
//       }}
//     />
//   );
// };
