import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, PropsWithChildren } from 'react';

type BottomSheetWrapperProps = PropsWithChildren & {
  onBackdropPress?: () => void;
};

export const BottomSheetWrapper = forwardRef<BottomSheetModal, BottomSheetWrapperProps>(
  ({ children, onBackdropPress }, ref) => {
    return (
      <BottomSheetModal
        ref={ref}
        enableContentPanningGesture={false}
        enableDynamicSizing={true}
        handleComponent={null}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.5}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            onPress={onBackdropPress}
          />
        )}
      >
        <BottomSheetView>{children}</BottomSheetView>
      </BottomSheetModal>
    );
  }
);
