import { GetFinProfileResponse } from "./types";

export const mockFinProfileData: GetFinProfileResponse = {
  connectedAccounts: [
    {
      accounts: [
        {
          accountDetails: {
            account_number: "1234567890",
            account_type: "SAVINGS",
            fip_type: "deposit",
          },
          holderDetails: {
            address: "123 Main St, Mumbai",
            email: "john.doe@example.com",
            name: "John Doe",
            nominee: true,
            pan: "ABCDE1234F",
          },
        },
      ],
      asset_class_id: "BANK",
      fip_id: "fip-bank-1",
      fip_name: "HDFC Bank",
    },
    {
      accounts: [
        {
          accountDetails: {
            broker: "Zerodha Broking Ltd",
            demat_account_number: "1208160000000000",
          },
          holderDetails: {
            address: "123 Main St, Mumbai",
            email: "john.doe@example.com",
            name: "John Doe",
            nominee: false,
            pan: "ABCDE1234F",
          },
        },
      ],
      asset_class_id: "EQUITIES",
      fip_id: "fip-equities-1",
      fip_name: "Zerodha",
    },
    {
      accounts: [
        {
          accountDetails: {
            folio_name: "Growth Fund Direct",
            folio_number: "12345/67",
            kyc_status: "OK",
          },
          holderDetails: {
            address: "123 Main St, Mumbai",
            email: "john.doe@example.com",
            name: "John Doe",
            nominee: true,
            pan: "ABCDE1234F",
          },
        },
      ],
      asset_class_id: "MF_ETF_OTHERS",
      fip_id: "fip-mf-1",
      fip_name: "CAMS",
    },
  ],
  consents: [
    {
      consent_id: "consent-123",
    },
  ],
  subscribedBanks: [
    {
      fip_name: "HDFC Bank",
    },
    {
      fip_name: "ICICI Bank",
    },
  ],
};
