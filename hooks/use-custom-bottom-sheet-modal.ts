import { useCallback, useEffect, useRef } from 'react';
import { useNavigation } from 'expo-router';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

/**
 * A custom hook for managing a BottomSheetModal using `@gorhom/bottom-sheet`
 * in an Expo Router context.
 *
 * This hook provides:
 * - A `ref` to the BottomSheetModal instance
 * - `present` and `dismiss` methods to control the sheet
 * - Automatic dismissal when the current screen loses focus
 *
 * @returns {Object} Object containing:
 *  - `bottomSheetModalRef` - a ref object to be attached to the BottomSheetModal
 *  - `presentBottomSheetModal` - function to present (open) the BottomSheetModal
 *  - `dismissBottomSheetModal` - function to dismiss (close) the BottomSheetModal
 *
 * @example
 * const {
 *   bottomSheetModalRef,
 *   presentBottomSheetModal,
 *   dismissBottomSheetModal
 * } = useCustomBottomSheetModal();
 *
 * return (
 *   <BottomSheetModal ref={bottomSheetModalRef}>
 *     ...
 *   </BottomSheetModal>
 * );
 */

const useCustomBottomSheetModal = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const navigation = useNavigation();

  const presentBottomSheetModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const dismissBottomSheetModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      dismissBottomSheetModal();
    });

    return unsubscribe;
  }, [navigation, dismissBottomSheetModal]);

  return { bottomSheetModalRef, presentBottomSheetModal, dismissBottomSheetModal };
};

export default useCustomBottomSheetModal;
