export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
}

export interface CreateTransactionBody {
  type: TransactionType;
  amount: string;
  category: string;
  date: string;
}
