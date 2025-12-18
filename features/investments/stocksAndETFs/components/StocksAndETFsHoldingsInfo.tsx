import { useMarketStore } from "data/stores/market-store";
import { Separator, View, XStack, YStack } from "tamagui";
import { BodyText, TitleText } from "ui/display/typography";

export const StocksAndETFsHoldingsInfo = () => {
  const {
    currentValue,
    monthlyReturn,
    investedValue,
    lifetimeReturn,
    holdingsData,
    curretValueChartData,
  } = useMarketStore((store) => store.eqHoldings)!;

  const formattedCurrentValue = "₹" + Intl.NumberFormat("en-IN").format(currentValue);
  const formattedInvestedValue = "₹" + Intl.NumberFormat("en-IN").format(investedValue);
  const formattedLifetimeReturn =
    `${lifetimeReturn.value > 0 ? "+" : "-"}` +
    "₹" +
    Intl.NumberFormat("en-IN").format(lifetimeReturn.value);
  const formattedMonthlyReturn =
    `${monthlyReturn.value > 0 ? "+" : "-"}` +
    "₹" +
    Intl.NumberFormat("en-IN").format(monthlyReturn.value);

  return (
    <View px="$5" mt="$6">
      <XStack jc="space-between" ai="center">
        <TitleText size="$large" fow="$emphasized">
          Holdings ({holdingsData.length})
        </TitleText>
      </XStack>

      <View bg="#FFF" mt="$4" bw={1} boc="$stroke/disabled" br="$4" p="$5" gap="$4">
        <XStack width="100%" jc="space-between" gap="$5">
          <TitleText
            size="$large"
            fow="$emphasized"
            fontVariant={["lining-nums", "tabular-nums"]}
          >
            {formattedCurrentValue}
          </TitleText>

          {/* <MiniChart chartData={curretValueChartData} /> */}
        </XStack>
        <Separator bg="#E7E7E7" />
        <YStack gap="$3">
          <XStack jc="space-between">
            <BodyText color="$text/secondary">Total Returns</BodyText>
            <TitleText
              fow="$emphasized"
              fontVariant={["lining-nums", "tabular-nums"]}
              color={lifetimeReturn.value > 0 ? "$text/success" : "$text/error"}
            >
              {formattedLifetimeReturn} ({lifetimeReturn.percentage}%)
            </TitleText>
          </XStack>
          <XStack jc="space-between">
            <BodyText color="$text/secondary">1M Returns</BodyText>
            <TitleText
              fow="$emphasized"
              fontVariant={["lining-nums", "tabular-nums"]}
              color={monthlyReturn.value > 0 ? "$text/success" : "$text/error"}
            >
              {formattedMonthlyReturn} ({monthlyReturn.percentage}%)
            </TitleText>
          </XStack>
          <XStack jc="space-between">
            <BodyText color="$text/secondary">Invested</BodyText>
            <TitleText fow="$emphasized" fontVariant={["lining-nums", "tabular-nums"]}>
              {formattedInvestedValue}
            </TitleText>
          </XStack>
        </YStack>
      </View>
    </View>
  );
};
