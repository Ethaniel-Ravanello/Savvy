interface ExpenseResponse {
  status: number;
  message: string;
  error: boolean;
  data: {
    _id: string;
    userId: string;
    type: string;
    expenses_name: string;
    expenses_description: string;
    expense_date: string;
    expenses_amount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
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
