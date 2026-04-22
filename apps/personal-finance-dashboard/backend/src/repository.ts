import { Transaction, CreateTransactionBody } from './types';

export interface TransactionRepository {
  getAll(): Promise<Transaction[]>;
  create(body: CreateTransactionBody): Promise<Transaction>;
  delete(id: string): Promise<boolean>;
}
