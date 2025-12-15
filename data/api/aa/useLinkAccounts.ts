import axios from './axios';
import useSWRMutation from 'swr/mutation';
import { BASE_URL } from './constants';
import { LinkAccountsQueryBody, LinkAccountsResponse } from './types';
import { mockLinkAccountsFetcher } from './mockFetchers';

const linkAccountsFetcher = async (
  url: string,
  { arg }: { arg: LinkAccountsQueryBody }
): Promise<LinkAccountsResponse> => {
  const response = await axios.post(url, arg);
  return response.data;
};

export const useLinkAccounts = () => {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${BASE_URL}/v1/fip/link`,
    process.env.EXPO_PUBLIC_FEATURE_MOCK_API === 'true'
      ? mockLinkAccountsFetcher
      : linkAccountsFetcher
  );

  return {
    linkAccounts: trigger,
    linkAccountsIsLoading: isMutating,
    linkAccountsData: data,
    linkAccountsError: error,
  };
};
