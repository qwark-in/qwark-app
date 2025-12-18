import { Stack } from "expo-router";
import { screenOptions } from "navigation/screenOptions";
import { useCheckAuthSession } from "features/auth/hooks";

export default function AppLayout() {
  useCheckAuthSession();
  return (
    <Stack screenOptions={{ ...screenOptions, headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="investments" />
    </Stack>
  );
}
