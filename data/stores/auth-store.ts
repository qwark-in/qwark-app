import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { AuthState, AuthActions } from "data/models/auth";
import { zustandStorage } from "./helpers/storage";
import { Platform } from "react-native";

export const useAuthStore = create<AuthState & AuthActions>()(
  immer(
    persist(
      (set) => ({
        authData: null,
        codeVerifier: null,
        codeChallege: null,
        isHydrated: false,
        setToken(authData) {
          set((state) => {
            state.authData = authData;
          });
        },
        setCodeVerifier(cv) {
          set((state) => {
            state.codeVerifier = cv;
          });
        },
        setCodeChallenge(cc) {
          set((state) => {
            state.codeChallege = cc;
          });
        },
        setIsHydrated(h) {
          set((state) => {
            state.isHydrated = h;
          });
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => {
          if (Platform.OS === "web") {
            return {
              authData: state.authData,
              codeVerifier: state.codeVerifier,
            };
          } else {
            return {
              authData: state.authData,
            };
          }
        },
        //TODO: switch to SecureStorage after testing
        storage: createJSONStorage(() => zustandStorage),
        onRehydrateStorage: (state) => {
          console.log("Auth hydration started...");

          return (state, error) => {
            if (error) {
              console.log("an error happened during Auth hydration", error);
            } else {
              console.log("Auth hydration finished");
              state?.setIsHydrated(true);
            }
          };
        },
      }
    )
  )
);
