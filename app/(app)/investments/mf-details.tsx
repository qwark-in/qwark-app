import { useLocalSearchParams } from "expo-router";
import { ScrollView, Separator, View, XStack, YStack } from "tamagui";
import { format } from "date-fns";
import { useMarketStore } from "data/stores/market-store";
import { BodyText, TitleText } from "ui/display/typography";
import { capitalize } from "helpers/capitalize";
import { TransactionLabel } from "features/investments/shared/TransactionLabel";

const formatAmount = (amount: number) => {
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function MfDetailsScreen() {
  const params = useLocalSearchParams();
  const holdingsData = useMarketStore((store) => store.mfHoldings?.holdingsData)!;

  const mfHoldings = holdingsData.find((stock) => stock.mfName === params.mfName)!;
  const mfTransactions = mfHoldings.transactions;

  if (!mfHoldings) {
    return (
      <View f={1} jc="center" ai="center">
        <TitleText>No Details Found</TitleText>
      </View>
    );
  }

  return (
    <ScrollView f={1} bg="#FAFAFC" contentContainerStyle={{ px: "$5", py: "$6" }}>
      <View bg="#FFF" bw={1} boc="$stroke/disabled" br="$3" p="$4">
        <YStack gap="$_5">
          <TitleText>{mfHoldings.mfName}</TitleText>
          <XStack gap="$1">
            <BodyText fow="$emphasized" color="$text/secondary">
              {capitalize(mfHoldings.schemeType.split("_")[0])}
            </BodyText>
            <BodyText fow="$emphasized" color="$text/secondary">
              •
            </BodyText>
            <BodyText fow="$emphasized" color="$text/secondary">
              {capitalize(mfHoldings.schemePlan)}
            </BodyText>
          </XStack>
        </YStack>

        <Separator my="$3" boc="$stroke/disabled" />

        <XStack jc="space-between">
          <BodyText color="$text/secondary">Current</BodyText>
          <TitleText fontVariant={["lining-nums", "tabular-nums"]}>
            {formatAmount(mfHoldings.currentValue)}
          </TitleText>
        </XStack>
        <XStack mt="$1" jc="space-between">
          <BodyText color="$text/secondary">Invested</BodyText>
          <TitleText fontVariant={["lining-nums", "tabular-nums"]}>
            {formatAmount(mfHoldings.investedValue)}
          </TitleText>
        </XStack>
        <XStack mt="$4" jc="space-between">
          <BodyText color="$text/secondary">Returns</BodyText>
          <TitleText fontVariant={["lining-nums", "tabular-nums"]}>
            {formatAmount(mfHoldings.lifetimeReturn.value)} (
            {mfHoldings.lifetimeReturn.percentage})
          </TitleText>
        </XStack>
        <XStack mt="$1" jc="space-between">
          <BodyText color="$text/secondary">XIRR</BodyText>
          <TitleText fontVariant={["lining-nums", "tabular-nums"]}>
            {mfHoldings.xirr}%
          </TitleText>
        </XStack>
        <XStack mt="$4" jc="space-between">
          <BodyText color="$text/secondary">Last Traded NAV</BodyText>
          <TitleText fontVariant={["lining-nums", "tabular-nums"]}>
            {formatAmount(mfHoldings.nav)}
          </TitleText>
        </XStack>
        <XStack mt="$1" jc="space-between">
          <BodyText color="$text/secondary">Balanace Units</BodyText>
          <TitleText fontVariant={["lining-nums", "tabular-nums"]}>
            {mfHoldings.units}
          </TitleText>
        </XStack>
      </View>
      <TitleText size="$small" mt="$8" mb="$4">
        Transactions
      </TitleText>
      <YStack gap="$3">
        {mfTransactions.map((transaction, i) => {
          const formattedTransactionPrice =
            "₹" +
            Intl.NumberFormat("en-IN", {
              minimumFractionDigits: 2,
            }).format(transaction.value);
          return (
            <View key={i} bg="#FFF" p="$4" boc="$stroke/disabled" bw={1} br="$3">
              <XStack jc="space-between">
                <YStack gap="$_5" fs={1} pr="$3">
                  <TitleText size="$small" numberOfLines={1} ellipsizeMode="tail">
                    {mfHoldings.mfName}
                  </TitleText>
                  <BodyText size="$small" fow="$emphasized" color="$text/secondary">
                    {format(transaction.transactionDate, "dd MMM yyyy")}
                  </BodyText>
                </YStack>
                <TransactionLabel
                  variant={transaction.movementType === "SIP" ? "green" : "red"}
                >
                  {transaction.movementType}
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
                    {transaction.units}
                  </TitleText>
                </YStack>
                <YStack gap="$_5" ai="flex-end">
                  <BodyText size="$small" fow="$emphasized" color="$text/secondary">
                    Amount
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
