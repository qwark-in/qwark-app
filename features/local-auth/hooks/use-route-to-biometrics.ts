import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";
import { useSettigsStore } from "data/stores/settings-store";

/**
 * Routes to biometric auth when app returns from background.
 * No-op on web.
 */

export const useRouteToBiometrics = () => {
  const lastBackgroundTime = useRef<number | null>(null);
  const isBiometricsEnabled = useSettigsStore((store) => store.isBiometricsEnabled);
  const router = useRouter();

  useEffect(() => {
    // Ignore completely on web
    if (Platform.OS === "web") {
      return;
    }
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "background") {
        lastBackgroundTime.current = Date.now(); // Save timestamp when app goes to background
      } else if (nextAppState === "active" && lastBackgroundTime.current) {
        const elapsedTime = (Date.now() - lastBackgroundTime.current) / 1000; // Convert to seconds
        lastBackgroundTime.current = null;

        const shouldRouteToAuth =
          elapsedTime > Number(process.env.EXPO_PUBLIC_BIOMETRIC_TIMEOUT || 60);

        if (isBiometricsEnabled && shouldRouteToAuth) {
          router.replace("/");
        }
      }
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [router, isBiometricsEnabled]);
};
