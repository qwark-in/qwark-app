import { useCallback } from "react";
import { View, XStack } from "tamagui";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { CustomDateBAMContent } from "./CustomDateBAMContent";
import { useCashflowScreenStore } from "../store/cashflow-screen-store";
import { useBottomSheetBackHandler } from "hooks/use-bottom-sheet-backhandler";
import { TitleText } from "ui/display/typography";
import { FilledButton, IconButton } from "ui/controls/buttons";

type CustomDateBAMProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
};

export const CustomDateBAM: React.FC<CustomDateBAMProps> = ({ bottomSheetModalRef }) => {
  const { handleSheetPositionChange } = useBottomSheetBackHandler(bottomSheetModalRef);
  const applyFilters = useCashflowScreenStore((store) => store.applyFilters);
  const dismissFilters = useCashflowScreenStore((store) => store.dismissFilters);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleApplyFilters = () => {
    applyFilters();
    handleCloseModalPress();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      enableContentPanningGesture={false}
      enableDynamicSizing={true}
      handleComponent={null}
      onChange={handleSheetPositionChange}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.5}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          onPress={() => {
            dismissFilters();
          }}
        />
      )}
    >
      <BottomSheetView>
        <XStack p="$4" jc="space-between" bbw={1} bbc="#DDE1E6">
          <TitleText fow="$emphasized">Custom Dates</TitleText>
          <IconButton
            name="close"
            onPress={() => {
              dismissFilters();
              handleCloseModalPress();
            }}
          />
        </XStack>

        {/**
         * ---------------------------------
         * Main content
         * ---------------------------------
         * */}
        <CustomDateBAMContent />
        {/**
         * ---------------------------------
         * CTA to apply the selected filters
         * ---------------------------------
         * */}

        <View p="$4">
          <FilledButton onPress={handleApplyFilters}>Apply</FilledButton>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
