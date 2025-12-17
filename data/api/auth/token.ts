import axios from "axios";
import { API_BASE_URL } from "./constants";
import { TokenResponse } from "./types";

export const exchangeToken = async (codeVerifier: string): Promise<TokenResponse> => {
  const params = new URLSearchParams({
    code_verifier: codeVerifier,
  });

  const url = new URL(`${API_BASE_URL}/token?${params}`);

  const { data } = await axios.post<TokenResponse>(url.href);

  if (!data?.token) {
    throw new Error("Token exchange failed");
  }

  return data;
};
