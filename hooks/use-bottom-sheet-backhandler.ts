import { useCallback, useRef } from 'react';
import { NativeEventSubscription, BackHandler } from 'react-native';
import { BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';

type BackHandlerMode = 'dismiss' | 'goBack';

type UseBottomSheetBackHandlerOptions = {
  mode?: BackHandlerMode;
};

/**
 * Hook that dismisses the bottom sheet OR goes back a screen on the hardware back press
 * when the bottom sheet is visible.
 *
 * @param bottomSheetRef ref to the bottom sheet which is going to be closed/dismissed
 * @param options optional config to override default behavior
 */
export const useBottomSheetBackHandler = (
  bottomSheetRef: React.RefObject<BottomSheetModal | null>,
  options: UseBottomSheetBackHandlerOptions = {}
) => {
  const { mode = 'dismiss' } = options;
  const router = useRouter();
  const backHandlerSubscriptionRef = useRef<NativeEventSubscription | null>(null);

  const handleSheetPositionChange = useCallback<NonNullable<BottomSheetModalProps['onChange']>>(
    (index) => {
      const isBottomSheetVisible = index >= 0;

      if (isBottomSheetVisible && !backHandlerSubscriptionRef.current) {
        backHandlerSubscriptionRef.current = BackHandler.addEventListener(
          'hardwareBackPress',
          () => {
            if (mode === 'dismiss') {
              bottomSheetRef.current?.dismiss();
            } else if (mode === 'goBack') {
              router.back();
            }
            return true;
          }
        );
      } else if (!isBottomSheetVisible) {
        backHandlerSubscriptionRef.current?.remove();
        backHandlerSubscriptionRef.current = null;
      }
    },
    [bottomSheetRef, mode, router]
  );

  return { handleSheetPositionChange };
};
