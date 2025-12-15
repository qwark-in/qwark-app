// export const BASE_URL = 'https://qwarkuat.camsfinserv.com';

const getBaseURL = (): string => {
  const BASE_URL = process.env.EXPO_PUBLIC_DEV_AA_API_BASE_URL;
  if (BASE_URL) {
    return BASE_URL;
  } else {
    throw new Error('EXPO_PUBLIC_DEV_AA_API_BASE_URL not set in environment');
  }
};

export const BASE_URL = getBaseURL();
