import { ScrollView, Separator, View, YStack } from "tamagui";
import { ActivityIndicator } from "react-native";
import { useGetDashboardData, useGetMarketData } from "data/api";
import { useExitAppOnBackPress } from "hooks/use-exit-app-on-back-press";
import { Networth } from "features/dashboard/components/Networth";
import { Investments } from "features/dashboard/components/Investments";
import { Cashflow } from "features/dashboard/components/Cashflow";
import { BankAccounts } from "features/dashboard/components/BankAccounts";

export default function DashboardScreen() {
  const { isLoading: isLoadingDashboard } = useGetDashboardData();
  const { isLoading: isLoadingMarket } = useGetMarketData();

  useExitAppOnBackPress();

  if (isLoadingDashboard || isLoadingMarket) {
    return (
      <View f={1} bg="#FAFAFC" jc="center" ai="center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View f={1}>
      <Separator bw={1} boc="$stroke/disabled" />
      <ScrollView
        f={1}
        bg="#FAFAFC"
        contentContainerStyle={{
          px: "$5",
          pt: "$7",
          pb: "$5",
        }}
        showsVerticalScrollIndicator={false}
      >
        <YStack gap="$8">
          <Networth />
          <Investments />
          <Cashflow />
          <BankAccounts />
        </YStack>
      </ScrollView>
    </View>
  );
}
