import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useBottomSheetBackHandler } from "hooks/use-bottom-sheet-backhandler";
import { View } from "tamagui";
import { BodyText, TitleText } from "ui/display/typography";

export const KYCBottomSheet = ({ bottomSheetModalRef }) => {
  const { handleSheetPositionChange } = useBottomSheetBackHandler(bottomSheetModalRef);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      enableContentPanningGesture={false}
      enableDynamicSizing={true}
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
        <View p="$5" ai="center">
          <TitleText size="$large" ta="center" color="$text/error">
            KYC Not Verified!
          </TitleText>
          <BodyText ta="center" mt="$2">
            We are currently supporting only KYC verified users.
          </BodyText>

          <BodyText size="$xsmall" mt="$10" color="$text/accent" fow="$emphasized">
            Check whether you entered your details correctly
          </BodyText>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
