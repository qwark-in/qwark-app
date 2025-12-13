/**
 * Imports
 */
// React and RN
import { ReactNode } from 'react';

// Libraries providing UI-related utils (e.g. tamagui, form etc.)
import { AnimatePresence, View } from 'tamagui';

// Local (e.g. this and other workspaces)
import { CheckSmall } from '@/assets';

/**
 * Types and interfaces
 */
interface CheckBoxProps {
  /**
   * Default state of the checkbox
   */
  checked: boolean;
  /**
   * (Optional) Component border to be shown
   * @default [false]
   */
  borderHidden?: boolean;
}

/**
 * @name Checkbox
 *
 * @description
 * Basic checkbox component using Qwark colors
 */

/**
 * @name Checkbox
 *
 * @description Basic checkbox component using Qwark colors
 */
export const Checkbox: React.FC<CheckBoxProps> = ({ checked, borderHidden = false }) => {
  return (
    <View
      w="$5"
      h="$5"
      br="$_5"
      bw="$_5"
      boc={borderHidden ? '$colorTransparent' : '$qwark/primary'}
      jc="center"
      ai="center"
      bg={checked ? '$qwark/primary' : '$colorTransparent'}
      pointerEvents="none"
      animation="presence"
      animateOnly={['backgroundColor']}
    >
      <AnimatePresence>
        {checked && (
          <View
            key="check-icon"
            animation="presence"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
            animateOnly={['opacity', 'scale']}
          >
            <CheckSmall width={borderHidden ? 20 : 24} height={borderHidden ? 20 : 24} />
          </View>
        )}
      </AnimatePresence>
    </View>
  );
};
