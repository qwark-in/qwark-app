import { useRouter } from "expo-router";
import { useDashboardScreenStore } from "../store/dashboardScreenStore";
import { useMarketStore } from "data/stores/market-store";
import { View, XStack } from "tamagui";
import { BodyText } from "ui/display/typography";
import { AnimatedRollingNumber } from "ui/display/animated-rolling-number/AnimatedRollingNumber";
import { MiniChart } from "./MiniChart";

export const StocksAndETFsCard = () => {
  const router = useRouter();
  const eqHoldings = useMarketStore((store) => store.eqHoldings);
  const isVisible = useDashboardScreenStore((store) => store.isVisible);

  if (!eqHoldings) {
    return null;
  }

  const handlePress = () => {
    router.navigate("/(app)/(tabs)/(investments-tab)/stocks");
  };

  return (
    <View
      bg="#FFF"
      bw={1}
      boc="$stroke/disabled"
      px="$4"
      py="$5"
      br="$4"
      gap="$3"
      onPress={handlePress}
    >
      <BodyText color="$text/secondary">Stocks And ETFs</BodyText>
      <XStack jc="space-between" gap="$4" ai="center">
        <AnimatedRollingNumber
          isVisible={isVisible}
          containerStyle={{
            alignItems: "flex-start",
            width: 100,
            overflow: "visible",
          }}
          value={eqHoldings.currentValue}
          // TODO: Make toFixed(2) later
          toFixed={2}
          locale={"en-IN"}
          useGrouping
          enableCompactNotation
          // formattedText={hide ? '₹******' : undefined}
          textStyle={{
            color: "#262626",
            fontWeight: "500",
            fontFamily: "RobotoSerifSemibold",
            fontSize: 28,
            lineHeight: 36,
          }}
          compactNotationStyle={{
            fontSize: 18,
            lineHeight: 20,
          }}
          // (optional)  using the font-variant to avoid layout jumping when the number is updated
          numberStyle={{
            fontVariant: ["tabular-nums", "lining-nums"],
          }}
        />

        <MiniChart chartData={eqHoldings.curretValueChartData} />
      </XStack>
    </View>
  );
};
