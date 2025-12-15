import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { SecureStorage } from "./helpers/secure-storage.android";

// import { devtools } from '@csark0812/zustand-expo-devtools';
import { AuthState, AuthActions } from "data/models/auth";
import { zustandStorage } from "./helpers/storage";

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
        partialize: (state) => ({
          authData: state.authData,
        }),
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
