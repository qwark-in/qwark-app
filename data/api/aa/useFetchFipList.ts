import { BASE_URL } from "./constants";
import useSWR from "swr";
import axios from "axios";
import { FetchFipListResponse } from "./types";
import { mockFipListFetcher } from "./mockFetchers";
import { useAAStore } from "data/stores/aa-store";

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const useFetchFipList = () => {
  const setFips = useAAStore((store) => store.setFips);
  const selectMultipleFips = useAAStore((store) => store.selectMultipleFips);
  const selectedEntities = useAAStore((store) => store.selectedEntities);
  const FIP_LIST_KEY = `${BASE_URL}/v1/fips`;
  const { data, error, isLoading, isValidating } = useSWR<
    FetchFipListResponse,
    Error
  >(
    FIP_LIST_KEY,
    process.env.EXPO_PUBLIC_FEATURE_MOCK_API === "true"
      ? mockFipListFetcher
      : fetcher,
    {
      onSuccess: ({ data }) => {
        setFips(
          data.fips
            .slice()
            .sort((a, b) =>
              a.fip_name.toLowerCase().localeCompare(b.fip_name.toLowerCase())
            )
        );
        selectMultipleFips(
          data.fips
            .filter(
              (fip) =>
                fip.asset_class_id !== "BANK" &&
                selectedEntities.includes(fip.asset_class_id)
            )
            .map((fip) => ({
              fip_id: fip.fip_id,
              fip_name: fip.fip_name,
              asset_class_id: fip.asset_class_id,
            }))
        );
      },
    }
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
  };
};
