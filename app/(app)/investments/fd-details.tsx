import { useLocalSearchParams } from "expo-router";
import { ScrollView, Separator, View, XStack, YStack } from "tamagui";
import { format } from "date-fns";
import { BodyText, LabelText, TitleText } from "ui/display/typography";
import { TransactionLabel } from "features/investments/shared/TransactionLabel";
import { useMarketStore } from "data/stores/market-store";

const formatAmount = (amount: number) => {
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function FdDetailsScreen() {
  const params = useLocalSearchParams();
  const holdingsData = useMarketStore((store) => store.fdHoldings?.holdingsData)!;

  const fdHoldings = holdingsData.find(
    (stock) => stock.issuerName === params.issuerName
  )!;
  const fdTransactions = fdHoldings.transactions;

  if (!fdHoldings) {
    return (
      <View f={1} jc="center" ai="center">
        <TitleText>No Details Found</TitleText>
      </View>
    );
  }

  const formattedMaturityAmount =
    "₹" + Intl.NumberFormat("en-IN").format(fdHoldings.maturityAmount);

  return (
    <ScrollView
      f={1}
      bg="#FAFAFC"
      contentContainerStyle={{ px: "$5", py: "$6" }}
      showsVerticalScrollIndicator={false}
    >
      <View bg="#FFF" bw={1} boc="$stroke/disabled" br="$3" p="$4">
        <XStack gap="$1" jc="space-between">
          <YStack gap="$_5">
            <TitleText numberOfLines={1} ellipsizeMode="clip">
              {fdHoldings.issuerName}
            </TitleText>
            <BodyText fow="$emphasized" color="$text/secondary">
              Interest Rate{"  "}
              <LabelText size="$large" fontVariant={["lining-nums", "tabular-nums"]}>
                {fdHoldings.interestRate}%
              </LabelText>
            </BodyText>
          </YStack>
          <YStack gap="$_5" ai="flex-end">
            <TitleText fow="$emphasized" fontVariant={["lining-nums", "tabular-nums"]}>
              {formattedMaturityAmount}
            </TitleText>
            <BodyText fow="$emphasized" color="$text/secondary">
              Maturity Amount
            </BodyText>
          </YStack>
        </XStack>

        <Separator my="$4" boc="$stroke/disabled" />

        <XStack jc="space-between">
          <BodyText color="$text/secondary">Invested</BodyText>
          <TitleText fontVariant={["lining-nums", "tabular-nums"]}>
            {formatAmount(fdHoldings.principalAmount)}
          </TitleText>
        </XStack>
        <XStack mt="$4" jc="space-between">
          <BodyText color="$text/secondary">Investment Date</BodyText>
          <TitleText fontVariant={["lining-nums", "tabular-nums"]}>
            {format(new Date(fdHoldings.startDate), "dd MMM yyyy")}
          </TitleText>
        </XStack>
        <XStack mt="$4" jc="space-between">
          <BodyText color="$text/secondary">Tenure</BodyText>
          <TitleText fontVariant={["lining-nums", "tabular-nums"]}>
            {fdHoldings.durationInDays} Days
          </TitleText>
        </XStack>
      </View>
      <YStack gap="$3" mt="$4">
        {fdTransactions.map((transaction, i) => {
          const formattedTransactionPrice =
            "₹" +
            Intl.NumberFormat("en-IN", {
              minimumFractionDigits: 2,
            }).format(transaction.amount);
          return (
            <View key={i} bg="#FFF" p="$4" boc="$stroke/disabled" bw={1} br="$3">
              <XStack jc="space-between">
                <YStack gap="$_5" fs={1} pr="$3">
                  <TitleText size="$small" numberOfLines={1} ellipsizeMode="tail">
                    {fdHoldings.issuerName}
                  </TitleText>
                  <BodyText size="$small" fow="$emphasized" color="$text/secondary">
                    {format(transaction.date, "dd MMM yyyy")}
                  </BodyText>
                </YStack>
                <TransactionLabel variant="green">{transaction.type}</TransactionLabel>
              </XStack>

              <XStack mt="$3" jc="space-between">
                <YStack gap="$_5">
                  <BodyText size="$small" fow="$emphasized" color="$text/secondary">
                    Mode
                  </BodyText>
                  <TitleText
                    size="$small"
                    fow="$emphasized"
                    fontVariant={["lining-nums"]}
                  >
                    {transaction.mode}
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
