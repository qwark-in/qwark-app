import axios from "axios";
import { BASE_URL } from "./constants";
import useSWRMutation from "swr/mutation";
import { AcceptConsentQueryBody, AcceptConsentResponse } from "./types";
import { mockAcceptConsentFetcher } from "./mockFetchers";
import { FEATURE_MOCK_API } from "settings";

const acceptConsentFetcher = async (
  url: string,
  { arg }: { arg: AcceptConsentQueryBody }
): Promise<AcceptConsentResponse> => {
  console.log("Accept Consent Body -> ", arg);
  const response = await axios.post(url, arg);
  return response.data;
};

export const useAcceptConsent = () => {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${BASE_URL}/v1/consent/accept`,
    FEATURE_MOCK_API ? mockAcceptConsentFetcher : acceptConsentFetcher
  );

  return {
    acceptConsent: trigger,
    acceptConsentIsLoading: isMutating,
    acceptConsentData: data,
    acceptConsentError: error,
  };
};
