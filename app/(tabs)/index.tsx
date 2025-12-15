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
import {
  CamsfinservLogo,
  CamsfinservLogoLg,
  QwarkLogo,
  QwarkLogoWithText,
} from "components/ui/logos/glyphs";
import {
  FdEmpty,
  MutualFundsEmpty,
  StockEmpty,
} from "components/ui/illustrations/glyphs";

export default function TabOneScreen() {
  return (
    <YStack flex={1} gap="$2" px="$5" pt="$5">
      <XStack gap="$5">
        <IconButton name="arrow-left" color="red" />
        <IconButton name="bell" />
        <IconButton name="calendar" />
        <IconButton name="calendar" />
      </XStack>
      <FdEmpty />
      <MutualFundsEmpty />
      <StockEmpty />
      <QwarkLogo />
      <QwarkLogoWithText />
    </YStack>
  );
}
