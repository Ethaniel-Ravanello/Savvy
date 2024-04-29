import useSWR, { mutate } from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export function useGetTransaction(userId: string | null, isExpired: boolean) {
  const canIFetch = userId && isExpired !== null;

  const { data, error, isLoading } = useSWR(
    canIFetch ? `http://localhost:5000/latestTransaction/${userId}` : null,
    fetcher
  );

  return {
    historyTransaction: data,
    isLoadingHistory: isLoading,
    errorHistory: error,
  };
}

export function useGetIncome(userId: string | null, isExpired: boolean) {
  const canIFetch = userId && isExpired !== null;

  const { data, error, isLoading } = useSWR(
    canIFetch ? `http://localhost:5000/income/${userId}` : null,
    fetcher
  );

  return {
    income: data,
    errorIncome: error,
    isLoadingIncome: isLoading,
    mutateIncome: () => mutate(`http://localhost:5000/income/${userId}`),
  };
}

export function useGetTopIncome(userId: string | null, isExpired: boolean) {
  const canIFetch = userId && isExpired !== null;

  const { data, error, isLoading } = useSWR(
    canIFetch ? `http://localhost:5000/topIncome/${userId}` : null,
    fetcher
  );

  return {
    topIncome: data,
    errorTopIncome: error,
    topIncomeLoading: isLoading,
    mutateTopIncome: () => mutate(`http://localhost:5000/topIncome/${userId}`),
  };
}

export function useGetExpense(userId: string | null, isExpired: boolean) {
  const canIFetch = userId && isExpired !== null;

  const { data, error, isLoading } = useSWR(
    canIFetch ? `http://localhost:5000/expense/${userId}` : null,
    fetcher
  );

  return {
    expense: data,
    errorExpense: error,
    isLoadingExpense: isLoading,
    mutateData: () => mutate(`http://localhost:5000/expense/${userId}`),
  };
}

export function useGetTopExpense(userId: string | null, isExpired: boolean) {
  const canIFetch = userId && isExpired !== null;

  const { data, error, isLoading } = useSWR(
    canIFetch ? `http://localhost:5000/topExpense/${userId}` : null,
    fetcher
  );

  return {
    topExpense: data,
    errorTopExpense: error,
    isLoadingTopExpense: isLoading,
    mutateDataTop: () => mutate(`http://localhost:5000/topExpense/${userId}`),
  };
}
