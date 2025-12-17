import axios from "axios";
import { AuthDataType } from "data/models/auth";
import { API_BASE_URL } from "./constants";
import { getRedirectURL } from "features/auth/helpers/getRedirectURL";

export const logout = async (authData: AuthDataType) => {
  const params = new URLSearchParams({ ...authData, redirect_to: getRedirectURL("/") });
  const logoutURL = new URL(`${API_BASE_URL}/logout?${params}`);

  try {
    const response = await axios.get(logoutURL.href, {
      validateStatus: (status) => {
        return status === 302 || status === 200;
      },
    });

    return response;
  } catch (err) {
    console.error("Logout out failed:", err);
    throw err;
  }
};
