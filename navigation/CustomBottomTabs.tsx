import React, { useEffect } from "react";
import { Dimensions, Pressable } from "react-native";
import { View } from "tamagui";
import * as Haptics from "expo-haptics";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { BodyText } from "ui/display/typography";

/**
 * Map of bottom tab names from app\(app)\(tabs)\_layout.tsx to test ids
 */
const BottomTabsTestIdsMap = {
  dashboard: "__dashboard-bot-tab-button",
  "(investment-tabs)": "__investment-bot-tab-button",
  profile: "__profile-bot-tab-button",
};

interface CustomBottomTabsProps extends BottomTabBarProps {}

const width = Dimensions.get("window").width;

export const CustomBottomTabs: React.FC<CustomBottomTabsProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const TAB_WIDTH = width / state.routes.length;
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(state.index * TAB_WIDTH, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    });
  }, [state.index]);

  const tabIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View fd="row" bg="#FFF" elevationAndroid={20}>
      <View ai="center" pos="absolute" w={TAB_WIDTH} h={"100%"}>
        <Animated.View
          style={[
            {
              width: 50,
              height: 46,
              backgroundColor: "#001484",
              borderBottomLeftRadius: 9999,
              borderBottomRightRadius: 9999,
              top: 0,
              position: "absolute",
            },
            tabIndicatorStyle,
          ]}
        />
      </View>

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        return (
          <View key={route.key} f={1}>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                navigation.navigate(route.name);
              }}
              testID={BottomTabsTestIdsMap[route.name]}
            >
              <View ai="center" gap="$2" pt="$3" pb="$2">
                {options.tabBarIcon && (
                  <AnimatedIcon isFocused={isFocused} tabBarIcon={options.tabBarIcon} />
                )}
                <BodyText size="$small" fow="$emphasized">
                  {options.tabBarLabel}
                </BodyText>
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const AnimatedIcon = ({ isFocused, tabBarIcon }) => {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSequence(
      withTiming(isFocused ? 0.5 : 1, { duration: 100 }),
      withTiming(isFocused ? 1.1 : 1, {
        duration: 200,
        easing: Easing.out(Easing.cubic),
      })
    );
    translateY.value = withTiming(isFocused ? -4 : 0, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    });
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  const Icon = tabBarIcon;

  return (
    <Animated.View style={[animatedStyle]}>
      <Icon color={isFocused ? "#FFF" : "#6F6F6F"} />
    </Animated.View>
  );
};
