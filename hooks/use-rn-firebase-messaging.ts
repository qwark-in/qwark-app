import { useAuthStore } from "data/stores/auth-store";
import { useGlobalStore } from "data/stores/global-store";
import { useUserStore } from "data/stores/user-store";
import { getApp } from "@react-native-firebase/app"; // Firebase App
import {
  getMessaging,
  registerDeviceForRemoteMessages,
  getToken,
  onMessage,
  setBackgroundMessageHandler,
} from "@react-native-firebase/messaging"; // Notifications support
import { useEffect } from "react";

export const useRNFirebaseMessaging = () => {
  const token = useAuthStore((store) => store.authData?.token);
  const isOnboardingCompleted = useGlobalStore(
    (store) => store.isOnboardingCompleted
  );
  const setUser = useUserStore((store) => store.setState);
  useEffect(() => {
    async function setupFCM() {
      try {
        const app = getApp(); // Get default Firebase app
        const messaging = getMessaging(app);

        const unsubscribe = onMessage(messaging, async (remoteMessage) => {
          console.log(
            "FCM Message (foreground): ",
            JSON.stringify(remoteMessage)
          );
        });

        await registerDeviceForRemoteMessages(messaging);

        const fcmToken = await getToken(messaging);
        console.log("FCM Token:", fcmToken);

        return unsubscribe;
      } catch (err) {
        console.error("FCM setup error:", err);
      }
    }

    if (token && !isOnboardingCompleted) {
      setupFCM();
      setBackgroundMessageHandler(
        getMessaging(getApp()),
        async (remoteMessage) => {
          console.log("FCM Message (background): ", remoteMessage);
        }
      );
    }
  }, [token]);
};
