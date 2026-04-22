export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
}

export interface CreateTransactionBody {
  type: TransactionType;
  amount: number | string;
  category: string;
  date: string;
}

export interface ErrorResponse {
  error: string;
}
