import { Stack } from "expo-router";
import { screenOptions } from "navigation/screenOptions";
import { QwarkLogo } from "ui/assets/logos";

export default function StackLayout() {
  return (
    <Stack screenOptions={{ ...screenOptions, headerRight: () => <QwarkLogo /> }}>
      <Stack.Screen name="select-banks" options={{ title: "Connect Accounts" }} />
    </Stack>
  );
}
