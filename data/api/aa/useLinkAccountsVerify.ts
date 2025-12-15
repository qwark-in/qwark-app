import axios from './axios';
import useSWRMutation from 'swr/mutation';
import { BASE_URL } from './constants';
import { LinkAccountsVerifyQueryBody, LinkAccountsVerifyResponse } from './types';
import { mockLinkAccountsVerifyFetcher } from './mockFetchers';

const linkAccountsVerifyFetcher = async (
  url: string,
  { arg }: { arg: LinkAccountsVerifyQueryBody }
): Promise<LinkAccountsVerifyResponse> => {
  const response = await axios.post(url, arg);
  return response.data;
};

export const useLinkAccountsVerify = () => {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${BASE_URL}/v1/fip/link/verify`,
    process.env.EXPO_PUBLIC_FEATURE_MOCK_API === 'true'
      ? mockLinkAccountsVerifyFetcher
      : linkAccountsVerifyFetcher
  );

  return {
    linkAccountsVerify: trigger,
    linkAccountsVerifyIsLoading: isMutating,
    linkAccountsVerifyData: data,
    linkAccountsVerifyError: error,
  };
};
