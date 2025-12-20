import { Stack } from "expo-router";
import { screenOptions } from "navigation/screenOptions";
import { QwarkLogo } from "ui/assets/logos";

export default function StackLayout() {
  return (
    <Stack screenOptions={{ ...screenOptions, headerRight: () => <QwarkLogo /> }}>
      <Stack.Screen name="select-banks" options={{ title: "Connect Accounts" }} />
      <Stack.Screen
        name="coming-soon"
        options={{ title: "Connect Accounts", animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name="create-session"
        options={{ title: "Link Accounts", headerShown: false }}
      />
      <Stack.Screen name="account-discovery" options={{ title: "Connect Accounts" }} />
      <Stack.Screen name="success" options={{ title: "Success", headerShown: false }} />
    </Stack>
  );
}
