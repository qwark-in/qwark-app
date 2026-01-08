import React from "react";
import { getAnalytics } from "@react-native-firebase/analytics";
import { useCashflowScreenStore } from "../store/cashflow-screen-store";
import { Category } from "../types";
import { AnimatedTabType, AnimatedTopTabs } from "ui/layout/AnimatedTopTabs";

type CashflowTopTabsProps = {};

const tabs: AnimatedTabType<Category>[] = [
  {
    id: "EXPENSES",
    title: "Expenses",
    fbAnalyticsId: "expense-tab",
  },
  {
    id: "INCOMES",
    title: "Incomes",
    fbAnalyticsId: "income-tab",
  },
];

export const CashflowTopTabs: React.FC<CashflowTopTabsProps> = ({}) => {
  const setActiveTab = useCashflowScreenStore((store) => store.setActiveTab);
  const activeTab = useCashflowScreenStore((store) => store.activeTab);

  const handleSelectTab = (index: number) => {
    if (process.env.EXPO_PUBLIC_FEATURE_GOOGLE_ANALYTICS === "true") {
      const fbAnalytics = getAnalytics();
      console.debug(
        "[Firebase Analytics] Cashflow Tab:",
        tabs.find((item) => item.id === activeTab)?.title
      );
      fbAnalytics.logScreenView({
        screen_class: "tab",
        screen_name: tabs.find((item) => item.id === activeTab)?.fbAnalyticsId,
      });
    }
    setActiveTab(index === 0 ? "EXPENSES" : "INCOMES");
  };
  return (
    <AnimatedTopTabs
      tabs={tabs}
      activeTabIndex={activeTab === "EXPENSES" ? 0 : 1}
      onTabSelect={handleSelectTab}
    />
  );
};
