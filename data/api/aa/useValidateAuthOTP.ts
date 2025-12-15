import axios from 'axios';
import useSWRMutation from 'swr/mutation';
import { BASE_URL } from './constants';
import { ValidateAuthOTPQueryBody, ValidateAuthOTPResponse } from './types';
import { mockValidateAuthOTPFetcher } from './mockFetchers';

const validateAuthOTPFetcher = async (
  url: string,
  { arg }: { arg: ValidateAuthOTPQueryBody }
): Promise<ValidateAuthOTPResponse> => {
  const response = await axios.post(url, arg);
  return response.data;
};

export const useValidateAuthOTP = () => {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${BASE_URL}/v1/auth/validate`,
    process.env.EXPO_PUBLIC_FEATURE_MOCK_API === 'true'
      ? mockValidateAuthOTPFetcher
      : validateAuthOTPFetcher
  );

  return {
    validateAuthOTP: trigger,
    validateAuthOTPIsLoading: isMutating,
    validateAuthOTPData: data,
    validateAuthOTPError: error,
  };
};
