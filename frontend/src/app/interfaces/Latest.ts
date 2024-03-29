interface TransactionResponse {
  id: number;
  type: string;
  incomeAmount: number;
  expenseAmount: number;
  incomeName: string;
  incomeDescription: string;
  expenseName: string;
  expenseDescription: string;
}

interface HistoryResponse {
  _id: string;
  type: string;
  incomeName: string;
  expenseName: string;
  incomeAmount: number;
  expenseAmount: number;
  incomeDescription: string;
  expenseDescription: string;
  incomeDate: string;
  expenseDate: string;
}

export type { TransactionResponse, HistoryResponse };
