interface IncomeResponse {
  id: number;
  type: string;
  income_amount: number;
}

interface TotalIncomeResponse {
  status: number;
  message: string;
  error: boolean;
  data: number;
}

interface DeleteIncomeResponse {
  status: number;
  message: string;
  error: boolean;
}

export type { IncomeResponse, DeleteIncomeResponse, TotalIncomeResponse };
