import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { DashboardActions, DashboardState } from '@/data/models/dashboard';
import { zustandStorage } from './helpers/storage';

export const useDashboardStore = create<DashboardState & DashboardActions>()(
  immer(
    persist(
      (set) => ({
        networth: null,
        cashflow: null,
        setCashflow: (data) =>
          set((state) => {
            state.cashflow = data;
          }),

        setNetworth: (data) =>
          set((state) => {
            state.networth = data;
          }),
      }),
      {
        name: 'dashboard-storage',
        storage: createJSONStorage(() => zustandStorage),
      }
    )
  )
);
