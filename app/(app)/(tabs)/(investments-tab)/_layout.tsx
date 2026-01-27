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
import { getMarketData } from "data/api/data/data-services";
import { useEffect, useState } from "react";
import { useMarketStore } from "data/stores/market-store";
import { useToastController } from "@tamagui/toast";
import { useAuthStore } from "data/stores/auth-store";
import { TitleText } from "ui/display/typography";
import { FilledButton } from "ui/controls/buttons";

const { Navigator } = createMaterialTopTabNavigator();

const TopTabScreensFbAnalyticsIds = [
  "stocks-etf-screen",
  "mutual-funds-screen",
];

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  const authData = useAuthStore((store) => store.authData)!;
  const toast = useToastController();
  const setEqHoldings = useMarketStore((store) => store.setEqHoldings);
  const setMfHoldings = useMarketStore((store) => store.setMfHoldings);

  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(false);

  const getMarket = async () => {
    setError(false);
    setIsLoading(true);
    try {
      const res = await getMarketData(authData);

      console.log("Market response status", res.status);

      if (res.status === 204) {
        // Data not ready
        setIsEmpty(true);
        return;
      }

      if (res.data.eqHoldings) {
        setEqHoldings(res.data.eqHoldings);
      }
      if (res.data.mfHoldings) {
        setMfHoldings(res.data.mfHoldings);
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
    getMarket();
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
        <FilledButton onPress={getMarket}>Try again!</FilledButton>
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View f={1} bg="#FAFAFC" jc="center" ai="center" p="$5" gap="$5">
        <TitleText size="$large">Data not ready!</TitleText>
        <FilledButton onPress={getMarket}>Try again!</FilledButton>
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
              TopTabScreensFbAnalyticsIds[e.data.state.index],
            );
            fbAnalytics.logScreenView({
              screen_class: "topnav-tab",
              screen_name: TopTabScreensFbAnalyticsIds[e.data.state.index],
            });
          }
        },
      }}
    >
      <MaterialTopTabs.Screen
        name="stocks"
        options={{ title: "Stocks & ETFs" }}
      />
      <MaterialTopTabs.Screen
        name="mutual-funds"
        options={{ title: "Mutual Funds" }}
      />
      <MaterialTopTabs.Screen name="fds-rds" options={{ title: "FDs & RDs" }} />
    </MaterialTopTabs>
  );
}
