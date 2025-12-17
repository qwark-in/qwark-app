import { useState } from "react";
import { useRouter } from "expo-router";
import { useToastController } from "@tamagui/toast";

import { useAuthStore } from "data/stores/auth-store";
import { exchangeToken } from "data/api/auth/token";
import { registerDevice } from "data/api/auth/device";
import { getFcmToken } from "features/auth/helpers/getFcmToken";

export const useLogin = () => {
  const toast = useToastController();
  const router = useRouter();

  const codeVerifier = useAuthStore((s) => s.codeVerifier)!;
  const setToken = useAuthStore((s) => s.setToken);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const login = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      if (process.env.EXPO_PUBLIC_FEATURE_SSO_AUTH !== "true") {
        setToken({
          token: "mock-token-123456",
          uuid: "mock-uuid-654321",
          device: "device-hash-mock",
        });
        return;
      }

      const tokenData = await exchangeToken(codeVerifier);

      const fcmToken = await getFcmToken();

      const authData = await registerDevice({
        ...tokenData,
        device: fcmToken,
      });

      setToken(authData);
    } catch (err: any) {
      console.error("Login error:", err);

      setIsError(true);
      setErrorMessage(err.message ?? "Login failed");

      toast.show(err.message ?? "Login failed", { native: true });

      router.dismissTo("/auth");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    isError,
    errorMessage,
  };
};
