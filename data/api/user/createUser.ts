import axios, { AxiosError } from "axios";
import { BASE_URL } from "./constants";
import { CreateUserQueryBody, CreateUserResponse } from "./types";
import { AuthDataType } from "data/models/auth";
import { createUserMock } from "./userMockApis";

const IS_MOCK_USER_API = process.env.EXPO_PUBLIC_FEATURE_MOCK_USER_API === "true";

export const createUser = async (data: CreateUserQueryBody, authData: AuthDataType) => {
  try {
    if (IS_MOCK_USER_API) {
      console.log("🧪 Mock Create User API");

      const { data: mockData } = await createUserMock(data, authData);

      const response = {
        data: mockData,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      };

      console.log("✅ Create Mock User Response status:", response.status);

      return response;
    }

    const response = await axios.post<CreateUserResponse>(`${BASE_URL}`, data, {
      headers: {
        Token: JSON.stringify(authData),
      },
    });

    console.log("✅ Create User Response status:", response.status);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError<{ message?: string }>;

      console.log("❌ Create User Axios Error:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });

      throw new Error(
        `Create user failed: ${
          error.response?.data?.message || error.response?.statusText || error.message
        }`
      );
    } else {
      console.log("❌ Unexpected Error:", err);
      throw new Error("An unexpected error occurred while creating the user.");
    }
  }
};
