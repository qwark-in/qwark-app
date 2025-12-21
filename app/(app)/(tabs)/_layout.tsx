import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getAnalytics } from "@react-native-firebase/analytics";
import { CustomBottomTabs } from "navigation/CustomBottomTabs";
import { HideAmountButton } from "features/dashboard/components/HideAmountButton";

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
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
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
            <MaterialCommunityIcons
              name="star-shooting-outline"
              size={24}
              color={color}
            />
          ),
          tabBarLabel: "Journey",
        }}
      />
      <Tabs.Screen
        name="(investments-tab)"
        options={{
          title: "Investments",
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="stats-chart" color={color} />
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
            <FontAwesome size={24} name="user-circle-o" color={color} />
          ),
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
