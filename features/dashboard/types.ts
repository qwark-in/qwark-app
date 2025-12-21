export type DurationType = "1M" | "3M" | "6M" | "1Y" | "CUSTOM_DATES" | "ALL";

export type DatesType = {
  fromDate: Date;
  toDate: Date;
};

export type BankListItemType = {
  id: number;
  value: string;
  title: string;
  accountNumber: string;
  icon: React.ReactElement;
};

export type Timeframe = {
  id: string;
  value: DurationType;
  label: string;
};
