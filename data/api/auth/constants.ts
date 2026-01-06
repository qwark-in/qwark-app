import { Platform } from "react-native";

const getBaseURL = (): string => {
  const BASE_URL =
    Platform.OS !== "web"
      ? process.env.EXPO_PUBLIC_DEV_API_BASE_URL
      : process.env.EXPO_PUBLIC_DEV_API_WEB_BASE_URL;
  if (BASE_URL) {
    return BASE_URL;
  } else {
    throw new Error("EXPO_PUBLIC_DEV_API_BASE_URL not set in environment");
  }
};

export const API_BASE_URL = getBaseURL();
