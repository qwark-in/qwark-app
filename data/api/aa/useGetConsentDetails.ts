import axios from 'axios';
import useSWRMutation from 'swr/mutation';
import { BASE_URL } from './constants';
import { GetConsentDetailsQueryParams, GetConsentDetailsResponse } from './types';
import { mockGetConsentDetailsFetcher } from './mockFetchers';

const getConsentDetailsFetcher = async (
  url: string,
  { arg }: { arg: GetConsentDetailsQueryParams }
): Promise<GetConsentDetailsResponse> => {
  const response = await axios.get(url, { params: arg });
  return response.data;
};

export const useGetConsentDetails = () => {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${BASE_URL}/v1/consent`,
    process.env.EXPO_PUBLIC_FEATURE_MOCK_API === 'true'
      ? mockGetConsentDetailsFetcher
      : getConsentDetailsFetcher
  );

  return {
    getConsentDetails: trigger,
    getConsentDetailsIsLoading: isMutating,
    getConsentDetailsData: data,
    getConsentDetailsError: error,
  };
};
