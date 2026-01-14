import { Platform } from "react-native";
import {
  DEV_API_FIN_PROFILE_BASE_URL,
  DEV_API_PROFILE_BASE_URL,
  DEV_API_WEB_FIN_PROFILE_BASE_URL,
  DEV_API_WEB_PROFILE_BASE_URL,
} from "settings";

const getBaseURL = (): string => {
  const BASE_URL =
    Platform.OS !== "web" ? DEV_API_PROFILE_BASE_URL : DEV_API_WEB_PROFILE_BASE_URL;
  if (BASE_URL) {
    return BASE_URL;
  } else {
    throw new Error("DEV_API_PROFILE_BASE_URL not found in settings");
  }
};

const getBaseFinProfileURL = (): string => {
  const BASE_URL =
    Platform.OS !== "web"
      ? DEV_API_FIN_PROFILE_BASE_URL
      : DEV_API_WEB_FIN_PROFILE_BASE_URL;
  if (BASE_URL) {
    return BASE_URL;
  } else {
    throw new Error("DEV_API_FIN_PROFILE_BASE_URL not found in settings");
  }
};

export const BASE_URL = getBaseURL();
export const FIN_PROFILE_BASE_URL = getBaseFinProfileURL();
