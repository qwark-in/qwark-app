import { EQHoldingsDataType } from "data/models/market";
import { stocksAndETFsHoldingsSortRadioListData } from "./constants";

type HoldingsSortOption =
  (typeof stocksAndETFsHoldingsSortRadioListData)[number]["value"];

export const sortEqTransactions = (
  arr: EQHoldingsDataType[],
  sortBy: HoldingsSortOption
) => {
  switch (sortBy) {
    case "Current Value":
      return [...arr].sort((a, b) => a.currentValue - b.currentValue);

    case "Stock Name(A-Z)":
      return [...arr].sort((a, b) => a.companyName.localeCompare(b.companyName));

    case "Returns % (High to Low)":
      return [...arr].sort((a, b) => b.cagr - a.cagr);

    default:
      return arr;
  }
};
