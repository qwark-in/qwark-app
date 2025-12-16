import { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import { getApp } from "@react-native-firebase/app";
import { getMessaging, getToken } from "@react-native-firebase/messaging";
import { useToastController } from "@tamagui/toast";
import { useAuthStore } from "data/stores/auth-store";
import { AuthDataType } from "data/models/auth";
import { API_BASE_URL } from "data/api/auth/constants";

export const useLogin = () => {
  const toast = useToastController();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const codeVerifier = useAuthStore((store) => store.codeVerifier)!;
  const setToken = useAuthStore((store) => store.setToken);

  const login = async () => {
    setIsLoading(true);
    setIsError(false);
    if (process.env.EXPO_PUBLIC_FEATURE_SSO_AUTH === "true") {
      try {
        const tokenParams = new URLSearchParams({
          code_verifier: codeVerifier,
        });

        console.log("Calling token api with: ", codeVerifier);

        const tokenURL = new URL(`${API_BASE_URL}/token?${tokenParams}`);

        const { data: tokenData } = await axios.post<AuthDataType>(tokenURL.href);

        if (!tokenData.token) {
          console.warn("No token in response");
        }

        const deviceURL = new URL(`${API_BASE_URL}/device`);

        const app = getApp(); // Get default Firebase app
        const messaging = getMessaging(app);

        const fcmToken = await getToken(messaging);

        console.log("FCM Token:", fcmToken);

        const { data: authData } = await axios.post<AuthDataType>(deviceURL.href, {
          ...tokenData,
          device: fcmToken,
        });
        setToken(authData);
      } catch (error) {
        setIsError(true);
        setErrorMessage(error.message || "An unknown error occurred during sign-in.");

        toast.show(
          `Login error: ${error.message}` || "An unknown error occurred during sign-in.",
          {
            native: true,
          }
        );
        router.dismissTo("/auth");
      } finally {
        setIsLoading(false);
      }
    } else {
      setToken({
        device: "device-hash-mock",
        token: "mock-token-123456",
        uuid: "mock-uuid-654321",
      });
      setIsLoading(false);
    }
  };

  return { login, isLoading, isError, errorMessage };
};
