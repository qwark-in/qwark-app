import axios from './axios';
import { BASE_URL } from './constants';
import useSWRMutation from 'swr/mutation';
import { AcceptConsentQueryBody, AcceptConsentResponse } from './types';
import { mockAcceptConsentFetcher } from './mockFetchers';

const acceptConsentFetcher = async (
  url: string,
  { arg }: { arg: AcceptConsentQueryBody }
): Promise<AcceptConsentResponse> => {
  console.log('Accept Consent Body -> ', arg);
  const response = await axios.post(url, arg);
  return response.data;
};

export const useAcceptConsent = () => {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${BASE_URL}/v1/consent/accept`,
    process.env.EXPO_PUBLIC_FEATURE_MOCK_API === 'true'
      ? mockAcceptConsentFetcher
      : acceptConsentFetcher
  );

  return {
    acceptConsent: trigger,
    acceptConsentIsLoading: isMutating,
    acceptConsentData: data,
    acceptConsentError: error,
  };
};
