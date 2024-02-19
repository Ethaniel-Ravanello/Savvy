import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export function useGetIncome(userId: string | null) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/income/${userId}`,
    fetcher
  );

  const totalIncome = data?.data?.reduce(
    (total: any, data: any) => total + data.incomeAmount,
    0
  );

  return {
    income: data,
    totalIncome: totalIncome,
    errorIncome: error,
    isLoadingIncome: isLoading,
  };
}

export function useGetExpense(userId: string | null) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/expense/${userId}`,
    fetcher
  );

  const totalExpense = data?.data?.reduce(
    (total: any, data: any) => total + data.expenseAmount,
    0
  );

  return {
    expense: data,
    totalExpense: totalExpense,
    errorExpense: error,
    isLoadingExpense: isLoading,
  };
}
