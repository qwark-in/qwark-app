import { SectionListData } from "react-native";
import { format } from "date-fns";
import { CashFlow } from "data/models/dashboard";

export type CashflowTransactionType = Pick<
  CashFlow["transactions"][0],
  "date" | "amount" | "narration" | "type"
>;

type ConvertToSectionListFormatType = {
  (transactions: CashflowTransactionType[]): SectionListData<CashflowTransactionType>[];
};

type GroupedTransactionsType = {
  [key: string]: {
    transactions: CashflowTransactionType[];
    originalDate: Date;
  };
};

export const convertToSectionListFormat: ConvertToSectionListFormatType = (
  transactions
) => {
  // Create a map to group transactions by the formatted date string
  const groupedTransactions: GroupedTransactionsType = {};

  transactions.forEach((transaction) => {
    const formattedDate = format(new Date(transaction.date), "dd MMMM");
    if (!groupedTransactions[formattedDate]) {
      groupedTransactions[formattedDate] = {
        transactions: [],
        originalDate: new Date(transaction.date), // Keep the original Date object for sorting
      };
    }
    groupedTransactions[formattedDate].transactions.push(transaction);
  });

  // Convert the map to an array of sections
  const sections: SectionListData<CashflowTransactionType>[] = Object.keys(
    groupedTransactions
  )
    .sort((a, b) => {
      // Compare the original date objects stored in the map for sorting
      const dateA = groupedTransactions[a].originalDate;
      const dateB = groupedTransactions[b].originalDate;
      return dateB.getTime() - dateA.getTime(); // Sort from latest to oldest
    })
    .map((date) => ({
      title: date,
      data: groupedTransactions[date].transactions,
    }));

  return sections;
};
