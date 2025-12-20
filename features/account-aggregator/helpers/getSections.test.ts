import { getSections } from "./getSections";
import { FipDataType } from "data/models/account-aggregator";

const sampleBanks: FipDataType[] = [
  {
    fip_id: "fip-hdfc",
    fip_name: "HDFC Bank",
    popular_bank: true,
    asset_class_id: "BANK",
  },
  {
    fip_id: "fip-icici",
    fip_name: "ICICI Bank",
    popular_bank: false,
    asset_class_id: "BANK",
  },
  {
    fip_id: "fip-sbi",
    fip_name: "State Bank of India",
    popular_bank: true,
    asset_class_id: "BANK",
  },
  {
    fip_id: "fip-kotak",
    fip_name: "Kotak Mahindra Bank",
    popular_bank: false,
    asset_class_id: "BANK",
  },
];

type ResultType = { title: string; data: FipDataType[] }[];

describe("Testing helper function -> getSections", () => {
  it("should return two sections when all banks are present", () => {
    const result = getSections(sampleBanks, "");
    expect(result).toEqual<ResultType>([
      {
        title: "Popular Banks",
        data: [
          {
            fip_id: "fip-hdfc",
            fip_name: "HDFC Bank",
            popular_bank: true,
            asset_class_id: "BANK",
          },
          {
            fip_id: "fip-sbi",
            fip_name: "State Bank of India",
            popular_bank: true,
            asset_class_id: "BANK",
          },
        ],
      },
      {
        title: "Other Banks",
        data: [
          {
            fip_id: "fip-icici",
            fip_name: "ICICI Bank",
            popular_bank: false,
            asset_class_id: "BANK",
          },
          {
            fip_id: "fip-kotak",
            fip_name: "Kotak Mahindra Bank",
            popular_bank: false,
            asset_class_id: "BANK",
          },
        ],
      },
    ]);
  });

  it("should filter banks by text and return matching sections only", () => {
    const result = getSections(sampleBanks, "state");
    expect(result).toEqual<ResultType>([
      {
        title: "Popular Banks",
        data: [
          {
            fip_id: "fip-sbi",
            fip_name: "State Bank of India",
            popular_bank: true,
            asset_class_id: "BANK",
          },
        ],
      },
    ]);
  });

  it("should be case-insensitive when filtering", () => {
    const result = getSections(sampleBanks, "hDfC");
    expect(result).toEqual<ResultType>([
      {
        title: "Popular Banks",
        data: [
          {
            fip_id: "fip-hdfc",
            fip_name: "HDFC Bank",
            popular_bank: true,
            asset_class_id: "BANK",
          },
        ],
      },
    ]);
  });

  it("should return empty array when no banks match filter", () => {
    const result = getSections(sampleBanks, "NonExistentBank");
    expect(result).toEqual([]);
  });

  it("should return empty array when input list is empty", () => {
    const result = getSections([], "");
    expect(result).toEqual([]);
  });
});
