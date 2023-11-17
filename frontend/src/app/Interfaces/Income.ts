interface IncomeResponse {
  status: number;
  message: string;
  error: boolean;
  data: {
    _id: string;
    userId: string;
    type: string;
    income_name: string;
    income_description: string;
    income_date: string;
    income_amount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
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
