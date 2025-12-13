/**
 * @name OutlineButton
 *
 * @description
 * Outline button from Qwark Design system
 */

import { Button, styled } from 'tamagui';

/**
 * Outline button (styled Tamagui Button)
 */
export const OutlineButton = styled(Button, {
  unstyled: true,
  fontSize: '$small',
  fontWeight: '$emphasized',
  fontFamily: '$body',
  color: '$buttonText/secondary',
  bg: '$qwark/white',
  px: '$6',
  py: '$4',
  scaleSpace: 0.5,
  fd: 'row',
  ai: 'center',
  jc: 'center',
  br: 9999,
  bw: 1,
  boc: '#E7E7E7',
  pressStyle: {
    bg: '#0000001F',
  },
  variants: {
    disabled: {
      true: {
        color: '#CAC5C4',
        bg: '#E7E7E7',
      },
    },
    size: {
      $xsmall: {
        px: '$3',
        py: '$1_5',
      },
    },
  },
});
