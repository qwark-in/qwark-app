import axios from "axios";
import { AuthDataType } from "../../models/auth";

export const checkSession = async (authData: AuthDataType) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_DEV_API_BASE_URL}/check_session`,
      authData
    );

    return response;
  } catch (error) {
    throw error;
  }
};
