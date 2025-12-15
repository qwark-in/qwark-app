export type AuthDataType = { device: string; token: string; uuid: string };

export type AuthState = {
  authData: AuthDataType | null;
  codeVerifier: string | null;
  codeChallege: string | null;
  isHydrated: boolean;
};

export type AuthActions = {
  setToken: (authData: AuthDataType | null) => void;
  setIsHydrated: (h: boolean) => void;
  setCodeVerifier: (cv: string | null) => void;
  setCodeChallenge: (cc: string | null) => void;
};
