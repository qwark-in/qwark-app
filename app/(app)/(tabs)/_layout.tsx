import { Tabs } from "expo-router";
import { getAnalytics } from "@react-native-firebase/analytics";
import { CustomBottomTabs } from "navigation/CustomBottomTabs";
import { HideAmountButton } from "features/dashboard/components/HideAmountButton";
import { Icon } from "ui/assets/icons/adaptive";
import { RawColor } from "ui/assets/icons/adaptive/types";

export const BottomTabScreensFbAnalyticsIds = [
  "dashboard-screen",
  "investment-screen",
  "profile-screen",
];

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomBottomTabs {...props} />}
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        animation: "fade",
        tabBarActiveTintColor: "#001484",
        tabBarInactiveTintColor: "#6F6F6F",
      }}
      screenListeners={{
        state: (e) => {
          if (process.env.EXPO_PUBLIC_FEATURE_GOOGLE_ANALYTICS === "true") {
            const fbAnalytics = getAnalytics();
            console.debug(
              "[Firebase Analytics] Bottom Nav tab:",
              BottomTabScreensFbAnalyticsIds[e.data.state.index]
            );
            fbAnalytics.logScreenView({
              screen_class: "bottomnav-tab",
              screen_name: BottomTabScreensFbAnalyticsIds[e.data.state.index],
            });
          }
        },
      }}
    >
      <Tabs.Screen
        name="dashboard-tab"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Icon size="lg" name="home" color={color as RawColor} />
          ),
          tabBarLabel: "Dashboard",
          headerShown: true,
          headerRight: () => <HideAmountButton />,
          headerRightContainerStyle: {
            paddingRight: 16,
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "RobotoSerifSemibold",
            fontSize: 22,
            fontWeight: 500,
          },
        }}
      />
      <Tabs.Screen
        name="journey-tab"
        options={{
          title: "Journey Screen",
          tabBarIcon: ({ color }) => (
            <Icon size="lg" name="journey" color={color as RawColor} />
          ),
          tabBarLabel: "Journey",
        }}
      />
      <Tabs.Screen
        name="(investments-tab)"
        options={{
          title: "Investments",
          tabBarIcon: ({ color }) => (
            <Icon size="lg" name="investments" color={color as RawColor} />
          ),
          tabBarLabel: "Investment",
          headerShown: true,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "RobotoSerifSemibold",
            fontSize: 22,
            fontWeight: 500,
          },
        }}
      />
      <Tabs.Screen
        name="profile-tab"
        options={{
          title: "Profile Screen",
          tabBarIcon: ({ color }) => (
            <Icon size="lg" name="profile-tab" color={color as RawColor} />
          ),
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
