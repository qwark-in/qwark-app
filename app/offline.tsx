import { View } from "tamagui";
import LottieView from "lottie-react-native";
import { useIsOnline } from "hooks/use-is-online";
import { FilledButton } from "ui/controls/buttons";
import { ActivityIndicator } from "react-native";
import { TitleText } from "ui/display/typography";

export default function OfflineScreen() {
  const { refresh, isLoading } = useIsOnline();

  return (
    <View f={1} jc="center" ai="center" px="$5">
      <View aspectRatio={1} height={200} mb="$12">
        <LottieView
          style={{ flex: 1 }}
          source={require("../assets/lottie/no-internet-lottie.json")}
          autoPlay
          loop
        />
      </View>
      <TitleText fow="$emphasized" ta="center">
        There seems to be an issue with your internet. Please check your internet
        connection.
      </TitleText>
      <FilledButton
        mt="$6"
        als="stretch"
        onPress={refresh}
        disabled={isLoading}
        iconAfter={isLoading ? <ActivityIndicator /> : null}
      >
        Try Again
      </FilledButton>
    </View>
  );
}
