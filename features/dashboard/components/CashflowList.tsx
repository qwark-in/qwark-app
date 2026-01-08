import { View, YStack } from "tamagui";
import { CashflowCard } from "./CashflowCard";
import { useMemo } from "react";
import { useRouter } from "expo-router";
import { CashFlow } from "data/models/dashboard";
import { PillSelectorList, usePillSelector } from "ui/controls/selectors/pill-selector";
import { useCashflowScreenStore } from "features/cashflow/store/cashflow-screen-store";
import { Icon } from "ui/assets/icons/adaptive";
import { BankLogo } from "ui/display/bank-logo/BankLogo";

export const CashflowList = ({ cashflow }: { cashflow: CashFlow[] }) => {
  const router = useRouter();
  const { selected, onSelect } = usePillSelector("All");
  const setActiveTab = useCashflowScreenStore((store) => store.setActiveTab);

  const totatlExpenses = useMemo(
    () =>
      cashflow
        .filter((account) =>
          selected === "All" ? true : selected.includes(account.accountDetails.fipName)
        )
        .flatMap((account) =>
          account.transactions
            .filter((transaction) => transaction.type === "DEBIT")
            .map((t) => t.amount)
        )
        .reduce((acc, curr) => acc + curr, 0),
    [cashflow, selected]
  );

  const totatlIncomes = useMemo(
    () =>
      cashflow
        .filter((account) =>
          selected === "All" ? true : selected.includes(account.accountDetails.fipName)
        )
        .flatMap((account) =>
          account.transactions
            .filter((transaction) => transaction.type === "CREDIT")
            .map((t) => t.amount)
        )
        .reduce((acc, curr) => acc + curr, 0),
    [cashflow, selected]
  );

  const banks = cashflow.map((item) => ({
    title:
      item.accountDetails.fipName + " | " + item.accountDetails.accountNumber.slice(-4),
    icon: <BankLogo fipId={item.accountDetails.fipId} />,
  }));

  const pills = [
    { title: "All", icon: <Icon name="bank-logo-placeholder" color="#6F6F6F" /> },
    ...banks,
  ];

  return (
    <View pt="$3">
      <PillSelectorList
        styleProps={{ mr: "$2" }}
        pills={pills}
        onSelect={onSelect}
        selected={selected}
      />
      <YStack gap="$3" mt="$4">
        <View
          onPress={() => {
            setActiveTab("EXPENSES");
            router.navigate("/dashboard/cashflow");
          }}
        >
          <CashflowCard amount={totatlExpenses} title="Expenses" type="DEBIT" />
        </View>
        <View
          onPress={() => {
            setActiveTab("INCOMES");
            router.navigate("/dashboard/cashflow");
          }}
        >
          <CashflowCard amount={totatlIncomes} title="Incomes" type="CREDIT" />
        </View>
      </YStack>
    </View>
  );
};
