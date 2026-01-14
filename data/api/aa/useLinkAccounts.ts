import axios from "axios";
import useSWRMutation from "swr/mutation";
import { BASE_URL } from "./constants";
import { LinkAccountsQueryBody, LinkAccountsResponse } from "./types";
import { mockLinkAccountsFetcher } from "./mockFetchers";
import { FEATURE_MOCK_API } from "settings";

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
    FEATURE_MOCK_API ? mockLinkAccountsFetcher : linkAccountsFetcher
  );

  return {
    linkAccounts: trigger,
    linkAccountsIsLoading: isMutating,
    linkAccountsData: data,
    linkAccountsError: error,
  };
};
