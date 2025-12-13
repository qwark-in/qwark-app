import { ExternalLink } from "@tamagui/lucide-icons";
import { Anchor, H2, Paragraph, XStack, YStack } from "tamagui";
import { ToastControl } from "components/CurrentToast";
import {
  BodyText,
  DisplayText,
  HeadlineText,
  LabelText,
  TitleText,
} from "components/ui/typography";

export default function TabOneScreen() {
  return (
    <YStack flex={1} ai="center" jc="center" gap="$2" px="$10" pt="$5">
      <LabelText size="$large">This is Label Text.</LabelText>
      <BodyText size="$large">This is Body Text.</BodyText>
      <TitleText size="$large">This is Title Text.</TitleText>
      <HeadlineText size="$large">This is Headline Text.</HeadlineText>
      <DisplayText size="$large">This is Display Text.</DisplayText>
      <LabelText size="$large" fow="$emphasized">
        This is Label Text.
      </LabelText>
      <BodyText size="$large" fow="$emphasized">
        This is Body Text.
      </BodyText>
      <TitleText size="$large" fow="$emphasized">
        This is Title Text.
      </TitleText>
      <HeadlineText size="$large" fow="$emphasized">
        This is Headline Text.
      </HeadlineText>
      <DisplayText size="$large" fow="$emphasized">
        This is Display Text.
      </DisplayText>
    </YStack>
  );
}
