import { useCashflowScreenStore } from "../store/CashflowScreenStore";
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

const CHART_HEIGHT = 180;
const TOOLTIP_PADDING_X = 10;
const TOOLTIP_PADDING_Y = 6;
const TOOLTIP_RADIUS = 8;
const TOOLTIP_Y = 5;
const EDGE_PADDING = 4;

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
  const font = useFont(barlow, 14);

  const { state, isActive } = useChartPressState({
    x: "",
    y: { value: 0 },
  });

  /**
   * Chart bounds stored safely
   */
  const chartLeft = useSharedValue(0);
  const chartRight = useSharedValue(0);

  /**
   * Tooltip text
   */
  const xValue = useDerivedValue(() => {
    return `${state.x.value.value}: `;
  });

  const yValue = useDerivedValue(() => {
    return ` ${state.y.value.value.value}`;
  });

  /**
   * Tooltip width
   */
  const tooltipWidth = useDerivedValue(() => {
    if (!font) return 0;
    return (
      font.measureText(xValue.value).width +
      font.measureText(yValue.value).width +
      TOOLTIP_PADDING_X * 2
    );
  });

  /**
   * Clamp ONLY the tooltip rect
   */
  const tooltipRectX = useDerivedValue(() => {
    if (!font) return 0;

    const textWidth =
      font.measureText(xValue.value).width + font.measureText(yValue.value).width;
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
    if (!font) return 0;
    return tooltipTextX.value + font.measureText(xValue.value).width;
  });

  /**
   * Connector line (NOT clamped)
   */
  const lineP1 = useDerivedValue(() =>
    vec(
      state.x.position.value,
      state.y.value.position.value // bar top
    )
  );

  const lineP2 = useDerivedValue(() => {
    if (!font) return vec();
    return vec(
      state.x.position.value, // stays true to data
      TOOLTIP_Y + font.getSize() + TOOLTIP_PADDING_Y * 2
    );
  });

  return (
    <View height={CHART_HEIGHT}>
      <CartesianChart
        data={chartData}
        xKey="date"
        yKeys={["value"]}
        padding={{ left: -5, right: -2 }}
        domainPadding={{ left: 40, right: 40, top: 40 }}
        axisOptions={{ lineWidth: 0 }}
        frame={{ lineWidth: 0 }}
        chartPressState={state}
      >
        {({ points, chartBounds }) => {
          // update bounds (no hooks here)
          chartLeft.value = chartBounds.left;
          chartRight.value = chartBounds.right;

          return (
            <>
              <Bar
                points={points.value}
                chartBounds={chartBounds}
                innerPadding={0.45}
                roundedCorners={{ topLeft: 5, topRight: 5 }}
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

              {isActive && font ? (
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
                    height={font.getSize() + TOOLTIP_PADDING_Y * 2}
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
                    y={TOOLTIP_Y + font.getSize() + TOOLTIP_PADDING_Y - 1}
                    font={font}
                    color="#6F6F6F"
                    text={xValue}
                  />
                  <Text
                    x={tooltipTextY}
                    y={TOOLTIP_Y + font.getSize() + TOOLTIP_PADDING_Y - 1}
                    font={font}
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
