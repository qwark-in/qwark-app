import React, { useEffect } from "react";
import { View, XStack } from "tamagui";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useWindowDimensions } from "react-native";
import { IconButton } from "ui/controls/buttons";
import { TitleText } from "ui/display/typography";
import { Success } from "ui/assets/icons/fixed-color";
import { DiscoveryAccountsInfo } from "data/api/aa/types";

type AuthoriseBanksSliderHeaderProps = {
  currentIndex: number;
  accountsToLink: {
    fip_id: string;
    fip_name: string;
    accounts: DiscoveryAccountsInfo[];
    isAuthorised: boolean;
  }[];
  scrollToPrevious: () => void;
  scrollToNext: () => void;
};

export const AuthoriseBanksSliderHeader: React.FC<AuthoriseBanksSliderHeaderProps> = ({
  currentIndex,
  accountsToLink,
  scrollToPrevious,
  scrollToNext,
}) => {
  const { width } = useWindowDimensions();
  const progress = useSharedValue(0);
  const numberOfPages = accountsToLink.length;
  const authorisedCount = accountsToLink.filter((account) => account.isAuthorised).length;

  const value =
    (accountsToLink.filter((a) => a.isAuthorised).length / accountsToLink.length) * 100;

  useEffect(() => {
    progress.value = withTiming(value, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });

  return (
    <View>
      <XStack px="$5" jc="space-between" ai="center">
        <IconButton
          disabled={currentIndex === 0}
          name="chevron-left"
          onPress={scrollToPrevious}
        />

        <XStack gap="$2" ai="center">
          <XStack gap="$2" ai="center" pt="$1">
            <TitleText
              fow="$emphasized"
              color="$qwark/primary"
              fontVariant={["lining-nums"]}
            >
              {authorisedCount}/{numberOfPages}
            </TitleText>
            <TitleText>Verified</TitleText>
          </XStack>
          <Success />
        </XStack>

        <IconButton
          disabled={!(currentIndex < numberOfPages - 1 && numberOfPages)}
          name="chevron-right"
          onPress={scrollToNext}
        />
      </XStack>
      <View height={4} w={width} bg="#BAE6FF" mt="$4">
        <Animated.View
          style={[
            {
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
              height: 4,
              backgroundColor: "#001484",
            },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
};
