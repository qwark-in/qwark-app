import { useEffect } from "react";
import { useToastController } from "@tamagui/toast";
import { useAuthStore } from "data/stores/auth-store";
import { checkSession } from "data/api/auth";

export const useCheckAuthSession = () => {
  const authData = useAuthStore((store) => store.authData);
  const setToken = useAuthStore((store) => store.setToken);
  const toast = useToastController();

  useEffect(() => {
    if (!authData) return;
    if (process.env.EXPO_PUBLIC_FEATURE_SSO_AUTH === "false") {
      console.log("EXPO_PUBLIC_FEATURE_SSO_AUTH=false. Mocking check session...");
      return;
    }
    (async function () {
      try {
        const response = await checkSession(authData);
        if (response.status !== 200) {
          throw new Error(`Failed with response status ${response.status}`);
        }
        console.log("Check session -> Status:", response.status);
      } catch (err) {
        toast.show("Session expired. Login again");
        setToken(null);
      }
    })();
  }, [authData]);
};
