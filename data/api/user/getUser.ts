import axios, { AxiosError } from "axios";
import { BASE_URL } from "./constants";
import { GetUserResponse } from "./types";
import { AuthDataType } from "data/models/auth";

export const getUser = async (authData: AuthDataType) => {
  if (process.env.EXPO_PUBLIC_FEATURE_MOCK_USER_API === "true") {
    const { getUserMock } = await import("./userMockApis");
    return getUserMock(authData);
  }

  try {
    const response = await axios.get<GetUserResponse>(`${BASE_URL}`, {
      headers: {
        Token: JSON.stringify(authData),
      },
    });

    console.log("✅ Get User Response status:", response.status);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError<{ message?: string }>;

      console.error("❌ Get User Axios Error:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });

      throw new Error(
        `Get user failed: ${
          error.response?.data?.message ||
          error.response?.statusText ||
          error.message
        }`
      );
    } else {
      console.error("❌ Unexpected Error:", err);
      throw new Error("An unexpected error occurred while fetching the user.");
    }
  }
};
