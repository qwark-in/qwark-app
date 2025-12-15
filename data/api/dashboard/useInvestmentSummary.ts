import { useDashboardStore } from '@/data/stores/dashboard-store';
import useSWR from 'swr';
import axios from 'axios';
import { supabase } from '../supabase';
import { InvestmentSummaryState } from '@/data/models/dashboard';

// const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// Custom fetcher that mimics the SWR key-driven approach
const fetcher = async (key: string): Promise<InvestmentSummaryState> => {
  const { data, error } = await supabase
    .from('investmentSummary') // table name
    .select('*')
    .limit(1)
    .single(); // or .then(d => d[0]) if not using .single()

  if (error) throw error;
  return data;
};

export const useInvestmentSummary = () => {
  const investmentSummary = useDashboardStore((store) => store.investmentSummary);
  const setInvestmentSummary = useDashboardStore((store) => store.setInvestmentSummary);

  const { data, error, isLoading, isValidating, mutate } = useSWR<InvestmentSummaryState>(
    'investmentSummary',
    fetcher,
    {
      revalidateOnFocus: false,
      fallbackData: investmentSummary ?? undefined,
      onSuccess: (data) => {
        setInvestmentSummary(data); // Update Zustand store with fetched data
      },
    }
  );

  return {
    investmentSummary: data,
    mutate,
    isLoading,
    isValidating,
    isError: !!error,
  };
};
