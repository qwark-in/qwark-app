import axios from "axios";
import useSWRMutation from "swr/mutation";
import { BASE_URL } from "./constants";
import { FIUInitQueryBody, FIUInitResponse } from "./types";
import { mockFiuInitFetcher } from "./mockFetchers";
import { FEATURE_MOCK_API } from "settings";

const fiuInitFetcher = async (
  url: string,
  { arg }: { arg: FIUInitQueryBody }
): Promise<FIUInitResponse> => {
  try {
    const response = await axios.post(url, arg);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to initialize FIU");
  }
};

export const useFIUInit = () => {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${BASE_URL}/v1/init`,
    FEATURE_MOCK_API ? mockFiuInitFetcher : fiuInitFetcher
  );

  return {
    fiuInit: trigger, // function to call with query body
    fiuInitIsLoading: isMutating,
    fiuInitData: data,
    fiuInitError: error,
  };
};
