import { useEffect } from "react";
import { useToastController } from "@tamagui/toast";
import { useAuthStore } from "data/stores/auth-store";
import { checkSession } from "data/api/auth";
import { FEATURE_SSO_AUTH } from "settings";

export const useCheckAuthSession = () => {
  const authData = useAuthStore((store) => store.authData);
  const setToken = useAuthStore((store) => store.setToken);
  const setCodeVerifier = useAuthStore((store) => store.setCodeVerifier);
  const toast = useToastController();

  useEffect(() => {
    if (!authData) return;
    if (!FEATURE_SSO_AUTH) {
      console.log("FEATURE_SSO_AUTH=false. Mocking check session...");
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
        setCodeVerifier(null);
      }
    })();
  }, [authData]);
};
