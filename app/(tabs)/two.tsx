import { TitleText } from "components/ui/typography";
import { View } from "tamagui";

export default function TabTwoScreen() {
  return (
    <View flex={1} ai="center" jc="center">
      <TitleText size="$large" col="$blue/60">
        Tab Two
      </TitleText>
    </View>
  );
}
