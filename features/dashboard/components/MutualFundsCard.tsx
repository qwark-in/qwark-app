import { useRouter } from "expo-router";
import { useDashboardScreenStore } from "../store/dashboardScreenStore";
import { useMarketStore } from "data/stores/market-store";
import { BodyText } from "ui/display/typography";
import { View, XStack } from "tamagui";
import { AnimatedRollingNumber } from "ui/display/animated-rolling-number/AnimatedRollingNumber";

export const MutualFundsCard = () => {
  const router = useRouter();
  const mfHoldings = useMarketStore((store) => store.mfHoldings);
  const isVisible = useDashboardScreenStore((store) => store.isVisible);

  if (!mfHoldings) {
    return null;
  }

  const handlePress = () => {
    router.navigate("/(app)/(tabs)/(investments-tab)/mutual-funds");
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
      <BodyText color="$text/secondary">Mutual Funds</BodyText>
      <XStack jc="space-between" gap="$4">
        <AnimatedRollingNumber
          isVisible={isVisible}
          containerStyle={{
            alignItems: "flex-start",
            width: 100,
            overflow: "visible",
          }}
          value={mfHoldings.currentValue}
          // TODO: Make toFixed(2) later
          toFixed={2}
          locale={"en-IN"}
          useGrouping
          enableCompactNotation
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
        {/* <MiniChart chartData={mfHoldings.curretValueChartData} /> */}
      </XStack>
    </View>
  );
};
