interface ExpenseResponse {
  id: number;
  type: string;
  expenseAmount: number;
}

interface TotalExpenseResponse {
  status: number;
  message: string;
  error: boolean;
  data: number;
}

interface ExpenseCard {
  _id: string;
  expenseAmount: string;
  expenseName: string;
  expenseDate: string;
  expenseDescription: string;
  handleDelete: (incomeId: string) => void;
}

export type { ExpenseResponse, ExpenseCard, TotalExpenseResponse };
