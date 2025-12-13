import { styled } from 'tamagui';
import { BodyText } from './BodyText';

/**
 * @name HeadlineText
 *
 * @description
 * A Headline Text component that is extended from BodyText.
 * It just needs a different font-family value from the font config.
 */
export const HeadlineText = styled(BodyText, {
  ff: '$headline',
  size: '$medium',
  fow: '$primary',
});
