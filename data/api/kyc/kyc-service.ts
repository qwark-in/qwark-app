import axios, { AxiosError } from "axios";
import { BASE_URL } from "./constants";
import { FEATURE_MOCK_KYC_API } from "settings";

export type GetKYCStatusResponse = {
  verified: boolean;
};

const getKYCStatusMock = async (pan: string): Promise<GetKYCStatusResponse> => {
  const response = {
    data: {
      verified: true,
    },
    status: 200,
    statusText: "OK",
  };

  return new Promise((res) => {
    setTimeout(() => res(response.data), 500);
  });
};

export const getKYCStatus = async (pan: string) => {
  if (FEATURE_MOCK_KYC_API) {
    const response = await getKYCStatusMock("ABCDE1234F");
    return response;
  }
  try {
    const response = await axios.post<GetKYCStatusResponse>(`${BASE_URL}/verify`, {
      uuid: "qwark-uid",
      pan: pan,
    });

    console.log("✅ Get KYC Status Response status:", response.status);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError<{ message?: string }>;

      console.error("❌ Get KYC Status Axios Error:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });

      throw new Error(
        `Get KYC Status failed: ${
          error.response?.data?.message || error.response?.statusText || error.message
        }`
      );
    } else {
      console.error("❌ Unexpected Error:", err);
      throw new Error("An unexpected error occurred while fetching the KYC Status.");
    }
  }
};
