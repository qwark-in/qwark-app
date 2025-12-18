import { Separator, View, XStack, YStack } from "tamagui";
import { BodyText, TitleText } from "ui/display/typography";
import { useMarketStore } from "data/stores/market-store";

export const FDHoldingsInfo = () => {
  const { totalMaturityAmount, totalPrincipalAmount, expectedInterest, holdingsData } =
    useMarketStore((store) => store.fdHoldings)!;

  const totalReturns = totalMaturityAmount - totalPrincipalAmount;
  const totalReturnsPercentage = (totalReturns / totalPrincipalAmount) * 100;

  const formattedTotalMaturityAmount =
    "₹" + Intl.NumberFormat("en-IN").format(totalMaturityAmount);
  const formattedTotalPrincipalAmount =
    "₹" + Intl.NumberFormat("en-IN").format(totalPrincipalAmount);

  const formattedReturns = "₹" + Intl.NumberFormat("en-IN").format(totalReturns);

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
            {formattedTotalMaturityAmount}
          </TitleText>
        </XStack>
        <Separator bg="#E7E7E7" />
        <YStack gap="$3">
          <XStack jc="space-between">
            <BodyText color="$text/secondary">Total Returns</BodyText>
            <TitleText
              fow="$emphasized"
              fontVariant={["lining-nums", "tabular-nums"]}
              color={totalReturnsPercentage > 0 ? "$text/success" : "$text/error"}
            >
              {formattedReturns} ({totalReturnsPercentage.toFixed(2)}%)
            </TitleText>
          </XStack>

          <XStack jc="space-between">
            <BodyText color="$text/secondary">Invested</BodyText>
            <TitleText fow="$emphasized" fontVariant={["lining-nums", "tabular-nums"]}>
              {formattedTotalPrincipalAmount}
            </TitleText>
          </XStack>

          <XStack jc="space-between">
            <BodyText color="$text/secondary">Expected Interest</BodyText>
            <TitleText fow="$emphasized" fontVariant={["lining-nums", "tabular-nums"]}>
              {expectedInterest}%
            </TitleText>
          </XStack>
        </YStack>
      </View>
    </View>
  );
};
