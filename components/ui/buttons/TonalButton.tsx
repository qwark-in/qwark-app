/**
 * @name TonalButton
 *
 * @description
 * Tonal button from Qwark Design system
 */

import { Button, styled } from 'tamagui';

/**
 * Tonal button (styled Tamagui Button)
 */
export const TonalButton = styled(Button, {
  unstyled: true,
  fontSize: '$medium',
  fontWeight: '$emphasized',
  fontFamily: '$title',
  color: '$gray/90',
  bg: '$cyan/20',
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
