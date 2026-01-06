import axios from "axios";
import { AuthDataType } from "../../models/auth";
import { API_BASE_URL } from "./constants";

export const checkSession = async (authData: AuthDataType) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/check_session`,
      authData
    );

    return response;
  } catch (error) {
    throw error;
  }
};
