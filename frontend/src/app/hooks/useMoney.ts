export const incomeAmount = (incomeData: any) => {
  return (
    incomeData?.map((data: any) => data.incomeAmount || data.expenseAmount) ||
    []
  );
};

export const totalIncome = (incomeData: number[]) => {
  return incomeData?.reduce((a, b) => a + b, 0);
};
