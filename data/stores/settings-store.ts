import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { zustandStorage } from './helpers/storage';

type PermissionState = 'GRANTED' | 'DENIED' | 'NEVER_ASK_AGAIN';

type SettingsState = {
  isBiometricsEnabled: boolean;
  isSmsPermissionGranted: PermissionState | undefined;
  appPin: string | null;
};

type SettingsActions = {
  setIsBiometricsEnabled: (isBiometricsEnabled: boolean) => void;
  setIsSmsPermissionGranted: (isSmsPermissionGranted: PermissionState) => void;
  setAppPin: (appPin: string) => void;
};

export const useSettigsStore = create<SettingsState & SettingsActions>()(
  immer(
    persist(
      (set) => ({
        isBiometricsEnabled: false,
        isSmsPermissionGranted: undefined,
        appPin: null,
        setIsBiometricsEnabled: (isBiometricsEnabled) => {
          set((state) => {
            state.isBiometricsEnabled = isBiometricsEnabled;
          });
        },
        setAppPin: (appPin) => {
          set((state) => (state.appPin = appPin));
        },
        setIsSmsPermissionGranted: (isSmsPermissionGranted) => {
          set((state) => {
            state.isSmsPermissionGranted = isSmsPermissionGranted;
          });
        },
      }),
      {
        name: 'settings-storage',
        storage: createJSONStorage(() => zustandStorage),
      }
    )
  )
);
