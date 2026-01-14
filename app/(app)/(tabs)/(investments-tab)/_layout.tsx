import { withLayoutContext } from "expo-router";
import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

import { getAnalytics } from "@react-native-firebase/analytics";
import { useGetMarketData } from "data/api";
import { View } from "tamagui";
import { ActivityIndicator } from "react-native";
import { FEATURE_GOOGLE_ANALYTICS } from "settings";

const { Navigator } = createMaterialTopTabNavigator();

const TopTabScreensFbAnalyticsIds = ["stocks-etf-screen", "mutual-funds-screen"];

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  const { error, isLoading, isValidating, mutate } = useGetMarketData();

  if (isLoading) {
    return (
      <View f={1} bg="#FAFAFC" jc="center" ai="center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <MaterialTopTabs
      overScrollMode="never"
      backBehavior="none"
      screenOptions={{
        // swipeEnabled: false,
        tabBarActiveTintColor: "#262626",
        tabBarStyle: {
          elevation: 0,
          paddingHorizontal: 16,
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
        tabBarIndicatorContainerStyle: {
          marginHorizontal: 16,
        },
        tabBarGap: 16,
        tabBarItemStyle: {
          // Make Item width adjust to Label width
          width: "auto",
          paddingHorizontal: 0,
        },

        tabBarScrollEnabled: true,
        tabBarPressColor: "rgba(0, 20, 132, 0.1)",
      }}
      screenListeners={{
        state: (e) => {
          if (FEATURE_GOOGLE_ANALYTICS) {
            const fbAnalytics = getAnalytics();
            console.debug(
              "[Firebase Analytics] Top Nav tab:",
              TopTabScreensFbAnalyticsIds[e.data.state.index]
            );
            fbAnalytics.logScreenView({
              screen_class: "topnav-tab",
              screen_name: TopTabScreensFbAnalyticsIds[e.data.state.index],
            });
          }
        },
      }}
    >
      <MaterialTopTabs.Screen name="stocks" options={{ title: "Stocks & ETFs" }} />
      <MaterialTopTabs.Screen name="mutual-funds" options={{ title: "Mutual Funds" }} />
      <MaterialTopTabs.Screen name="fds-rds" options={{ title: "FDs & RDs" }} />
    </MaterialTopTabs>
  );
}
