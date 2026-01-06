// export const BASE_URL = 'https://qwarkuat.camsfinserv.com';

import { Platform } from "react-native";

const getBaseURL = (): string => {
  const BASE_URL =
    Platform.OS !== "web"
      ? process.env.EXPO_PUBLIC_DEV_AA_API_BASE_URL
      : process.env.EXPO_PUBLIC_DEV_AA_API_WEB_BASE_URL;
  if (BASE_URL) {
    return BASE_URL;
  } else {
    throw new Error("EXPO_PUBLIC_DEV_AA_API_BASE_URL not set in environment");
  }
};

export const BASE_URL = getBaseURL();
