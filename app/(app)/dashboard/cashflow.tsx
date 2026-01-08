import { useEffect, useRef } from "react";
import { ScrollView, Spinner, View } from "tamagui";
import { useDashboardStore } from "data/stores/dashboard-store";
import { CashflowChart } from "features/cashflow/components/CashflowChart";
import { CashflowTopTabs } from "features/cashflow/components/CashflowTopTabs";
import { Total } from "features/cashflow/components/Total";
import { TransactionList } from "features/cashflow/components/TransactionList";
import { activeTabMap } from "features/cashflow/constants";
import { useCashflowScreenStore } from "features/cashflow/store/cashflow-screen-store";
import { Icon } from "ui/assets/icons/adaptive";
import { PillSelectorList, usePillSelector } from "ui/controls/selectors/pill-selector";
import { BankLogo } from "ui/display/bank-logo/BankLogo";

export default function CashflowScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const cashflow = useDashboardStore((store) => store.cashflow);
  const activeTab = useCashflowScreenStore((store) => store.activeTab);

  const { onSelect, selected } = usePillSelector("All");

  if (!cashflow) {
    return (
      <View
        f={1}
        ai="center"
        mt="$3"
        p="$4"
        borderRadius="$3"
        bw={1}
        boc="$stroke/disabled"
      >
        <Spinner size="large" color="$blue/50" mt="$4" />
      </View>
    );
  }

  const banks = cashflow.map((item) => ({
    title:
      item.accountDetails.fipName + " | " + item.accountDetails.accountNumber.slice(-4),
    icon: <BankLogo fipId={item.accountDetails.fipId} />,
  }));

  const pills = [
    { title: "All", icon: <Icon name="bank-logo-placeholder" color="#6F6F6F" /> },
    ...banks,
  ];

  const filteredCashflow = cashflow
    .filter((item) =>
      selected === "All" ? true : selected.includes(item.accountDetails.fipName)
    )
    .map((item) => ({
      ...item,
      transactions: item.transactions.filter((t) => t.type === activeTabMap[activeTab]),
    }));

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [activeTab]);

  return (
    <ScrollView
      ref={scrollRef}
      stickyHeaderIndices={[0]}
      flex={1}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
    >
      <CashflowTopTabs />

      <View px="$5">
        <PillSelectorList pills={pills} onSelect={onSelect} selected={selected} />
        <Total cashflow={filteredCashflow} />
        <CashflowChart cashflow={filteredCashflow} />
      </View>

      <TransactionList cashflow={filteredCashflow} />
    </ScrollView>
  );
}
