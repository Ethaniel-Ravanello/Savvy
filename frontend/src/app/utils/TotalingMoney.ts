interface Transaction {
  income_amount?: number;
  expense_amount?: number;
}

const incomeAmount = (incomeData: Transaction[] = []) => {
  return (
    incomeData?.map((data) => data.income_amount || data.expense_amount) || []
  );
};

const totalIncome = (incomeData: number[]) => {
  return incomeData?.reduce((a, b) => a + b, 0);
};

export { incomeAmount, totalIncome };
