import { useLocalSearchParams } from "expo-router";
import { ScrollView, Separator, View, XStack, YStack } from "tamagui";
import { format } from "date-fns";
import { useMarketStore } from "data/stores/market-store";
import { BodyText, LabelText, TitleText } from "ui/display/typography";
import { TransactionLabel } from "features/investments/shared/TransactionLabel";
import { capitalize } from "helpers/capitalize";

export default function StockDetailsScreen() {
  const params = useLocalSearchParams();
  const holdingsData = useMarketStore((store) => store.eqHoldings?.holdingsData)!;

  const stockHoldings = holdingsData.find(
    (stock) => stock.companyName === params.companyName
  )!;
  const stockTransactions = stockHoldings.transactions;

  const formattedCurrentValue =
    "₹" + Intl.NumberFormat("en-IN").format(stockHoldings.currentValue);
  const formattedInvestedValue =
    "₹" + Intl.NumberFormat("en-IN").format(stockHoldings.investedValue);
  const formattedLastTradedPrice =
    "₹" + Intl.NumberFormat("en-IN").format(stockHoldings.lastTradedPrice);

  if (stockTransactions.length === 0) {
    return (
      <View f={1} jc="center" ai="center">
        <TitleText>No Transactions Found</TitleText>
      </View>
    );
  }

  return (
    <ScrollView f={1} bg="#FAFAFC" contentContainerStyle={{ px: "$5", py: "$6" }}>
      <View bg="#FFF" bw={1} boc="$stroke/disabled" br="$3" p="$4">
        <XStack gap="$1" jc="space-between">
          <YStack gap="$_5">
            <TitleText>{stockHoldings.companyName}</TitleText>
            <BodyText fow="$emphasized" color="$text/secondary">
              Shares{"  "}
              <LabelText size="$large" fontVariant={["lining-nums", "tabular-nums"]}>
                {stockHoldings.qty}
              </LabelText>
            </BodyText>
          </YStack>
          <YStack gap="$_5" ai="flex-end">
            <TitleText fow="$emphasized" fontVariant={["lining-nums", "tabular-nums"]}>
              {formattedLastTradedPrice}
            </TitleText>
            <BodyText fow="$emphasized" color="$text/secondary">
              Last Traded Price
            </BodyText>
          </YStack>
        </XStack>

        <Separator my="$3" boc="$stroke/disabled" />

        <XStack jc="space-between">
          <BodyText color="$text/secondary">Current</BodyText>
          <TitleText fontVariant={["lining-nums", "tabular-nums"]}>
            {formattedCurrentValue}
          </TitleText>
        </XStack>
        <XStack mt="$1" jc="space-between">
          <BodyText color="$text/secondary">Invested</BodyText>
          <TitleText fontVariant={["lining-nums", "tabular-nums"]}>
            {formattedInvestedValue}
          </TitleText>
        </XStack>
        <XStack mt="$4" jc="space-between">
          <BodyText color="$text/secondary">1M Returns</BodyText>
          <TitleText
            fow="$emphasized"
            fontVariant={["lining-nums", "tabular-nums"]}
            color={
              stockHoldings.monthlyReturn.value > 0 ? "$text/success" : "$text/error"
            }
          >
            ₹{stockHoldings.monthlyReturn.value} ({stockHoldings.monthlyReturn.percentage}
            %)
          </TitleText>
        </XStack>
        <XStack mt="$1" jc="space-between">
          <BodyText color="$text/secondary">CAGR</BodyText>
          <TitleText
            fontVariant={["lining-nums", "tabular-nums"]}
            color={stockHoldings.cagr > 0 ? "$text/success" : "$text/error"}
          >
            {stockHoldings.cagr}%
          </TitleText>
        </XStack>
      </View>
      <TitleText size="$small" mt="$8" mb="$4">
        Transactions
      </TitleText>
      <YStack gap="$3">
        {stockTransactions.map((transaction, i) => {
          const formattedTransactionPrice =
            "₹" +
            Intl.NumberFormat("en-IN", {
              minimumFractionDigits: 2,
            }).format(transaction.price);
          return (
            <View key={i} bg="#FFF" p="$4" boc="$stroke/disabled" bw={1} br="$3">
              <XStack jc="space-between">
                <YStack gap="$_5">
                  <TitleText size="$small">{stockHoldings.companyName}</TitleText>
                  <XStack gap="$1">
                    <BodyText color="$text/accent" size="$small" fow="$emphasized">
                      {transaction.exchange}
                    </BodyText>
                    <BodyText size="$small" fow="$emphasized" color="$text/secondary">
                      •
                    </BodyText>
                    <BodyText size="$small" fow="$emphasized" color="$text/secondary">
                      {format(new Date(transaction.tnxDateString), "dd MMM yyyy")}
                    </BodyText>
                  </XStack>
                </YStack>
                <TransactionLabel
                  variant={transaction.tnxType === "BUY" ? "green" : "red"}
                >
                  {capitalize(transaction.tnxType)}
                </TransactionLabel>
              </XStack>

              <XStack mt="$3" jc="space-between">
                <YStack gap="$_5">
                  <BodyText size="$small" fow="$emphasized" color="$text/secondary">
                    Units
                  </BodyText>
                  <TitleText
                    size="$small"
                    fow="$emphasized"
                    fontVariant={["lining-nums"]}
                  >
                    {transaction.qty}
                  </TitleText>
                </YStack>
                <YStack gap="$_5" ai="flex-end">
                  <BodyText size="$small" fow="$emphasized" color="$text/secondary">
                    Transaction Price
                  </BodyText>
                  <TitleText
                    size="$small"
                    fow="$emphasized"
                    fontVariant={["lining-nums"]}
                  >
                    {formattedTransactionPrice}
                  </TitleText>
                </YStack>
              </XStack>
            </View>
          );
        })}
      </YStack>
    </ScrollView>
  );
}
