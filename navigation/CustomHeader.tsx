import React from "react";
import { FontSizeTokens, FontWeightTokens, View, XStack } from "tamagui";
import { getHeaderTitle } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { ArrowLeft, ChevronLeft } from "assets";
import { useSafeAreaPadding } from "ui/hooks/use-safearea-padding";
import { ShadowWrapper } from "components/ui/misc";
import { IconButton } from "components/ui/buttons";
import { TitleText } from "components/ui/typography";

type CustomHeaderProps = NativeStackHeaderProps & {
  size?: FontSizeTokens;
  weight?: FontWeightTokens;
};

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  navigation,
  options,
  route,
  back,
  size = "$large",
  weight = "$emphasized",
}) => {
  const title = getHeaderTitle(options, route.name);
  const { safeAreaPadding } = useSafeAreaPadding();

  // Get the header tintColor from options (you can provide a default color if needed)
  const tintColor = options.headerTintColor || undefined;
  const canGoBack = !!back;

  return (
    <View {...safeAreaPadding}>
      <ShadowWrapper size="sm" disabled={!options.headerShadowVisible}>
        <View bg="$background/primary" py="$4" pr="$2" pl="$5">
          <XStack
            jc={options.headerBackVisible ? "center" : "space-between"}
            ai="center"
          >
            <View pos="absolute" left={0}>
              {canGoBack && options.headerBackVisible ? (
                <IconButton
                  icon={ArrowLeft}
                  size={24}
                  onPress={() => navigation.goBack()}
                />
              ) : (
                <View></View>
              )}
            </View>
            <TitleText size={size} fow={weight}>
              {title}
            </TitleText>
            <View pos="absolute" right={0}>
              {options.headerRight &&
                options.headerRight({ tintColor, canGoBack })}
            </View>
          </XStack>
        </View>
      </ShadowWrapper>
    </View>
  );
};
