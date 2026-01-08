import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { DatesType, DurationType } from "features/dashboard/types";
import { startOfMonth, subMonths } from "date-fns";

export type CashflowTab = "EXPENSES" | "INCOMES";

type CashflowScreenState = {
  activeTab: CashflowTab;

  // Filter State
  selectedFilters: {
    duration: DurationType;
    dates: DatesType;
  };
  appliedFilters: {
    duration: DurationType;
    dates: DatesType;
  };
};

type CashflowScreenActions = {
  setActiveTab: (tab: "EXPENSES" | "INCOMES") => void;
  setDuration: (duration: DurationType, toDate: Date) => void;
  setCustomDates: (dates: DatesType) => void;

  // Filter Actions
  dismissFilters: () => void;
  applyFilters: () => void;
};

export const useCashflowScreenStore = create<
  CashflowScreenState & CashflowScreenActions
>()(
  immer(
    devtools((set, get) => ({
      isPointerEnabled: false,
      activeTab: "EXPENSES",

      // Filter State

      selectedFilters: {
        duration: "1M",
        dates: {
          fromDate: startOfMonth(new Date()),
          toDate: new Date(),
        },
      },
      appliedFilters: {
        duration: "1M",
        dates: {
          fromDate: startOfMonth(new Date()),
          toDate: new Date(),
        },
      },
      setActiveTab: (tab) => {
        set((state) => {
          state.activeTab = tab;
        });
      },
      setDuration: (duration, toDate) => {
        set((state) => {
          if (duration === "CUSTOM_DATES") {
            state.selectedFilters.duration = duration;
          } else {
            state.appliedFilters.duration = duration;
            state.selectedFilters.duration = duration;
          }

          if (duration === "1M") {
            const dates: DatesType = {
              fromDate: startOfMonth(toDate),
              toDate: toDate,
            };
            state.appliedFilters.dates = dates;
            state.selectedFilters.dates = dates;
            state.selectedFilters.duration = duration;
          } else if (duration === "3M") {
            const dates: DatesType = {
              fromDate: startOfMonth(subMonths(toDate, 2)),
              toDate: toDate,
            };
            state.appliedFilters.dates = dates;
            state.selectedFilters.dates = dates;
            state.selectedFilters.duration = duration;
          } else if (duration === "6M") {
            const dates: DatesType = {
              fromDate: startOfMonth(subMonths(toDate, 5)),
              toDate: toDate,
            };
            state.appliedFilters.dates = dates;
            state.selectedFilters.dates = dates;
            state.selectedFilters.duration = duration;
          } else if (duration === "1Y") {
            const dates: DatesType = {
              fromDate: startOfMonth(subMonths(toDate, 11)),
              toDate: toDate,
            };
            state.appliedFilters.dates = dates;
            state.selectedFilters.dates = dates;
            state.selectedFilters.duration = duration;
          }
        });
      },

      setCustomDates: (dates) => {
        set((state) => {
          state.selectedFilters.dates = dates;
        });
      },

      // Filter Actions

      dismissFilters: () => {
        set((state) => {
          state.selectedFilters = state.appliedFilters;
        });
      },
      applyFilters: () => {
        set((state) => {
          state.appliedFilters = state.selectedFilters;
        });
      },
    }))
  )
);
