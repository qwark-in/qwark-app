import { XStack, YStack } from "tamagui";
import { useCashflowScreenStore } from "../store/cashflow-screen-store";
import { CashFlow } from "data/models/dashboard";
import { BodyText } from "ui/display/typography";
import { capitalize } from "helpers/capitalize";
import { AnimatedRollingNumber } from "ui/display/animated-rolling-number/AnimatedRollingNumber";
import { isWithinInterval } from "date-fns";

export const Total = ({ cashflow }: { cashflow: CashFlow[] }) => {
  const activeTab = useCashflowScreenStore((store) => store.activeTab);
  const { dates } = useCashflowScreenStore((store) => store.appliedFilters);
  const total = cashflow
    .flatMap((item) =>
      item.transactions.map((t) => ({ amount: t.amount, date: t.date })),
    )
    .filter((item) =>
      isWithinInterval(new Date(item.date), {
        start: dates.fromDate,
        end: dates.toDate,
      }),
    )
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <XStack pt="$4">
      <YStack gap="$1" w="100%">
        <BodyText color="$text/secondary">
          Total {capitalize(activeTab)}
        </BodyText>

        <AnimatedRollingNumber
          containerStyle={{ alignItems: "flex-start" }}
          value={total}
          toFixed={2}
          locale={"en-IN"}
          useGrouping
          enableCompactNotation={true}
          textStyle={{
            color: "#262626",
            fontWeight: "500",
            fontFamily: "RobotoSerifSemibold",
            fontSize: 28,
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
      </YStack>
    </XStack>
  );
};
