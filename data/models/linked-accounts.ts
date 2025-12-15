import { Entity } from './account-aggregator';

type BankAccountDetailsType = {
  type: 'BANK';
  fip_type: string;
  account_type: string;
  account_ref_number: string;
  account_number: string;
  account_link_ref: string;
};

type StocksAccountDetailsType = {
  type: 'EQUITIES';
  demat_account_number: string;
  broker: string;
  account_ref_number: string;
  account_link_ref: string;
};

type MFAccountDetailsType = {
  type: 'MF_ETF_OTHERS';
  folio_number: string;
  folio_name: string;
  kyc_status: string;
  account_ref_number: string;
  account_link_ref: string;
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

export type LinkedAccountsState = {
  linkedAccounts: {
    fip_id: string;
    fip_name: string;
    asset_class_id: Entity;
    accounts: {
      accountDetails: AccountDetailsType;
      holderDetails: HolderDetailsType;
    }[];
  }[];
};

export type LinkedAccountsActions = {
  setLinkedAccounts: (linkedAccounts: LinkedAccountsState['linkedAccounts']) => void;
};
