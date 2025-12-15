/**
 * @name useSafeAreaPadding
 *
 * @description
 * Hook to provide the device-dependent dimensions
 * of the area on the screen which is safe to render
 */

/**
 * Imports
 */
// React and RN

// Libraries providing UI-related utils (e.g. tamagui, form etc.)
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ViewProps } from 'tamagui';

// Local (e.g. this and other workspaces)

/**
 * Types and interfaces
 */
type PaddingPropsType = Pick<ViewProps, 'paddingTop' | 'paddingBottom' | 'paddingLeft' | 'paddingRight'>;

/**
 * Helpers
 */

/**
 * hook that gives an object containing padding to be applied in all directions
 * @returns Object having paddingTop, paddingBottom, paddingLeft, paddingRight properties
 */
export const useSafeAreaPadding = () => {
  const insets = useSafeAreaInsets();

  const safeAreaPadding: PaddingPropsType = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return { safeAreaPadding };
};
