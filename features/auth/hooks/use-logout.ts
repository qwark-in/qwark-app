import { useCallback, useState } from "react";
import { useToastController } from "@tamagui/toast";
import { logout as logoutService } from "data/api/auth";
import { useAuthStore } from "data/stores/auth-store";
import { useUserStore } from "data/stores/user-store";

const IS_SSO_ENABLED = process.env.EXPO_PUBLIC_FEATURE_SSO_AUTH === "true";

export const useLogout = () => {
  const authData = useAuthStore((s) => s.authData);
  const setToken = useAuthStore((s) => s.setToken);
  const resetUser = useUserStore((s) => s.resetUser);
  const toast = useToastController();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const clearSession = useCallback(() => {
    resetUser();
    setToken(null);
  }, [resetUser, setToken]);

  const logout = useCallback(async () => {
    if (!authData || isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      if (!IS_SSO_ENABLED) {
        console.log("SSO disabled → mocking logout");
        clearSession();
        return;
      }

      await logoutService(authData);
      clearSession();
    } catch (err) {
      console.error("Logout error", err);
      toast.show(
        err instanceof Error ? err.message : "Logout failed. Please try again.",
        { native: true }
      );
    } finally {
      setIsLoggingOut(false);
    }
  }, [authData, isLoggingOut, clearSession, toast]);

  return {
    logout,
    isLoggingOut,
  };
};
