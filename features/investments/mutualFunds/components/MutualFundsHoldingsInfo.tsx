import { Separator, View, XStack, YStack } from "tamagui";
import { BodyText, TitleText } from "ui/display/typography";
import { useMarketStore } from "data/stores/market-store";

const format = (amount: number) => {
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const MutualFundsHoldingsInfo = () => {
  const {
    currentValue,
    investedValue,
    lifetimeReturn,
    monthlyReturn,
    xirr,
    holdingsData,
    sipData,
    curretValueChartData,
  } = useMarketStore((store) => store.mfHoldings)!;

  const monthlySipAmount = sipData.reduce((acc, curr) => acc + curr.sipValue, 0);

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
            {format(currentValue)}
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
              {`${lifetimeReturn.value > 0 ? "+" : ""}`}
              {format(lifetimeReturn.value)} ({lifetimeReturn.percentage}%)
            </TitleText>
          </XStack>
          <XStack jc="space-between">
            <BodyText color="$text/secondary">1M Returns</BodyText>
            <TitleText
              fow="$emphasized"
              fontVariant={["lining-nums", "tabular-nums"]}
              color={monthlyReturn.value > 0 ? "$text/success" : "$text/error"}
            >
              {`${monthlyReturn.value > 0 ? "+" : ""}`}
              {format(monthlyReturn.value)} ({monthlyReturn.percentage}%)
            </TitleText>
          </XStack>

          <XStack jc="space-between">
            <BodyText color="$text/secondary">Invested</BodyText>
            <TitleText fow="$emphasized" fontVariant={["lining-nums", "tabular-nums"]}>
              {format(investedValue)}
            </TitleText>
          </XStack>
          <XStack jc="space-between">
            <BodyText color="$text/secondary">XIRR</BodyText>
            <TitleText fow="$emphasized" fontVariant={["lining-nums", "tabular-nums"]}>
              {xirr}%
            </TitleText>
          </XStack>
          <XStack jc="space-between">
            <BodyText color="$text/secondary">Monthly SIP Amount</BodyText>
            <TitleText fow="$emphasized" fontVariant={["lining-nums", "tabular-nums"]}>
              {format(monthlySipAmount)}
            </TitleText>
          </XStack>
        </YStack>
      </View>
    </View>
  );
};
