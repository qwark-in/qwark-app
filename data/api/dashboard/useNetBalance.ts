import { useDashboardStore } from '@/data/stores/dashboard-store';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import axios from 'axios';
import { CashFlow } from '@/data/models/dashboard';
import { supabase } from '../supabase';

// const fetcher = (url: string): Promise<CashFlow[]> => axios.get(url).then((res) => res.data);

const supabaseFetcher = async (key: string): Promise<CashFlow[]> => {
  const { data, error } = await supabase
    .from('netBalance') // table name
    .select('*');

  if (error) throw error;
  return data;
};

export const useNetBalance = () => {
  const cashflow = useDashboardStore((store) => store.cashflow);
  const setCashflow = useDashboardStore((store) => store.setCashflow);

  const { data, error, isLoading, isValidating, mutate } = useSWR('cashflow', supabaseFetcher, {
    fallbackData: cashflow ?? undefined,
    onSuccess: (data) => {
      setCashflow(data); // Update Zustand store with fetched data
    },
  });

  return {
    cashflow: data,
    mutate,
    isLoading,
    isValidating,
    isError: !!error,
  };
};
