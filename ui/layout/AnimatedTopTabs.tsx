import { useWindowDimensions } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { getTokens, View } from "tamagui";
import { Pressable } from "react-native-gesture-handler";
import { TitleText } from "../display/typography";

export type AnimatedTabType<T> = {
  id: string;
  title: T;
  fbAnalyticsId?: string;
};

type TopTabsProps<T> = {
  tabs: AnimatedTabType<T>[];
  activeTabIndex: number;
  onTabSelect: (index: number) => void;
};

const MARGIN_HORIZONTAL = 24;

export const AnimatedTopTabs = <T,>({
  tabs,
  activeTabIndex,
  onTabSelect,
}: TopTabsProps<T>) => {
  const { width: WINDOW_WIDTH } = useWindowDimensions();
  const { color, size, space } = getTokens();
  const animatedViewWidth = (WINDOW_WIDTH - MARGIN_HORIZONTAL * 2) / tabs.length;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(activeTabIndex * animatedViewWidth, {
          duration: 250,
        }),
      },
    ],
  }));

  return (
    <View px="$5" pb="$4" bg="#FFF">
      <View fd="row" bg="$buttonBackground/disabled" br={9999} pos="relative">
        <Animated.View
          style={[
            {
              position: "absolute",
              backgroundColor: color["buttonBackground/secondary"].val,
              height: size["$9"].val,
              margin: space["$1"].val,
              borderRadius: 9999,
              width: animatedViewWidth,
            },
            animatedStyle,
          ]}
        />

        {tabs.map((tab, i) => {
          return (
            <Pressable
              key={tab.id}
              onPress={() => onTabSelect(i)}
              style={{
                flex: 1,
                flexGrow: 1,
                alignItems: "center",
                paddingVertical: space["$3"].val,
              }}
            >
              <TitleText size="$small">{tab.title}</TitleText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
