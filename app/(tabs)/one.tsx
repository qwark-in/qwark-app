import { XStack, YStack } from "tamagui";
import { FdEmpty, MutualFundsEmpty, StockEmpty } from "ui/assets/illustrations";
import { QwarkLogo, QwarkLogoWithText } from "ui/assets/logos";
import { IconButton } from "ui/controls/buttons";

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
