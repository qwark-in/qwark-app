import axios, { AxiosError, AxiosResponse } from "axios";
import { FIN_PROFILE_BASE_URL } from "./constants";
import { GetFinProfileResponse } from "./types";
import { AuthDataType } from "data/models/auth";
import { mockFinProfileData } from "./mockData";
import { FEATURE_MOCK_FIN_PROFILE_API } from "settings";

export const getFinProfileMock = (): Promise<GetFinProfileResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFinProfileData);
    }, 500);
  });
};

export const getFinProfile = async (
  authData: AuthDataType
): Promise<AxiosResponse<GetFinProfileResponse>> => {
  try {
    if (FEATURE_MOCK_FIN_PROFILE_API) {
      console.log("Mock Get Fin Profile API");

      const mockData = await getFinProfileMock();

      return {
        data: mockData,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      };
    }

    const response = await axios.get<GetFinProfileResponse>(FIN_PROFILE_BASE_URL, {
      headers: {
        Token: JSON.stringify(authData),
      },
    });

    console.log("✅ Get Fin Profile Response status:", response.status);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError<{ message?: string }>;

      console.error("❌ Get Fin Profile Axios Error:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });

      throw new Error(
        `Get Fin Profile failed: ${
          error.response?.data?.message || error.response?.statusText || error.message
        }`
      );
    }

    console.error("❌ Unexpected Error:", err);
    throw new Error("An unexpected error occurred while fetching the fin profile.");
  }
};
