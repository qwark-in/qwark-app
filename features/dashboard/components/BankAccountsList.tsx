import { View, XStack, YStack } from "tamagui";
import { useDashboardScreenStore } from "../store/dashboardScreenStore";
import { Icon } from "ui/assets/icons/adaptive";
import { BodyText, TitleText } from "ui/display/typography";
import { AnimatedRollingNumber } from "ui/display/animated-rolling-number/AnimatedRollingNumber";
import { CashFlow } from "data/models/dashboard";
import { MiniChart } from "./MiniChart";

export const BankAccountsList = ({ cashflow }: { cashflow: CashFlow[] }) => {
  return (
    <View mt="$4" gap="$3">
      {cashflow.map((item, i) => (
        <BankAccountsListItem key={i} details={item} />
      ))}
    </View>
  );
};

const BankAccountsListItem = ({ details }: { details: CashFlow }) => {
  const isVisible = useDashboardScreenStore((store) => store.isVisible);
  const chartData = details.transactions
    .map((item) => ({
      value: item.transactionalBalance,
      date: item.date,
    }))
    .slice(0, 30);

  return (
    <View bg="#FFF" px="$3" py="$4" br="$4" boc="$stroke/disabled" bw={1}>
      <XStack gap="$1">
        <View h="$12" w="$12" jc="center" ai="center">
          <Icon name="bank-logo-placeholder" />
        </View>
        <YStack>
          <TitleText>{details.accountDetails.fipName}</TitleText>
          <BodyText color="$text/secondary">
            *{details.accountDetails.accountNumber.slice(-4)}
          </BodyText>
        </YStack>
      </XStack>
      <BodyText mt="$5" color="$text/secondary">
        Current Balance
      </BodyText>
      <XStack mt="$1" jc="space-between" gap="$4">
        <AnimatedRollingNumber
          isVisible={isVisible}
          containerStyle={{
            alignItems: "flex-start",
            width: 100,
            overflow: "visible",
          }}
          value={details.currentBalance}
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

        <MiniChart chartData={chartData} />
      </XStack>
    </View>
  );
};
