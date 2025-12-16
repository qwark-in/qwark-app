import { Stack } from "expo-router";
import { screenOptions } from "navigation/screenOptions";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ ...screenOptions, headerShown: false }}>
      <Stack.Screen name="auth" />
      <Stack.Screen name="web-view" />
    </Stack>
  );
}
