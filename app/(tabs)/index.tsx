import { YStack } from "tamagui";

import {
  BodyText,
  DisplayText,
  HeadlineText,
  LabelText,
  TitleText,
} from "components/ui/typography";
import {
  FilledButton,
  OutlineButton,
  TextButton,
  TonalButton,
} from "components/ui/buttons";
import { BaseButton } from "components/ui/buttons/BaseButton";

export default function TabOneScreen() {
  return (
    <YStack flex={1} gap="$2" px="$5" pt="$5">
      <LabelText size="$large">This is Label Text.</LabelText>
      <BodyText size="$large">This is Body Text.</BodyText>
      <TitleText size="$large">This is Title Text.</TitleText>
      <HeadlineText size="$large">This is Headline Text.</HeadlineText>
      <FilledButton>Filled Button</FilledButton>
      <TonalButton>Tonal Button</TonalButton>
      <OutlineButton>Outline Button</OutlineButton>
      <TextButton>Text Button</TextButton>
    </YStack>
  );
}
