import axios from "axios";
import useSWR from "swr";
import { BASE_URL } from "./constants";
import { useDashboardStore } from "data/stores/dashboard-store";
import { DashboardState } from "data/models/dashboard";
import { MarketState } from "data/models/market";
import { useMarketStore } from "data/stores/market-store";

const getDashboardDataFetcher = async (
  url: string
): Promise<DashboardState> => {
  const response = await axios.get(url);
  return response.data;
};

export const useGetDashboardData = () => {
  const setNetworth = useDashboardStore((state) => state.setNetworth);
  const setCashflow = useDashboardStore((state) => state.setCashflow);
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${BASE_URL}/dashboard`,
    getDashboardDataFetcher,
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

export const useGetMarketData = () => {
  const setEqHoldings = useMarketStore((store) => store.setEqHoldings);
  const setMfHoldings = useMarketStore((store) => store.setMfHoldings);

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${BASE_URL}/market`,
    getMarketDataFetcher,
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
