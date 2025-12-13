/**
 * @name TextButton
 *
 * @description
 * Text button from Qwark Design system
 */

import { Button, styled } from 'tamagui';

/**
 * Text button (styled Tamagui Button)
 */
export const TextButton = styled(Button, {
  unstyled: true,
  fontSize: '$medium',
  fontWeight: '$emphasized',
  fontFamily: '$title',
  color: '$buttonText/secondary',
  bg: '$qwark/white',
  px: '$6',
  py: '$4',
  scaleSpace: 0.5,
  fd: 'row',
  ai: 'center',
  jc: 'center',
  br: 9999,
  pressStyle: {
    bg: '#4589FF1F',
  },
  variants: {
    disabled: {
      true: {
        color: '#CAC5C4',
        bg: '#E7E7E7',
      },
    },
  },
});
