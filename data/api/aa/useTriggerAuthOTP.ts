import axios from 'axios';
import useSWRMutation from 'swr/mutation';
import { BASE_URL } from './constants';
import { TriggerAuthOTPQueryBody, TriggerAuthOTPResponse } from './types';
import { mockTriggerAuthOTPFetcher } from './mockFetchers';

const triggerAuthOTPFetcher = async (
  url: string,
  { arg }: { arg: TriggerAuthOTPQueryBody }
): Promise<TriggerAuthOTPResponse> => {
  const response = await axios.post(url, arg);
  return response.data;
};

export const useTriggerAuthOTP = () => {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${BASE_URL}/v1/auth/create`,
    process.env.EXPO_PUBLIC_FEATURE_MOCK_API === 'true'
      ? mockTriggerAuthOTPFetcher
      : triggerAuthOTPFetcher
  );

  return {
    triggerAuthOTP: trigger,
    triggerAuthOTPIsLoading: isMutating,
    triggerAuthOTPData: data,
    triggerAuthOTPError: error,
  };
};
