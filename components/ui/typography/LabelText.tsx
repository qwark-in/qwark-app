import { styled } from 'tamagui';
import { BodyText } from './BodyText';

/**
 * @name LabelText
 *
 * @description
 * A Label Text component that is extended from BodyText.
 * It just needs a different font-family value from the font config.
 */

export const LabelText = styled(BodyText, {
  ff: '$label',
  size: '$small',
  fow: '$primary',
});
