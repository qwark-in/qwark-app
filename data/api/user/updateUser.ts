import axios, { AxiosError } from "axios";
import { BASE_URL } from "./constants";
import { UpdateUserQueryBody, UpdateUserResponse } from "./types";
import { AuthDataType } from "data/models/auth";

export const updateUser = async (data: UpdateUserQueryBody, authData: AuthDataType) => {
  try {
    const response = await axios.post<UpdateUserResponse>(`${BASE_URL}`, data, {
      headers: {
        Token: JSON.stringify(authData),
      },
    });

    console.log("✅ Update User Response status:", response.status);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError<{ message?: string }>;

      console.error("❌ Update User Axios Error:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });

      throw new Error(
        `Update user failed: ${
          error.response?.data?.message || error.response?.statusText || error.message
        }`
      );
    } else {
      console.error("❌ Unexpected Error:", err);
      throw new Error("An unexpected error occurred while updating the user.");
    }
  }
};
