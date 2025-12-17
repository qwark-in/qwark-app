import { Platform } from "react-native";
import { Route } from "expo-router";
import Constants from "expo-constants";

const scheme = Constants.expoConfig?.scheme ?? "exp+qwark";
const IOS_REDIRECT_URL = ""; // TODO
const WEB_REDIRECT_URL = ""; // TODO

export const getRedirectURL = (route: Route) => {
  switch (Platform.OS) {
    case "android":
      return `${scheme}:/${route}`;
    case "ios":
      return IOS_REDIRECT_URL;
    case "web":
      return WEB_REDIRECT_URL;
    default:
      console.error(
        "Qwark app getting installed on an unsupported platform, something is wrong."
      );
      throw new Error("Qwark: Unsupported platform");
  }
};
