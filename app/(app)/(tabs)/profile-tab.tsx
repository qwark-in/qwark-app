import { View } from "tamagui";
import { useSafeAreaPadding } from "hooks/use-safearea-padding";
import { TitleText } from "ui/display/typography";

export default function ProfieTabScreen() {
  const { safeAreaPadding } = useSafeAreaPadding();

  return (
    <View flex={1} jc="center" ai="center" {...safeAreaPadding}>
      <TitleText size="$large">Profile Tab</TitleText>
    </View>
  );
}
