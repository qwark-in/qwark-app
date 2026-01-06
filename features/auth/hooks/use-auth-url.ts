import { useAuthStore } from "data/stores/auth-store";
import { generateCodes } from "../helpers/generateCodes";
import { getRedirectURL } from "../helpers/getRedirectURL";
import { API_BASE_URL } from "data/api/auth/constants";
import { AuthType } from "../types";

const getBaseURL = (): string => {
  const BASE_URL = process.env.EXPO_PUBLIC_DEV_API_BASE_URL;
  if (BASE_URL) {
    return BASE_URL;
  } else {
    throw new Error("EXPO_PUBLIC_DEV_API_BASE_URL not set in environment");
  }
};

export const useAuthURL = () => {
  const setCodeVerifier = useAuthStore((store) => store.setCodeVerifier);

  const getAuthURL = async (type: AuthType) => {
    const { cc: code_challenge, cv: code_verifier } = await generateCodes();
    setCodeVerifier(code_verifier);

    const params = new URLSearchParams({
      code_challenge: code_challenge,
      redirect_to: getRedirectURL("/login"),
    });

    const loginURL = new URL(
      `${getBaseURL()}/${type === "LOGIN" ? "login" : "sign_up"}?${params}`
    );

    return loginURL;
  };

  return { getAuthURL };
};
