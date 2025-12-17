import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type DashboardScreenState = {
  isVisible: boolean;
};

type DashboardScreenActions = {
  toggleIsVisible: () => void;
};

export const useDashboardScreenStore = create<DashboardScreenState & DashboardScreenActions>()(
  devtools(
    immer((set, get) => ({
      isVisible: true,
      toggleIsVisible: () => {
        set((state) => {
          state.isVisible = !state.isVisible;
        });
      },
    }))
  )
);
