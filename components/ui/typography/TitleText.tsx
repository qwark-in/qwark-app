import { styled } from 'tamagui';
import { BodyText } from './BodyText';

/**
 * @name TitleText
 *
 * @description
 * A Title Text component that is extended from BodyText.
 * It just needs a different font-family value from the font config.
 */

export const TitleText = styled(BodyText, {
  ff: '$title',
  size: '$medium',
  fow: '$primary',
});
