import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { MarketActions, MarketState } from "data/models/market";

export const useMarketStore = create<MarketState & MarketActions>()(
  immer((set, get) => ({
    eqHoldings: null,
    mfHoldings: null,
    fdHoldings: null,
    setEqHoldings: (data) =>
      set((state) => {
        state.eqHoldings = data;
      }),
    setMfHoldings: (data) =>
      set((state) => {
        state.mfHoldings = data;
      }),
    setFdHoldings: (data) =>
      set((state) => {
        state.fdHoldings = data;
      }),
  }))
);
