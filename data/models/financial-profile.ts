export type Entity = 'BANK' | 'EQUITIES' | 'MF_ETF_OTHERS';

export type BankAccountDetailsType = {
  fip_type: string;
  account_type: string;
  account_number: string;
};

export type StocksAccountDetailsType = {
  demat_account_number: string;
  broker: string;
};

export type MFAccountDetailsType = {
  folio_number: string;
  folio_name: string;
  kyc_status: string;
};

export type AccountDetailsType =
  | BankAccountDetailsType
  | StocksAccountDetailsType
  | MFAccountDetailsType;

export type HolderDetailsType = {
  name: string;
  email: string;
  pan: string;
  nominee: boolean;
  address: string;
};

export type ConnectedAccountState = {
  fip_id: string;
  fip_name: string;
  asset_class_id: Entity;
  accounts: {
    accountDetails: AccountDetailsType;
    holderDetails: HolderDetailsType;
  }[];
};

export type FinancialProfileState = {
  consents: {
    consent_id: string;
  }[];
  connectedAccounts: ConnectedAccountState[];
  subscribedBanks: {
    fip_name: string;
  }[];
};

export type FinancialProfileActions = {
  setFinancialProfile: (profile: FinancialProfileState) => void;
  setConnectedAccounts: (connectedAccounts: FinancialProfileState['connectedAccounts']) => void;
  subscribeBank: (bank: FinancialProfileState['subscribedBanks'][number]) => void;
  addConsent: (consent: FinancialProfileState['consents'][number]) => void;
};
