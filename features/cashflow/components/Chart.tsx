import { useCashflowScreenStore } from "../store/cashflow-screen-store";
import { View } from "tamagui";
import { Bar, CartesianChart, useChartPressState } from "victory-native";
import {
  LinearGradient,
  vec,
  Text,
  useFont,
  RoundedRect,
  Shadow,
  Line,
} from "@shopify/react-native-skia";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { formatAmount } from "helpers/format-amount";

const CHART_HEIGHT = 250;
const TOOLTIP_PADDING_X = 10;
const TOOLTIP_PADDING_Y = 6;
const TOOLTIP_RADIUS = 8;
const TOOLTIP_Y = 5;
const EDGE_PADDING = 4;

const roboto = require("../../../assets/fonts/roboto-serif/RobotoSerif-Medium.ttf");
const barlow = require("../../../assets/fonts/barlow/Barlow-Medium.ttf");

export const Chart = ({
  chartData,
}: {
  chartData: {
    value: number;
    date: string;
  }[];
}) => {
  const activeTab = useCashflowScreenStore((store) => store.activeTab);
  const robotoFont = useFont(roboto, 12);
  const barlowFont = useFont(barlow, 12);

  const { state, isActive } = useChartPressState({
    x: "",
    y: { value: 0 },
  });

  /**
   * Chart bounds stored safely
   */
  const chartLeft = useSharedValue(0);
  const chartRight = useSharedValue(0);

  const handleChartBounds = (bounds: { left: number; right: number }) => {
    chartLeft.value = bounds.left;
    chartRight.value = bounds.right;
  };

  /**
   * Tooltip text
   */
  const xValue = useDerivedValue(() => {
    return `${state.x.value.value}: `;
  });

  const yValue = useDerivedValue(() => {
    return ` ${formatAmount(state.y.value.value.value)}`;
  });

  /**
   * Tooltip width
   */
  const tooltipWidth = useDerivedValue(() => {
    if (!barlowFont || !robotoFont) return 0;
    return (
      barlowFont.measureText(xValue.value).width +
      robotoFont.measureText(yValue.value).width +
      TOOLTIP_PADDING_X * 2
    );
  });

  /**
   * Clamp ONLY the tooltip rect
   */
  const tooltipRectX = useDerivedValue(() => {
    if (!barlowFont || !robotoFont) return 0;

    const textWidth =
      barlowFont.measureText(xValue.value).width +
      robotoFont.measureText(yValue.value).width;
    const width = textWidth + TOOLTIP_PADDING_X * 2;

    const idealX = state.x.position.value - textWidth / 2 - TOOLTIP_PADDING_X;

    const minX = chartLeft.value + EDGE_PADDING;
    const maxX = chartRight.value - width - EDGE_PADDING;

    return Math.min(Math.max(idealX, minX), maxX);
  });

  /**
   * Tooltip text X (inside rect)
   */
  const tooltipTextX = useDerivedValue(() => {
    return tooltipRectX.value + TOOLTIP_PADDING_X;
  });

  const tooltipTextY = useDerivedValue(() => {
    if (!barlowFont) return 0;
    return tooltipTextX.value + barlowFont.measureText(xValue.value).width;
  });

  /**
   * Connector line (NOT clamped)
   */
  const lineP1 = useDerivedValue(() =>
    vec(
      state.x.position.value,
      state.y.value.position.value, // bar top
    ),
  );

  const lineP2 = useDerivedValue(() => {
    if (!barlowFont) return vec();
    return vec(
      state.x.position.value, // stays true to data
      TOOLTIP_Y + barlowFont.getSize() + TOOLTIP_PADDING_Y * 2,
    );
  });

  const maxValue = Math.max(...chartData.map((item) => item.value));

  const upperBoundMaxValue = (maxValue * 5.5) / 5;

  return (
    <View height={CHART_HEIGHT}>
      <CartesianChart
        data={chartData}
        xKey="date"
        yKeys={["value"]}
        padding={{ left: 20, top: 4, bottom: 4 }}
        domainPadding={{ left: 20, right: 20, top: 0 }}
        chartPressState={state}
        onChartBoundsChange={handleChartBounds}
        frame={{ lineWidth: { top: 0, left: 0 } }}
        xAxis={{
          font: barlowFont,
          labelColor: "#6F6F6F",
          lineWidth: 0,
          labelOffset: 10,
          tickCount: 3,
        }}
        yAxis={[
          {
            font: robotoFont,
            labelColor: "#6F6F6F",
            axisSide: "right",
            lineWidth: 0,

            tickValues: [
              0,
              upperBoundMaxValue / 5,
              (upperBoundMaxValue / 5) * 2,
              (upperBoundMaxValue / 5) * 3,
              (upperBoundMaxValue / 5) * 4,
              upperBoundMaxValue,
            ],
            formatYLabel(label) {
              return `${formatAmount(label, 1)}`;
            },
          },
        ]}
      >
        {({ points, chartBounds }) => {
          return (
            <>
              <Bar
                points={points.value}
                chartBounds={chartBounds}
                innerPadding={0.45}
                roundedCorners={{
                  topLeft: 9999,
                  topRight: 9999,
                  bottomLeft: 9999,
                  bottomRight: 9999,
                }}
                animate={{ type: "timing", duration: 500 }}
              >
                <LinearGradient
                  start={vec(0, 0)}
                  end={vec(0, CHART_HEIGHT)}
                  colors={[
                    activeTab === "EXPENSES" ? "#FFB3B8" : "#6FDC8C",
                    activeTab === "EXPENSES" ? "#FFD7D9" : "#A7F0BA",
                  ]}
                />
              </Bar>

              {isActive && barlowFont ? (
                <>
                  {/* Thin connector line (always straight) */}
                  <Line
                    p1={lineP1}
                    p2={lineP2}
                    strokeWidth={1}
                    color="rgba(0,0,0,0.15)"
                  />

                  {/* Tooltip background (clamped only) */}
                  <RoundedRect
                    x={tooltipRectX}
                    y={TOOLTIP_Y}
                    width={tooltipWidth}
                    height={barlowFont.getSize() + TOOLTIP_PADDING_Y * 2}
                    r={TOOLTIP_RADIUS}
                    color="white"
                  >
                    <Shadow
                      dx={0}
                      dy={0}
                      blur={4}
                      color={
                        activeTab === "EXPENSES"
                          ? "rgba(255, 179, 184, 0.5)"
                          : "rgba(111, 220, 140, 0.5)"
                      }
                    />
                  </RoundedRect>

                  {/* Tooltip text */}
                  <Text
                    x={tooltipTextX}
                    y={TOOLTIP_Y + barlowFont.getSize() + TOOLTIP_PADDING_Y - 1}
                    font={barlowFont}
                    color="#6F6F6F"
                    text={xValue}
                  />
                  <Text
                    x={tooltipTextY}
                    y={TOOLTIP_Y + barlowFont.getSize() + TOOLTIP_PADDING_Y - 1}
                    font={robotoFont}
                    text={yValue}
                    color={activeTab === "EXPENSES" ? "#DA1E28" : "#24A148"}
                  />
                </>
              ) : null}
            </>
          );
        }}
      </CartesianChart>
    </View>
  );
};
