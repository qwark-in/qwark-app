import { create } from "zustand";
// import { devtools } from '@csark0812/zustand-expo-devtools';
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  AccountLinkRefs,
  FipDataType,
  SelectedBankType,
  ConsentHandleType,
  ConsentIdType,
  DiscoverAccountType,
  Entity,
  FipRefNumber,
  SelectedAccount,
  SessionIdType,
} from "../models/account-aggregator";
import { zustandStorage } from "./helpers/storage";

export type AccountAggregatorState = {
  fips: FipDataType[];
  selectedEntities: Entity[];
  selectedBanks: SelectedBankType[];
  consent_handles: ConsentHandleType;
  session_id: SessionIdType;
  fipRefNumbers: FipRefNumber[];
  accountLinkRefs: AccountLinkRefs;
  discoveredAccounts: DiscoverAccountType;
  selectedAccounts: SelectedAccount[];
  consent_id: ConsentIdType;
};

type AccountAggregatorActions = {
  setSelectedEntities: (entities: Entity[]) => void;
  setFips: (fips: FipDataType[]) => void;
  setSelectedBanks: (selectedBank: SelectedBankType) => void;
  selectMultipleFips: (selectedFips: SelectedBankType[]) => void;
  setConsentHandles: (consent_handles: ConsentHandleType) => void;
  setSessionId: (session_id: string) => void;
  setRefNumber: (fip_id: string, ref_number: string) => void;
  addAccountLinkRefs: (accountLinkRefs: AccountLinkRefs) => void;
  setConsentId: (consent_id: string) => void;
  setDiscoveredAccounts: (
    updater: (prev: DiscoverAccountType) => DiscoverAccountType
  ) => void;
  selectAllAccounts: (
    updater: (prev: SelectedAccount[]) => SelectedAccount[]
  ) => void;
  setSelectedAccounts: (selectedAccount: SelectedAccount) => void;
  resetFips: () => void;
  resetDiscoveredAccounts: () => void;
  resetStore: () => void;
};

const initialState: AccountAggregatorState = {
  selectedEntities: ["BANK", "EQUITIES", "MF_ETF_OTHERS"],
  fips: [],
  consent_handles: [],
  session_id: null,
  fipRefNumbers: [],
  accountLinkRefs: [],
  discoveredAccounts: [],
  selectedBanks: [],
  selectedAccounts: [],
  consent_id: null,
};

export const useAAStore = create<
  AccountAggregatorState & AccountAggregatorActions
>()(
  immer(
    persist(
      (set) => ({
        ...initialState,
        setFips(fips) {
          set((state) => {
            state.fips = fips;
          });
        },
        setSelectedEntities(entities) {
          set((state) => {
            state.selectedEntities = entities;
          });
        },
        setSelectedBanks(selectedBank) {
          set((state) => {
            if (
              !state.selectedBanks.some(
                (bank) => bank.fip_id === selectedBank.fip_id
              )
            ) {
              state.selectedBanks = [...state.selectedBanks, selectedBank];
            } else {
              state.selectedBanks = state.selectedBanks.filter(
                (bank) => bank.fip_id !== selectedBank.fip_id
              );
            }
          });
        },
        selectMultipleFips(selectedFips) {
          set((state) => {
            state.selectedBanks = [...state.selectedBanks, ...selectedFips];
          });
        },
        setConsentHandles(consent_handles) {
          set((state) => {
            state.consent_handles = consent_handles;
          });
        },
        setSessionId(session_id) {
          set((state) => {
            state.session_id = session_id;
          });
        },
        setRefNumber(fip_id, ref_number) {
          set((state) => {
            state.fipRefNumbers = state.fipRefNumbers.some(
              (item) => item.fip_id === fip_id
            )
              ? state.fipRefNumbers.map((item) =>
                  item.fip_id === fip_id ? { ...item, ref_number } : item
                )
              : [...state.fipRefNumbers, { fip_id, ref_number }];
          });
        },
        addAccountLinkRefs(accountLinkRefs) {
          set((state) => {
            state.accountLinkRefs = [
              ...state.accountLinkRefs,
              ...accountLinkRefs,
            ];
          });
        },
        setConsentId(consent_id) {
          set((state) => {
            state.consent_id = consent_id;
          });
        },
        setDiscoveredAccounts(updater) {
          set((state) => ({
            discoveredAccounts: updater(state.discoveredAccounts),
          }));
        },
        selectAllAccounts(updater) {
          set((state) => ({
            selectedAccounts: updater(state.selectedAccounts),
          }));
        },
        setSelectedAccounts(selectedAccount) {
          set((state) => {
            const { account_ref_number } = selectedAccount;
            const accounts = state.selectedAccounts;
            const exists = accounts.some(
              (a) => a.account_ref_number === account_ref_number
            );

            state.selectedAccounts = exists
              ? accounts.filter(
                  (a) => a.account_ref_number !== account_ref_number
                )
              : [...accounts, selectedAccount];
          });
        },

        resetFips() {
          set((state) => {
            // state.fips = [];
            state.selectedBanks = [];
            state.fipRefNumbers = [];
          });
        },
        resetDiscoveredAccounts() {
          set((state) => {
            state.discoveredAccounts = [];
            state.selectedAccounts = [];
          });
        },
        resetStore() {
          set((state) => ({ ...initialState, session_id: state.session_id }));
        },
      }),
      {
        name: "aa-store",
        partialize: (state) => ({
          session_id: state.session_id,
        }),
        storage: createJSONStorage(() => zustandStorage),
      }
    )
  )
);
