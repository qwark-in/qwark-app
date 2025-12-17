import React, { useEffect } from "react";
import { Pressable } from "react-native";
import { useWindowDimensions, View } from "tamagui";
import * as Haptics from "expo-haptics";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
  useDerivedValue,
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

export const CustomBottomTabs: React.FC<CustomBottomTabsProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const containerWidth = useSharedValue(0);

  const TAB_WIDTH = width / state.routes.length;

  useEffect(() => {
    translateX.value = withTiming(state.index * TAB_WIDTH, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    });
  }, [state.index]);

  const tabIndicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  return (
    <View
      fd="row"
      bg="#FFF"
      bw={1}
      boc="#E7E7E7"
      onLayout={(e) => {
        containerWidth.value = e.nativeEvent.layout.width;
      }}
    >
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
          <View key={route.key} w={TAB_WIDTH}>
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
