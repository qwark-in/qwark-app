import { Entity } from "data/models/account-aggregator";

export type FipType = {
  fip_id: string;
  fip_name: string;
  asset_class_id: Entity;
  popular_bank: boolean;
};

// FIU Fips
export type FetchFipListResponse = {
  status: "ok";
  data: {
    fips: FipType[];
  };
};

// FIU Init
export type FIUInitQueryBody = {
  mobile_number: string;
  pan: string;
  fip_ids: string[];
};

export type FIUInitResponse = {
  status: "ok";
  data: {
    consent_handles: { fip_class: Entity; consent_handle: string }[];
  };
};

// Trigger Auth OTP
export type TriggerAuthOTPQueryBody = {
  mobile_number: string;
  consent_handle: string;
};

export type TriggerAuthOTPResponse = {
  status: "ok";
  data: null;
};

// Validate Auth OTP
export type ValidateAuthOTPQueryBody = {
  mobile_number: string;
  consent_handle: string;
  otp: string;
};

export type ValidateAuthOTPResponse = {
  status: "ok";
  data: { session_id: string };
};

// Discover Accounts
export type DiscoveryAccountsInfo = {
  fip_type: string;
  account_type: string;
  account_ref_number: string;
  account_number: string;
  account_link_ref: string;
};

export type DiscoverAccountsQueryBody = {
  mobile_number: string;
  pan: string;
  fip_id: string;
  session_id: string;
  consent_handle: string;
};

export type DiscoverAccountsResponse = {
  status: "ok";
  data: {
    fip_name: string;
    accounts: DiscoveryAccountsInfo[];
  };
};

// Link Accounts

export type LinkingAccountsInfo = {
  account_number: string;
  account_ref_number: string;
  account_type: string;
  fip_type: string;
};

export type LinkAccountsQueryBody = {
  mobile_number: string;
  fip_id: string;
  session_id: string;
  consent_handle: string;
  accounts: LinkingAccountsInfo[];
};

export type LinkAccountsResponse = {
  status: "ok";
  data: {
    ref_number: string;
  };
};

// Link Accounts Verify

export type LinkAccountsVerifyQueryBody = {
  mobile_number: string;
  session_id: string;
  consent_handle: string;
  fip_id: string;
  account_ref_number: string;
  otp: string;
};

export type LinkAccountsVerifyResponse = {
  status: "ok";
  data: {
    accounts: {
      fip_account_link_ref: string;
      fip_account_ref_number: string;
    }[];
  };
};

// Get Consent Details

export type GetConsentDetailsQueryParams = {
  mobile_number: string;
  consent_handle: string;
  session_id: string;
};
export type GetConsentDetailsResponse = {
  status: "ok";
  data: {
    lst: {
      PURPOSEDESC: string;
      FIDATAFROMDATE: string;
      FIDATATODATE: string;
      CONSENTSTARTDATETIME: string;
      CONSENTEXPIRYDATETIME: string;
      MFIDATAFROMDATE: string;
      MFIDATATODATE: string;
      MCONSENTSTARTDATETIME: string;
      MCONSENTEXPIRYDATETIME: string;
      FREQUENCYUNIT: string;
      FREQUENCYVALUE: number;
      FITYPES: string;
      CONSENTMODE: string;
      CONSENTTYPES: string;
    }[];
  };
};

// Accept Consent

type FipDetails = {
  fip_id: string;
  fip_name: string;
  fip_account_number: string;
  fip_account_link_ref: string;
  fip_account_ref_number: string;
  fip_account_type: string;
  fip_type: string;
};
export type AcceptConsentQueryBody = {
  mobile_number: string;
  consent_handle: string;
  session_id: string;
  fip_details_list: FipDetails[];
};
export type AcceptConsentResponse = {
  status: "ok";
  data: {
    consent_id: string;
  };
};
