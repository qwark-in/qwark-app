const getBaseURL = (): string => {
  const BASE_URL = process.env.EXPO_PUBLIC_DEV_API_DATA_BASE_URL;
  if (BASE_URL) {
    return BASE_URL;
  } else {
    throw new Error('EXPO_PUBLIC_DEV_API_DATA_BASE_URL not set in environment');
  }
};

export const BASE_URL = getBaseURL();
