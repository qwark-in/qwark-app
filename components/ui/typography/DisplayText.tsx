import { styled } from 'tamagui';
import { BodyText } from './BodyText';

/**
 * @name DisplayText
 *
 * @description
 * A Display Text component that is extended from BodyText.
 * It just needs a different font-family value from the font config.
 */
export const DisplayText = styled(BodyText, {
  ff: '$display',
  size: '$small',
  fow: '$primary',
});
