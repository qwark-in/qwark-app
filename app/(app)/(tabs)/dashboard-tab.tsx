import { ScrollView, View, YStack } from "tamagui";
import { ActivityIndicator } from "react-native";
import { useGetDashboardData } from "data/api";
import { useExitAppOnBackPress } from "hooks/use-exit-app-on-back-press";
import { Networth } from "features/dashboard/components/Networth";
import { Investments } from "features/dashboard/components/Investments";
import { Cashflow } from "features/dashboard/components/Cashflow";
import { BankAccounts } from "features/dashboard/components/BankAccounts";

export default function DashboardScreen() {
  const { data, isLoading } = useGetDashboardData();

  useExitAppOnBackPress();

  if (isLoading && !data) {
    return (
      <View f={1} bg="#FAFAFC" jc="center" ai="center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      f={1}
      contentContainerStyle={{
        bg: "#FAFAFC",
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
  );
}
