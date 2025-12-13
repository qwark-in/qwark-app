/**
 * @name SecondaryButton
 *
 * @description
 * Secondary button from Qwark Design system
 */

/**
 * Imports
 */
// React and RN

// Libraries providing UI-related utils (e.g. tamagui, form etc.)
import { Button, styled } from 'tamagui';

// Local (e.g. this and other workspaces)

/**
 * Types
 */

/**
 * Helpers
 */

/**
 * Secondary button (styled Tamagui Button)
 */
export const SecondaryButton = styled(Button, {
  unstyled: true,
  color: '$buttonText/secondary',
  backgroundColor: '$qwark/white',
  fontSize: '$medium',
  letterSpacing: '$medium',
  fontFamily: '$title',
  paddingHorizontal: '$6',
  paddingVertical: '$3',
  scaleSpace: 0.5,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '500',
  borderWidth: 1,
  borderColor: '$qwark/primary',
  borderRadius: 9999,
  variants: {
    disabled: {
      true: {
        color: '$buttonText/disabled',
        borderColor: '$buttonBackground/disabled',
      },
    },
  },
  pressStyle: {
    backgroundColor: '$qwark/white',
  },
});
