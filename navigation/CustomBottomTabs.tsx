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
  return (
    <View fd="row" bg="#FFF" bw={1} boc="#E7E7E7" jc="space-around">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const color = isFocused
          ? options.tabBarActiveTintColor
          : options.tabBarInactiveTintColor;

        return (
          <View key={route.key}>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                navigation.navigate(route.name);
              }}
              testID={BottomTabsTestIdsMap[route.name]}
            >
              <View ai="center" gap="$2" pt="$3" pb="$2">
                {options.tabBarIcon && (
                  <AnimatedIcon
                    isFocused={isFocused}
                    tabBarIcon={options.tabBarIcon}
                    color={color}
                  />
                )}
                <BodyText size="$xsmall" fow="$emphasized" color={color}>
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

const AnimatedIcon = ({ isFocused, tabBarIcon, color }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSequence(
      withTiming(isFocused ? 1.2 : 1, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const Icon = tabBarIcon;

  return <Animated.View style={[animatedStyle]}>{<Icon color={color} />}</Animated.View>;
};
