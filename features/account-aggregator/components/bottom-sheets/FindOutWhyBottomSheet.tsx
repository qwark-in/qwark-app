import React from "react";
import { View, YStack } from "tamagui";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { findOutWhyData } from "../../constants";
import { BodyText, TitleText } from "ui/display/typography";
import { FilledButton } from "ui/controls/buttons";
import { useBottomSheetBackHandler } from "hooks/use-bottom-sheet-backhandler";

export const FindOutWhyBottomSheet = React.forwardRef<BottomSheetModal>(
  (props, ref: any) => {
    const { handleSheetPositionChange } = useBottomSheetBackHandler(ref);
    return (
      <BottomSheetModal
        ref={ref}
        onChange={handleSheetPositionChange}
        enableDynamicSizing={true}
        enableContentPanningGesture={false}
        handleIndicatorStyle={{ backgroundColor: "#C6C6C6" }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.5}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <BottomSheetView>
          <View paddingHorizontal={20} paddingVertical={24}>
            <YStack gap="$6">
              <YStack gap="$2">
                <TitleText size="$large" fow="$emphasized">
                  Couldnt find your account?
                </TitleText>
                <BodyText color="$text/secondary">
                  Unable to locate your account using RBI's Account Aggregator Ecosystem,
                  see possible reasons.
                </BodyText>
              </YStack>

              {findOutWhyData.map(({ title, subtitle }, i) => (
                <YStack gap="$1" key={i}>
                  <TitleText>{title}</TitleText>
                  <BodyText color="#6F6F6F">{subtitle}</BodyText>
                </YStack>
              ))}
            </YStack>

            <FilledButton
              mt="$5"
              onPress={() => {
                ref.current?.close();
              }}
            >
              Got it!
            </FilledButton>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);
