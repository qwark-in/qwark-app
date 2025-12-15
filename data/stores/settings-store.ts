import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { zustandStorage } from "./helpers/storage";

type PermissionState = "GRANTED" | "DENIED" | "NEVER_ASK_AGAIN";

type SettingsState = {
  isBiometricsEnabled: boolean;
  isSmsPermissionGranted: PermissionState | undefined;
};

type SettingsActions = {
  setIsBiometricsEnabled: (isBiometricsEnabled: boolean) => void;
  setIsSmsPermissionGranted: (isSmsPermissionGranted: PermissionState) => void;
};

export const useSettigsStore = create<SettingsState & SettingsActions>()(
  immer(
    persist(
      (set) => ({
        isBiometricsEnabled: false,
        isSmsPermissionGranted: undefined,

        setIsBiometricsEnabled: (isBiometricsEnabled) => {
          set((state) => {
            state.isBiometricsEnabled = isBiometricsEnabled;
          });
        },
        setIsSmsPermissionGranted: (isSmsPermissionGranted) => {
          set((state) => {
            state.isSmsPermissionGranted = isSmsPermissionGranted;
          });
        },
      }),
      {
        name: "settings-storage",
        storage: createJSONStorage(() => zustandStorage),
      }
    )
  )
);
