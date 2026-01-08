import { MFHoldingsDataType, SipHoldingsDataType } from "data/models/market";

import { holdingsSortRadioListData, activeSipsSortRadioListData } from "./constants";

type HoldingsSortOption = (typeof holdingsSortRadioListData)[number]["value"];
type ActiveSipSortOpetion = (typeof activeSipsSortRadioListData)[number]["value"];

export const sortMfTransactions = (
  arr: MFHoldingsDataType[],
  sortBy: HoldingsSortOption
) => {
  switch (sortBy) {
    case "Current Value":
      return [...arr].sort((a, b) => b.currentValue - a.currentValue);

    case "Alphabetical":
      return [...arr].sort((a, b) => a.mfName.localeCompare(b.mfName));

    case "Returns % (High to Low)":
      return [...arr].sort(
        (a, b) => b.lifetimeReturn.percentage - a.lifetimeReturn.percentage
      );

    case "XIRR":
      return [...arr].sort((a, b) => b.xirr - a.xirr);

    default:
      return arr;
  }
};

export const sortActiveSipList = (
  arr: SipHoldingsDataType[],
  sortBy: ActiveSipSortOpetion
) => {
  switch (sortBy) {
    case "SIP Amount (High to Low)":
      return [...arr].sort((a, b) => b.sipValue - a.sipValue);

    case "Alphabetical":
      return [...arr].sort((a, b) => a.mfName.localeCompare(b.mfName));

    default:
      return arr;
  }
};
