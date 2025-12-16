import { WebView } from "react-native-webview";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "tamagui";
import { useToastController } from "@tamagui/toast";
import { useSafeAreaPadding } from "hooks/use-safearea-padding";
import { Platform } from "react-native";

export default function RNWebView() {
  const params = useLocalSearchParams<{ url: string }>();
  const router = useRouter();
  const toast = useToastController();
  const { safeAreaPadding } = useSafeAreaPadding();

  if (params.url === undefined) {
    toast.show("No URL provided for WebView", { native: true });
    router.back();
    return null;
  }

  console.log(params.url);

  if (Platform.OS === "web") {
    return (
      <iframe
        src={params.url}
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    );
  }

  return (
    <View f={1} {...safeAreaPadding}>
      <WebView style={{ flex: 1 }} source={{ uri: params.url }} incognito={true} />
    </View>
  );
}
