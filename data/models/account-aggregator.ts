import {
  FipType,
  DiscoveryAccountsInfo,
  LinkAccountsResponse,
  ValidateAuthOTPResponse,
  AcceptConsentResponse,
  LinkAccountsVerifyResponse,
} from '../api/aa/types';

export type Entity = 'BANK' | 'EQUITIES' | 'MF_ETF_OTHERS';
export type TopTabType = 'BANKS' | 'INVESTMENTS';

export type FipDataType = FipType;

export type SelectedBankType = Omit<FipDataType, 'popular_bank'>;

export type AccountType = Omit<FipDataType, 'popular_bank'> & {
  accounts: DiscoveryAccountsInfo[];
};

export type DiscoverAccountType = AccountType[];

export type SelectedAccount = Omit<FipDataType, 'popular_bank'> &
  Pick<DiscoveryAccountsInfo, 'account_ref_number' | 'account_type'>;

export type ConsentHandleType = { asset_class_id: Entity; consent_handle: string }[];

export type SessionIdType = ValidateAuthOTPResponse['data']['session_id'] | null;

export type FipRefNumber = {
  fip_id: FipType['fip_id'];
  ref_number: LinkAccountsResponse['data']['ref_number'];
};

export type AccountLinkRefs = LinkAccountsVerifyResponse['data']['accounts'];

export type ConsentIdType = AcceptConsentResponse['data']['consent_id'] | null;
