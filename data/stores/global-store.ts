import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { zustandStorage } from './helpers/storage';

type GlobalState = {
  isOnboardingCompleted: boolean;
  isAccountAggregatorCompleted: boolean;
};

type GlobalActions = {
  setIsOnboardingCompleted: (isOnboardingCompleted: boolean) => void;
  setIsAccountAggregatorCompleted: (isAccountAggregatorCompleted: boolean) => void;
};

export const useGlobalStore = create<GlobalState & GlobalActions>()(
  immer(
    persist(
      (set) => ({
        isOnboardingCompleted: false,
        isAccountAggregatorCompleted: false,
        setIsAccountAggregatorCompleted: (isAccountAggregatorCompleted) => {
          set((state) => {
            state.isAccountAggregatorCompleted = isAccountAggregatorCompleted;
          });
        },
        setIsOnboardingCompleted: (isOnboardingCompleted) => {
          set((state) => {
            state.isOnboardingCompleted = isOnboardingCompleted;
          });
        },
      }),
      {
        name: 'global-storage',
        storage: createJSONStorage(() => zustandStorage),
      }
    )
  )
);
