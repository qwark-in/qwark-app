import { ScrollView, Separator, View, YStack } from "tamagui";
import { ActivityIndicator, RefreshControl } from "react-native";
import { useGetDashboardData, useGetMarketData } from "data/api";
import { useExitAppOnBackPress } from "hooks/use-exit-app-on-back-press";
import { Networth } from "features/dashboard/components/Networth";
import { Investments } from "features/dashboard/components/Investments";
import { Cashflow } from "features/dashboard/components/Cashflow";
import { BankAccounts } from "features/dashboard/components/BankAccounts";
import { useCallback, useEffect, useState } from "react";
import { getDashboardData } from "data/api/data/data-services";
import { useAuthStore } from "data/stores/auth-store";
import { useDashboardStore } from "data/stores/dashboard-store";
import { TitleText } from "ui/display/typography";
import { useToastController } from "@tamagui/toast";
import { FilledButton } from "ui/controls/buttons";

export default function DashboardScreen() {
  const authData = useAuthStore((store) => store.authData)!;
  const toast = useToastController();
  const setCashflow = useDashboardStore((store) => store.setCashflow);
  const setNetworth = useDashboardStore((store) => store.setNetworth);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(false);

  useExitAppOnBackPress();

  const getDashboard = async () => {
    setError(false);
    setIsLoading(true);
    try {
      const res = await getDashboardData(authData);

      console.log("Dashboard response status", res.status);

      if (res.status === 204) {
        // Data not ready
        setIsEmpty(true);
        return;
      }

      if (res.data.cashflow) {
        setCashflow(res.data.cashflow);
      }
      if (res.data.networth) {
        setNetworth(res.data.networth);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      toast.show("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  if (isLoading) {
    return (
      <View f={1} bg="#FAFAFC" jc="center" ai="center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View f={1} bg="#FAFAFC" jc="center" ai="center" p="$5" gap="$5">
        <TitleText size="$large">Error!</TitleText>
        <FilledButton onPress={getDashboard}>Try again!</FilledButton>
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View f={1} bg="#FAFAFC" jc="center" ai="center" p="$5" gap="$5">
        <TitleText size="$large">Data not ready!</TitleText>
        <FilledButton onPress={getDashboard}>Try again!</FilledButton>
      </View>
    );
  }

  return (
    <View f={1}>
      <Separator bw={1} boc="$stroke/disabled" />
      <ScrollView
        bg="#FAFAFC"
        contentContainerStyle={{
          f: 1,
          px: "$5",
          pt: "$7",
          pb: "$5",
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getDashboard} />
        }
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
