import { FDHoldingsDataType } from "data/models/market";
import { FDHoldingsSortRadioListData } from "./constants";

type HoldingsSortOption = (typeof FDHoldingsSortRadioListData)[number]["value"];

export const sortFdTransactions = (
  arr: FDHoldingsDataType[],
  sortBy: HoldingsSortOption
) => {
  switch (sortBy) {
    case "Maturity Amount":
      return [...arr].sort((a, b) => a.maturityAmount - b.maturityAmount);

    case "Bank Name(A-Z)":
      return [...arr].sort((a, b) => a.issuerName.localeCompare(b.issuerName));

    case "Interest Rate % (High to Low)":
      return [...arr].sort((a, b) => b.interestRate - a.interestRate);

    default:
      return arr;
  }
};
