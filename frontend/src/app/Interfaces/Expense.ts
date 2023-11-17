interface ExpenseResponse {
  id: number;
  type: string;
  expenses_amount: number;
}

interface TotalExpenseResponse {
  status: number;
  message: string;
  error: boolean;
  data: number;
}

interface DeleteExpenseResponse {
  status: number;
  message: string;
  error: boolean;
}

export type { ExpenseResponse, DeleteExpenseResponse, TotalExpenseResponse };
