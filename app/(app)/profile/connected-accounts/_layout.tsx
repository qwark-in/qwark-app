import { withLayoutContext } from "expo-router";
import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { View } from "tamagui";
import { ActivityIndicator } from "react-native";
import { useFinancialProfileStore } from "data/stores/financial-profile-store";
import { useGetFinancialProfileData } from "features/profile/connected-accounts/hooks/useGetFinancialProfile";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  const connectedAccounts = useFinancialProfileStore((store) => store.connectedAccounts);
  const { isLoading } = useGetFinancialProfileData();

  const banks = connectedAccounts.filter((bank) => bank.asset_class_id === "BANK");
  const investments = connectedAccounts.filter((item) => item.asset_class_id !== "BANK");

  if (isLoading) {
    return (
      <View f={1} ai="center" jc="center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <MaterialTopTabs
      overScrollMode="never"
      backBehavior="none"
      screenOptions={{
        tabBarActiveTintColor: "#001484",
        tabBarInactiveTintColor: "#49454F",
        tabBarStyle: {
          elevation: 0,
          borderBottomColor: "#E7E7E7",
          borderBottomWidth: 1.5,
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#001484",
          height: 3,
        },
        tabBarLabelStyle: {
          textTransform: "none",
          fontFamily: "RobotoSerifSemibold",
          fontSize: 14,
          marginHorizontal: 0,
        },
        tabBarPressColor: "rgba(0, 20, 132, 0.1)",
      }}
    >
      <MaterialTopTabs.Screen
        name="banks"
        options={{ title: `Banks (${banks.length})` }}
      />
      <MaterialTopTabs.Screen
        name="investments"
        options={{ title: `Investments (${investments.length})` }}
      />
    </MaterialTopTabs>
  );
}
