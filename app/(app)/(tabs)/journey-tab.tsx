import { ScrollView, Separator, View } from "tamagui";
import { useSafeAreaPadding } from "hooks/use-safearea-padding";
import { TitleText } from "ui/display/typography";

export default function JourneyTabScreen() {
  const { safeAreaPadding } = useSafeAreaPadding();

  return (
    <View f={1}>
      <Separator bw={1} boc="$stroke/disabled" />
      <ScrollView
        f={1}
        bg="#FAFAFC"
        contentContainerStyle={{
          px: "$5",
          pt: "$7",
          pb: "$5",
        }}
        showsVerticalScrollIndicator={false}
      ></ScrollView>
    </View>
  );
}
