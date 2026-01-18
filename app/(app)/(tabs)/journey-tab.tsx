import { MiniChart } from "features/dashboard/components/MiniChart";
import { newJourneyList } from "features/journey/constants";
import { useRef, useState } from "react";
import { LayoutChangeEvent, Pressable, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ScrollView, Separator, TamaguiElement, View, XStack, YStack } from "tamagui";
import { Icon } from "ui/assets/icons/adaptive";
import { JourneyHouse } from "ui/assets/illustrations";
import { OutlineButton } from "ui/controls/buttons";
import { BodyText, HeadlineText, LabelText, TitleText } from "ui/display/typography";

const COLUMN_GAP = 16;
const PADDING_HORIZONTAL = 20;
const IMAGE_HEIGHT = 100;

const chartData: {
  value: number;
  date: string;
}[] = [
  { date: "2025-01-01", value: 120 },
  { date: "2025-01-02", value: 122 },
  { date: "2025-01-03", value: 121 },
  { date: "2025-01-04", value: 124 },
  { date: "2025-01-05", value: 126 },
  { date: "2025-01-06", value: 125 },
  { date: "2025-01-07", value: 128 },
  { date: "2025-01-08", value: 130 },
  { date: "2025-01-09", value: 129 },
  { date: "2025-01-10", value: 133 },
  { date: "2025-01-11", value: 135 },
  { date: "2025-01-12", value: 138 },
  { date: "2025-01-13", value: 140 },
  { date: "2025-01-14", value: 142 },
];

export default function JourneyTabScreen() {
  const { width } = useWindowDimensions();

  const cardWidth = (width - PADDING_HORIZONTAL * 2 - COLUMN_GAP) / 2;
  return (
    <View f={1}>
      <Separator bw={1} boc="$stroke/disabled" />
      <ScrollView
        f={1}
        bg="#FAFAFC"
        contentContainerStyle={{
          px: "$5",
          py: "$7",
        }}
        showsVerticalScrollIndicator={false}
      >
        <XStack jc="space-between">
          <TitleText size="$large" fow="$emphasized">
            Active Journeys
          </TitleText>
          <OutlineButton
            small
            iconAfter={<Icon name="refresh" size="md" color="$buttonIcon/secondary" />}
            scaleSpace={0.5}
          >
            Refresh
          </OutlineButton>
        </XStack>

        <JourneyCard />

        <TitleText mt="$8" size="$large" fow="$emphasized">
          Start a new Journey
        </TitleText>

        <XStack mt="$3" pt="$2" gap="$4" flexWrap="wrap" rowGap="$2">
          {newJourneyList.map((item) => {
            const Icon = item.illustration;

            return (
              <View
                key={item.id}
                bg="#FFF"
                mt="$2"
                bw={1}
                br="$3"
                boc="$stroke/disabled"
                w={cardWidth}
              >
                <View p="$5">
                  <Icon width={"100%"} height={IMAGE_HEIGHT} />
                </View>
                <YStack gap="$1" p="$3" btw={1} boc="$stroke/disabled">
                  <LabelText size="$large">{item.title}</LabelText>
                  <BodyText size="$xsmall" fs={1}>
                    {item.description}
                  </BodyText>
                </YStack>
              </View>
            );
          })}
        </XStack>
      </ScrollView>
    </View>
  );
}

const JourneyCard = () => {
  const open = useSharedValue(false);
  const height = useSharedValue(0);

  const toggleOpen = () => {
    open.value = !open.value;
  };

  const derivedRotate = useDerivedValue(() => withSpring(open.value ? "180deg" : "0deg"));

  const animatedRotateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: derivedRotate.value }],
    };
  });

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(open.value), {
      duration: 300,
    })
  );

  const animatedHeightStyle = useAnimatedStyle(() => {
    return {
      height: derivedHeight.value,
    };
  });

  const onLayout = (e: LayoutChangeEvent) => {
    height.value = e.nativeEvent.layout.height;
  };

  return (
    <View bg="#FFF" mt="$5" p="$4" br="$4" bw={1} boc="$stroke/disabled">
      <XStack gap="$3" ai="center">
        <JourneyHouse width={56} height={56} />
        <YStack>
          <TitleText>Purchasing a Home</TitleText>
          <BodyText size="$small">Last updated 2 days ago</BodyText>
        </YStack>
        <Pressable
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          onPress={toggleOpen}
        >
          <Animated.View style={animatedRotateStyle}>
            <Icon name="chevron-down" size="lg" color="$icon/secondary" />
          </Animated.View>
        </Pressable>
      </XStack>
      <XStack mt="$5" justifyContent="space-between" ai="flex-end">
        <YStack gap="$1">
          <BodyText color="$text/secondary">Goal Progress (40%)</BodyText>
          <XStack alignItems="flex-end">
            <HeadlineText fow="$emphasized" fontVariant={["lining-nums"]}>
              ₹12.6L
            </HeadlineText>
            <TitleText mb="$1" fontVariant={["lining-nums"]}>
              /30.5L
            </TitleText>
          </XStack>
        </YStack>
        <MiniChart chartData={chartData} chartHeight={50} />
      </XStack>

      <Animated.View style={[animatedHeightStyle, { overflow: "hidden" }]}>
        <View w="100%" py="$7" pos="absolute" gap="$5" onLayout={onLayout}>
          <BodyText fow="$emphasized">Portfolio Performance</BodyText>
          <XStack jc="space-between">
            <YStack fg={1}>
              <TitleText fontVariant={["lining-nums"]}>₹9.71L</TitleText>
              <BodyText size="$small" color="$text/secondary">
                Invested
              </BodyText>
            </YStack>
            <YStack fg={1}>
              <TitleText fontVariant={["lining-nums"]}>+34.5%</TitleText>
              <BodyText size="$small" color="$text/secondary">
                Returns
              </BodyText>
            </YStack>
            <YStack fg={1}>
              <TitleText fontVariant={["lining-nums"]}>14.22%</TitleText>
              <BodyText size="$small" color="$text/secondary">
                XIRR
              </BodyText>
            </YStack>
          </XStack>
        </View>
      </Animated.View>
    </View>
  );
};
