import { getApp } from "@react-native-firebase/app";
import { getMessaging, getToken } from "@react-native-firebase/messaging";

export const getFcmToken = async (): Promise<string> => {
  const app = getApp();
  const messaging = getMessaging(app);

  const token = await getToken(messaging);

  if (!token) {
    throw new Error("Unable to fetch FCM token");
  }

  return token;
};
