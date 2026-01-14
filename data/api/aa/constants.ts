// export const BASE_URL = 'https://qwarkuat.camsfinserv.com';

import { Platform } from "react-native";
import { DEV_AA_API_BASE_URL, DEV_AA_API_WEB_BASE_URL } from "settings";

const getBaseURL = (): string => {
  const BASE_URL = Platform.OS !== "web" ? DEV_AA_API_BASE_URL : DEV_AA_API_WEB_BASE_URL;
  if (BASE_URL) {
    return BASE_URL;
  } else {
    throw new Error("DEV_AA_API_BASE_URL not found in settings");
  }
};

export const BASE_URL = getBaseURL();
