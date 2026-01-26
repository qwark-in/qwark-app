import axios, { AxiosError, AxiosResponse } from "axios";
import { UpdateFinProfileQueryBody, UpdateFinProfileResponse } from "./types";
import { AuthDataType } from "data/models/auth";
import { mockFinProfileData } from "./mockData";
import { DEV_API_DATA_BASE_URL, FEATURE_MOCK_DATA_API } from "settings";

export const updateFinProfileMock = (): Promise<UpdateFinProfileResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFinProfileData);
    }, 500);
  });
};

export const updateFinProfile = async (
  body: UpdateFinProfileQueryBody,
  authData: AuthDataType,
): Promise<AxiosResponse<UpdateFinProfileResponse>> => {
  try {
    if (FEATURE_MOCK_DATA_API) {
      console.log("Mock Update Fin Profile API");

      const mockData = await updateFinProfileMock();

      return {
        data: mockData,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      };
    }

    console.log("Updating Financial Profile with body:", body, authData);

    const response = await axios.post<
      UpdateFinProfileResponse,
      AxiosResponse<UpdateFinProfileResponse>,
      UpdateFinProfileQueryBody
    >(`${DEV_API_DATA_BASE_URL}/consents`, body, {
      headers: {
        Token: JSON.stringify(authData),
      },
    });

    console.log("✅ Update Fin Profile Response status:", response.status);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError<{ message?: string }>;

      console.error("❌ Update Fin Profile Axios Error:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });

      throw new Error(
        `Update Fin Profile failed: ${
          error.response?.data?.message || error.response?.statusText || error.message
        }`,
      );
    }

    console.error("❌ Unexpected Error:", err);
    throw new Error("An unexpected error occurred while updating the fin profile.");
  }
};
