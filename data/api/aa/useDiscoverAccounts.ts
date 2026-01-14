import axios from "axios";
import useSWRMutation from "swr/mutation";
import { BASE_URL } from "./constants";
import { DiscoverAccountsQueryBody, DiscoverAccountsResponse } from "./types";
import { mockDiscoverAccountsFetcher } from "./mockFetchers";
import { FEATURE_MOCK_API } from "settings";

const discoverAccountsFetcher = async (
  url: string,
  { arg }: { arg: DiscoverAccountsQueryBody }
): Promise<DiscoverAccountsResponse> => {
  const response = await axios.post(url, arg);
  return response.data;
};

export const useDiscoverAccounts = () => {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${BASE_URL}/v1/fip/discover`,
    FEATURE_MOCK_API ? mockDiscoverAccountsFetcher : discoverAccountsFetcher,
    {
      populateCache: false, // No caching required for this
    }
  );

  return {
    discoverAccounts: trigger,
    discoverAccountsIsLoading: isMutating,
    discoverAccountsData: data,
    discoverAccountsError: error,
  };
};
