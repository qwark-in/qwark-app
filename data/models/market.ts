type PercentageAndValueType = {
  percentage: number;
  value: number;
};

type ChartData = {
  value: number;
  date: string; // ISO Date string
}[];

// Stocks & ETFs
export type EQTransactionsDataType = {
  qty: number;
  price: number;
  tnxType: 'BUY' | 'SELL';
  exchange: 'NSE' | 'BSE';
  tnxDateString: string;
};

export type EQHoldingsDataType = {
  qty: number;
  companyName: string;
  currentValue: number;
  investedValue: number;
  cagr: number;
  lastTradedPrice: number;
  monthlyReturn: PercentageAndValueType;
  transactions: EQTransactionsDataType[];
};

export type EQHoldingsType = {
  currentValue: number;
  investedValue: number;
  lifetimeReturn: PercentageAndValueType;
  monthlyReturn: PercentageAndValueType;
  holdingsData: EQHoldingsDataType[];
  curretValueChartData: ChartData;
};

// Mutual Funds

export type MFTransactionsDataType = {
  mfName: string;
  movementType: 'SIP' | 'REDEEM' | 'ONE_TIME';
  value: number;
  units: number;
  transactionDate: string; // ISO Date String
};

type MFSchemePlan = 'REGULAR' | 'DIRECT';

type MFSchemeType =
  | 'EQUITY_SCHEMES'
  | 'DEBT_SCHEMES'
  | 'HYBRID_SCHEMES'
  | 'SOLUTION_ORIENTED_SCHEMES'
  | 'OTHER_SCHEME';

export type MFHoldingsDataType = {
  mfName: string;
  currentValue: number;
  investedValue: number;
  xirr: number;
  units: number;
  nav: number;
  lifetimeReturn: PercentageAndValueType;
  schemePlan: MFSchemePlan;
  schemeType: MFSchemeType;
  transactions: MFTransactionsDataType[];
};

export type SipHoldingsDataType = {
  mfName: string;
  sipValue: number;
  totalInvestment: number;
  nextDueDate: string; // ISO Date String
  startDate: string; // ISO Date String
  mfCategory: 'REGULAR' | 'DIRECT';
  mfSchemeOption: 'REINVEST' | 'PAYOUT' | 'GROWTH';
  frequency: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  folioNumber: string;
  sipRefNumber: string;
};

export type MFHoldingsType = {
  currentValue: number;
  investedValue: number;
  xirr: number;
  lifetimeReturn: PercentageAndValueType;
  monthlyReturn: PercentageAndValueType;
  sipData: SipHoldingsDataType[];
  holdingsData: MFHoldingsDataType[];
  curretValueChartData: ChartData;
};

export type FDHoldingsDataType = {
  issuerName: string;
  principalAmount: number;
  maturityAmount: number;
  interestRate: number;
  startDate: string; // ISO Date String
  maturityDate: string; // ISO Date String
  durationInDays: number;
  accountType: string;
  transactions: {
    type: string;
    date: string; // ISO Date string
    mode: string;
    amount: number;
  }[];
};

export type FDHoldingsType = {
  totalMaturityAmount: number;
  totalPrincipalAmount: number;
  expectedInterest: number;
  holdingsData: FDHoldingsDataType[];
};

export type MarketState = {
  eqHoldings: EQHoldingsType | null;
  mfHoldings: MFHoldingsType | null;
  fdHoldings: FDHoldingsType | null;
};

export type MarketActions = {
  setEqHoldings: (data: EQHoldingsType) => void;
  setMfHoldings: (data: MFHoldingsType) => void;
  setFdHoldings: (data: FDHoldingsType) => void;
};
