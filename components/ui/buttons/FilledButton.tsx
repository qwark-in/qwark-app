/**
 * @name FilledButton
 *
 * @description
 * Filled button from Qwark Design system
 */

import { Button, styled } from 'tamagui';

/**
 * Filled button (styled Tamagui Button)
 */
export const FilledButton = styled(Button, {
  unstyled: true,
  fontSize: '$medium',
  fontWeight: '$emphasized',
  fontFamily: '$body',
  color: '$qwark/white',
  bg: '$qwark/primary',
  px: '$6',
  py: '$4',
  scaleSpace: 0.5,
  fd: 'row',
  ai: 'center',
  jc: 'center',
  br: 9999,
  variants: {
    disabled: {
      true: {
        color: '#CAC5C4',
        bg: '#E7E7E7',
      },
    },
  },
});
