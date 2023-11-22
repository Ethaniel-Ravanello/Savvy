const incomeAmount = (incomeData: any) => {
  return (
    incomeData?.map((data: any) => data.incomeAmount || data.expenseAmount) ||
    []
  );
};

const totalIncome = (incomeData: number[]) => {
  return incomeData?.reduce((a, b) => a + b, 0);
};

export { incomeAmount, totalIncome };
