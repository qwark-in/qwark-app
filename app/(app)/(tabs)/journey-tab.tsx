import { View } from "tamagui";
import { useSafeAreaPadding } from "hooks/use-safearea-padding";
import { TitleText } from "ui/display/typography";

export default function JourneyTabScreen() {
  const { safeAreaPadding } = useSafeAreaPadding();

  return (
    <View flex={1} jc="center" ai="center" {...safeAreaPadding}>
      <TitleText size="$large">Coming soon</TitleText>
    </View>
  );
}
