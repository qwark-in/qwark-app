type TransactionType = 'DEBIT' | 'CREDIT';
type TransactionMode =
  | 'CASH'
  | 'UPI'
  | 'IMPS'
  | 'NEFT'
  | 'RTGS'
  | 'CARD'
  | 'ATM'
  | 'CHEQUE'
  | 'DEMAND_DRAFT'
  | 'AUTO_DEBIT'
  | 'INTEREST_CREDIT'
  | 'NACH'
  | 'ECS'
  | 'REMITTANCE'
  | 'OTHERS';

type Transaction = {
  type: TransactionType;
  mode: TransactionMode;
  transactionalBalance: number;
  date: string;
  amount: number;
  narration: string;
};

type AccountDetails = {
  fipId: string;
  accountRefNumber: string;
  fipName: string;
  accountNumber: string;
};

export type CashFlow = {
  accountDetails: AccountDetails;
  currentBalance: number;
  firstTransactionDate: string;
  lastTransactionDate: string;
  transactions: Transaction[];
};

export type Networth = {
  amount: number;
  chartData: {
    value: number;
    date: string; // ISO Date string
  }[];
};

export type DashboardState = {
  networth: Networth | null;
  cashflow: CashFlow[] | null;
};

export type DashboardActions = {
  setCashflow: (data: CashFlow[]) => void;
  setNetworth: (data: Networth) => void;
};
