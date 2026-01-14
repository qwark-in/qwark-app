import useSWR from "swr";
import axios from "axios";
import { FIN_PROFILE_BASE_URL } from "data/api/user/constants";
import { mockFinProfileData } from "data/api/user/mockData";
import { FinancialProfileState } from "data/models/financial-profile";
import { useFinancialProfileStore } from "data/stores/financial-profile-store";
import { useToastController } from "@tamagui/toast";
import { FEATURE_MOCK_FIN_PROFILE_API } from "settings";

const getGetFinancialProfileDataFetcher = async (
  url: string
): Promise<FinancialProfileState> => {
  const response = await axios.get(url);
  return response.data;
};

const getMockGetFinancialProfileDataFetcher = async (
  _url: string
): Promise<FinancialProfileState> => {
  const response = {
    data: mockFinProfileData,
    status: 200,
    statusText: "OK",
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(response.data), 500);
  });
};

export const useGetFinancialProfileData = () => {
  const toast = useToastController();
  const setFinancialProfile = useFinancialProfileStore(
    (state) => state.setFinancialProfile
  );

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${FIN_PROFILE_BASE_URL}`,
    FEATURE_MOCK_FIN_PROFILE_API
      ? getMockGetFinancialProfileDataFetcher
      : getGetFinancialProfileDataFetcher,
    {
      onSuccess: (data) => {
        if (data) {
          setFinancialProfile(data);
        }
      },
      onError: (err) => {
        toast.show(err.message || "Error fetching financial profile ");
        console.error("❌ useGetFinancialProfileData Error:", err);
      },
    }
  );
  return {
    data,
    isLoading,
    isValidating,
    error,
    mutate,
  };
};
