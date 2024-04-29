interface ExpenseResponse {
  _id: number;
  id: number;
  type: string;
  expenseAmount: number;
  expenseName: string;
  expenseDescription: string;
  expenseDate: string;
  incomeAmount: number;
  incomeDescription: string;
  incomeName: string;
  createdAt: string;
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
  type: string;
  expenseName: string;
  expenseDate: string;
  expenseDescription: string;
  handleDelete: (incomeId: string) => void;
}

export type { ExpenseResponse, ExpenseCard, TotalExpenseResponse };
