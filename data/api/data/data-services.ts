import axios, { AxiosError } from "axios";
import { BASE_URL } from "./constants";
import { AuthDataType } from "data/stores/auth-store";
import { DashboardState } from "data/models/dashboard";

type GetDashboardResponse = DashboardState;

export const getDashboardData = async (authData: AuthDataType) => {
  try {
    const response = await axios.get<GetDashboardResponse>(
      `${BASE_URL}/dashboard`,
      {
        headers: {
          Token: JSON.stringify(authData),
        },
      }
    );

    console.log("✅ Get Dashboard Response status:", response.status);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError<{ message?: string }>;

      console.error("❌ Get Dashboard Axios Error:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });

      throw new Error(
        `Get dashboard failed: ${
          error.response?.data?.message ||
          error.response?.statusText ||
          error.message
        }`
      );
    } else {
      console.error("❌ Unexpected Error:", err);
      throw new Error(
        "An unexpected error occurred while fetching the dashboard data."
      );
    }
  }
};

type GetMarketResponse = {};

export const getMarketData = async (authData: AuthDataType) => {
  try {
    const response = await axios.get<GetMarketResponse>(`${BASE_URL}/market`, {
      headers: {
        Token: JSON.stringify(authData),
      },
    });

    console.log("✅ Get Market Response status:", response.status);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError<{ message?: string }>;

      console.error("❌ Get Market Axios Error:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });

      throw new Error(
        `Get Market failed: ${
          error.response?.data?.message ||
          error.response?.statusText ||
          error.message
        }`
      );
    } else {
      console.error("❌ Unexpected Error:", err);
      throw new Error(
        "An unexpected error occurred while fetching the Market data."
      );
    }
  }
};
