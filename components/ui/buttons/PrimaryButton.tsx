/**
 * @name PrimaryButton
 *
 * @description
 * Primary button from Qwark Design system
 */

/**
 * Imports
 */
// React and RN

// Libraries providing UI-related utils (e.g. tamagui, form etc.)
import { Button, styled } from 'tamagui';

// Local (e.g. this and other workspaces)

/**
 * Types and interfaces
 */

/**
 * Helpers
 */

/**
 * Primary button (styled Tamagui Button)
 */
export const PrimaryButton = styled(Button, {
  unstyled: true,
  color: '$qwark/white',
  backgroundColor: '$qwark/primary',
  fontSize: '$medium',
  letterSpacing: '$medium',
  fontFamily: '$body',
  paddingHorizontal: '$6',
  paddingVertical: '$3',
  scaleSpace: 0.5,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '500',
  borderRadius: 9999,
  variants: {
    disabled: {
      true: {
        color: '#CAC5C4',
        backgroundColor: '#E7E7E7',
      },
    },
  },
});
