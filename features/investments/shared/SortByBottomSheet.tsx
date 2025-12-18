import React from "react";
import { useWindowDimensions } from "react-native";
import { Separator, View, XStack } from "tamagui";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useBottomSheetBackHandler } from "hooks/use-bottom-sheet-backhandler";
import { TitleText } from "ui/display/typography";
import { RadioSelectorList } from "ui/controls/selectors/radio-selector";

type SortByBottomSheetProps<T extends string> = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
  radioList: readonly { value: T }[];
  value: T;
  onValueChange: (value: T) => void;
};

export const SortByBottomSheet = <T extends string>({
  bottomSheetModalRef,
  radioList,
  value,
  onValueChange,
}: SortByBottomSheetProps<T>) => {
  const { handleSheetPositionChange } = useBottomSheetBackHandler(bottomSheetModalRef);
  const { height: deviceHeight } = useWindowDimensions();

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      enableContentPanningGesture={false}
      enableDynamicSizing={true}
      maxDynamicContentSize={deviceHeight * 0.4}
      onChange={handleSheetPositionChange}
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
        <View pb="$3">
          <XStack p="$4" jc="space-between">
            <TitleText size="$large">Sort By</TitleText>
          </XStack>
          <Separator boc="$coolgray/20" />
          <RadioSelectorList
            value={value}
            radioList={radioList}
            onValueChange={onValueChange}
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
