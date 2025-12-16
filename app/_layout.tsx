import "../tamagui-web.css";

import { useEffect } from "react";
import { Platform } from "react-native";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { Provider } from "Provider";
import { useQwarkFonts } from "hooks/use-qwark-fonts";
import { injectWebFonts } from "config/web-fonts";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { fontsLoaded, fontsError } = useQwarkFonts();

  useEffect(() => {
    if (Platform.OS === "web") {
      try {
        injectWebFonts();
      } catch (error) {
        console.warn("Failed to inject web fonts:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <Providers>
      <RootLayoutNav />
    </Providers>
  );
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};

function RootLayoutNav() {
  const BaseTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#FFF", // For setting default background color for all screens
    },
  };

  return (
    <ThemeProvider value={BaseTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
