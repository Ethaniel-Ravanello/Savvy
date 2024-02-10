interface IncomeResponse {
  id: number;
  type: string;
  incomeAmount: number;
  incomeDescription: string;
  incomeName: string;
}

interface TotalIncomeResponse {
  status: number;
  message: string;
  error: boolean;
  data: number;
}

interface IncomeCard {
  _id: string;
  incomeAmount: string;
  type: string;
  incomeName: string;
  incomeDate: string;
  incomeDescription: string;
  handleDelete: (incomeId: string) => void;
}

interface DeleteIncomeResponse {
  status: number;
  message: string;
  error: boolean;
}

export type {
  IncomeResponse,
  DeleteIncomeResponse,
  TotalIncomeResponse,
  IncomeCard,
};
