/**
 * @name TertiaryButton
 *
 * @description
 * Tertiary button from Qwark Design system
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
 * Tertiary button (Styled Tamagui Button)
 */
export const TertiaryButton = styled(Button, {
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
  borderColor: '$gray/20',
  borderRadius: 9999,
  variants: {
    disabled: {
      true: {
        color: '$warmgray/30',
      },
    },
  },
  pressStyle: {
    backgroundColor: '$qwark/white',
  },
});
