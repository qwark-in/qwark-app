import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  FinancialProfileActions,
  FinancialProfileState,
} from "../models/financial-profile";

const initialState: FinancialProfileState = {
  consents: [],
  connectedAccounts: [],
  subscribedBanks: [],
};

export const useFinancialProfileStore = create<
  FinancialProfileState & FinancialProfileActions
>()(
  immer((set) => ({
    ...initialState,
    addConsent: (consent) =>
      set((state) => {
        state.consents.push(consent);
      }),
    setConnectedAccounts: (connectedAccounts) =>
      set((state) => {
        state.connectedAccounts = connectedAccounts;
      }),
    subscribeBank: (bank) =>
      set((state) => {
        state.subscribedBanks.push(bank);
      }),
    setFinancialProfile: (profile) =>
      set((state) => {
        state.consents = profile.consents;
        state.connectedAccounts = profile.connectedAccounts;
        state.subscribedBanks = profile.subscribedBanks;
      }),
  })),
);
