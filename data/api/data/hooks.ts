import axios from "axios";
import useSWR from "swr";
import { BASE_URL } from "./constants";
import { useDashboardStore } from "data/stores/dashboard-store";
import { DashboardState } from "data/models/dashboard";
import { MarketState } from "data/models/market";
import { useMarketStore } from "data/stores/market-store";
import { mockMarketData, mockDashboardData } from "./mockData";

const IS_MOCK_DATA_API = process.env.EXPO_PUBLIC_FEATURE_MOCK_DATA_API === "true";

const getDashboardDataFetcher = async (url: string): Promise<DashboardState> => {
  const response = await axios.get(url);
  return response.data;
};
const getMockDashboardDataFetcher = async (_url: string): Promise<DashboardState> => {
  const response = {
    data: mockDashboardData,
    status: 200,
    statusText: "OK",
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(response.data), 500);
  });
};

export const useGetDashboardData = () => {
  const setNetworth = useDashboardStore((state) => state.setNetworth);
  const setCashflow = useDashboardStore((state) => state.setCashflow);
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${BASE_URL}/dashboard`,
    IS_MOCK_DATA_API ? getMockDashboardDataFetcher : getDashboardDataFetcher,
    {
      onSuccess: (data) => {
        if (data.cashflow) {
          setCashflow(data.cashflow);
        }
        if (data.networth) {
          setNetworth(data.networth);
        }
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

const getMarketDataFetcher = async (url: string): Promise<MarketState> => {
  const response = await axios.get(url);
  return response.data;
};

const getMockMarketDataFetcher = async (_url: string): Promise<MarketState> => {
  const response = {
    data: mockMarketData,
    status: 200,
    statusText: "OK",
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(response.data), 500);
  });
};

export const useGetMarketData = () => {
  const setEqHoldings = useMarketStore((store) => store.setEqHoldings);
  const setMfHoldings = useMarketStore((store) => store.setMfHoldings);

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${BASE_URL}/market`,
    IS_MOCK_DATA_API ? getMockMarketDataFetcher : getMarketDataFetcher,
    {
      onSuccess: (data) => {
        if (data.eqHoldings) {
          setEqHoldings(data.eqHoldings);
        }
        if (data.mfHoldings) {
          setMfHoldings(data.mfHoldings);
        }
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
