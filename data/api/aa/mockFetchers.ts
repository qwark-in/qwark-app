import {
  AcceptConsentQueryBody,
  AcceptConsentResponse,
  DiscoverAccountsQueryBody,
  DiscoverAccountsResponse,
  FetchFipListResponse,
  FIUInitQueryBody,
  FIUInitResponse,
  GetConsentDetailsQueryParams,
  GetConsentDetailsResponse,
  LinkAccountsQueryBody,
  LinkAccountsResponse,
  LinkAccountsVerifyQueryBody,
  LinkAccountsVerifyResponse,
  TriggerAuthOTPQueryBody,
  TriggerAuthOTPResponse,
  ValidateAuthOTPQueryBody,
  ValidateAuthOTPResponse,
} from "./types";

const fipMap: Record<string, string> = {
  "fipuat@citybank": "City Union Bank",
  "idfc-first-fip-uat": "IDFC FIRST BANK",
  "HDFC-FIP": "HDFC BANK",
};

export const mockFipListFetcher = async (): Promise<FetchFipListResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    status: "ok",
    data: {
      fips: [
        {
          fip_id: "fipuat@citybank",
          fip_name: "City Union Bank",
          asset_class_id: "BANK",
          popular_bank: true,
        },
        {
          fip_id: "idfc-first-fip-uat",
          fip_name: "IDFC FIRST BANK",
          popular_bank: false,
          asset_class_id: "EQUITIES",
        },
        {
          fip_id: "HDFC-FIP",
          fip_name: "HDFC BANK",
          popular_bank: false,
          asset_class_id: "MF_ETF_OTHERS",
        },
      ],
    },
  };
};

export const mockFiuInitFetcher = async (
  url: string,
  { arg }: { arg: FIUInitQueryBody }
): Promise<FIUInitResponse> => {
  console.log("Mock FIU Init called with:", arg);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    status: "ok",
    data: {
      consent_handles: [
        {
          consent_handle: "e0712ee6-6cd9-4fd0-a428-a9de6c1f162f",
          fip_class: "BANK",
        },
        {
          consent_handle: "a1427ee6-9dc6-f5e3-a498-a8de6c1f162f",
          fip_class: "BANK",
        },
      ],
    },
  };
};

export const mockTriggerAuthOTPFetcher = async (
  url: string,
  { arg }: { arg: TriggerAuthOTPQueryBody }
): Promise<TriggerAuthOTPResponse> => {
  console.log("Mock Trigger Auth OTP called with:", arg);

  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    status: "ok",
    data: null,
  };
};

export const mockValidateAuthOTPFetcher = async (
  url: string,
  { arg }: { arg: ValidateAuthOTPQueryBody }
): Promise<ValidateAuthOTPResponse> => {
  console.log("Mock validateAuthOTPFetcher called with:", arg);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (arg.otp === "123456") {
        resolve({
          status: "ok",
          data: {
            session_id: "mock-session-id-xyz789",
          },
        });
      } else {
        reject({
          status: "error",
          message: "Invalid OTP",
        });
      }
    }, 1000); // Simulate network delay
  });
};

export const mockDiscoverAccountsFetcher = async (
  _url: string,
  { arg }: { arg: DiscoverAccountsQueryBody }
): Promise<DiscoverAccountsResponse> => {
  console.log("Mock DiscoverAccountsFetcher called with:", arg);

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    status: "ok",
    data: {
      fip_name: fipMap[arg.fip_id],
      accounts: [
        {
          fip_type: "DEPOSIT",
          account_type: "SAVINGS",
          account_ref_number: "A1B2C3D5G1" + arg.fip_id,
          account_number: "A1B2C3D5G6",
          account_link_ref: "",
        },
        {
          fip_type: "TERM_DEPOSIT",
          account_type: "CURRENT",
          account_ref_number: "A1B2C3D5G2" + arg.fip_id,
          account_number: "A1B2C3D5G6",
          account_link_ref: "",
        },
        {
          fip_type: "TERM_DEPOSIT",
          account_type: "CURRENT",
          account_ref_number: "A1B2C3D5G3" + arg.fip_id,
          account_number: "A1B2C3D5G6",
          account_link_ref: "",
        },
      ],
    },
  };
};

export const mockLinkAccountsFetcher = async (
  url: string,
  { arg }: { arg: LinkAccountsQueryBody }
): Promise<LinkAccountsResponse> => {
  console.log("Mock LinkAccountsFetcher called with:", arg);

  // You can add conditions to simulate different scenarios
  if (!arg.mobile_number || !arg.accounts.length) {
    throw new Error("Invalid request: Missing mobile number or account data");
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    status: "ok",
    data: {
      ref_number: "MOCK_REF_123456",
    },
  };
};

export const mockLinkAccountsVerifyFetcher = async (
  url: string,
  { arg }: { arg: LinkAccountsVerifyQueryBody }
): Promise<LinkAccountsVerifyResponse> => {
  console.log("Mock LinkAccountsVerifyFetcher called with:", arg);

  // Optional: Simulate failure if required
  if (!arg.otp || arg.otp !== "123456") {
    throw new Error("Invalid or missing OTP");
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    status: "ok",
    data: {
      accounts: [
        {
          fip_account_link_ref: "mock-account-link-ref",
          fip_account_ref_number: "mock-account-ref-number",
        },
      ],
    },
  };
};

export const mockGetConsentDetailsFetcher = async (
  url: string,
  { arg }: { arg: GetConsentDetailsQueryParams }
): Promise<GetConsentDetailsResponse> => {
  console.log("[MOCK] getConsentDetailsFetcher called with:", arg);

  return {
    status: "ok",
    data: {
      lst: [
        {
          CONSENTEXPIRYDATETIME: "2026-06-12 16:48:31.000",
          CONSENTMODE: "STORE",
          CONSENTSTARTDATETIME: "2025-06-12 16:48:21.000",
          CONSENTTYPES: "PROFILE,SUMMARY,TRANSACTIONS",
          FIDATAFROMDATE: "2024-06-12 16:48:31.000",
          FIDATATODATE: "2026-06-12 16:48:31.000",
          FITYPES: "DEPOSIT",
          FREQUENCYUNIT: "MONTH",
          FREQUENCYVALUE: 31,
          MCONSENTEXPIRYDATETIME: "2026-06-12 22:18:31.000",
          MCONSENTSTARTDATETIME: "2025-06-12 22:18:21.000",
          MFIDATAFROMDATE: "2024-06-12 22:18:31.000",
          MFIDATATODATE: "2026-06-12 22:18:31.000",
          PURPOSEDESC: "Wealth management service",
        },
      ],
    },
  };
};

export const mockAcceptConsentFetcher = async (
  url: string,
  { arg }: { arg: AcceptConsentQueryBody }
): Promise<AcceptConsentResponse> => {
  console.log("[Mock] Accept consent called with:", arg);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    status: "ok",
    data: {
      consent_id: "MOCK-CONSENT-ID-123",
    },
  };
};
