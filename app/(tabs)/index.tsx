import { XStack, YStack } from "tamagui";
import { BodyText, HeadlineText, LabelText, TitleText } from "components/ui/typography";
import {
  FilledButton,
  IconButton,
  OutlineButton,
  TextButton,
  TonalButton,
} from "components/ui/buttons";
import { Icon } from "components/ui/icons";

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

      <XStack>
        <Icon name="arrow-left" color="#34d1ba" size="lg" />
        <Icon name="bell" color="#d13434" size="lg" />
        <Icon name="calendar" color="#8ab762" size="lg" />
        <Icon name="calendar" color="$cyan/50" size="lg" />
      </XStack>
      <XStack gap="$5">
        <IconButton name="arrow-left" color="red" />
        <IconButton name="bell" />
        <IconButton name="calendar" />
        <IconButton name="calendar" />
      </XStack>
    </YStack>
  );
}
