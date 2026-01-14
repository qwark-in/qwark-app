import { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import { useToastController } from "@tamagui/toast";

import { useAuthStore } from "data/stores/auth-store";
import { exchangeToken } from "data/api/auth/token";
import { registerDevice } from "data/api/auth/device";
import { getFcmToken } from "features/auth/helpers/getFcmToken";
import { Platform } from "react-native";
import { FEATURE_SSO_AUTH } from "settings";

const getErrorMessage = (err: unknown) => {
  if (err instanceof Error) return err.message;
  return "Login failed. Please try again.";
};

export const useLogin = () => {
  const toast = useToastController();
  const router = useRouter();

  const codeVerifier = useAuthStore((s) => s.codeVerifier);
  const setCodeVerifier = useAuthStore((s) => s.setCodeVerifier);
  const setToken = useAuthStore((s) => s.setToken);

  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async () => {
    if (isLoading) return;
    if (!codeVerifier && FEATURE_SSO_AUTH) {
      console.warn("Missing codeVerifier during login");
      return;
    }

    setIsLoading(true);

    try {
      if (!FEATURE_SSO_AUTH) {
        // Mock login (dev / preview)
        setToken({
          token: "mock-token-123456",
          uuid: "mock-uuid-654321",
          device: "device-hash-mock",
        });
        return;
      }
      // console.log("Exchanging token with codeVerifier:", codeVerifier);

      const tokenData = await exchangeToken(codeVerifier!);

      if (Platform.OS === "web") {
        // On web, we skip device registration for now
        setToken(tokenData);
        setCodeVerifier(null);

        return;
      }

      const fcmToken = await getFcmToken();

      const authData = await registerDevice({
        ...tokenData,
        device: fcmToken,
      });

      setToken(authData);
      setCodeVerifier(null);
    } catch (err) {
      console.error("Login error:", err);

      const message = getErrorMessage(err);

      toast.show(message);
      router.dismissTo("/auth");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, codeVerifier, setToken, toast, router]);

  return {
    login,
    isLoading,
  };
};
