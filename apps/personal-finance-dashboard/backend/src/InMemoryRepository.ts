import { TransactionRepository } from './repository';
import { Transaction, CreateTransactionBody } from './types';

let idCounter = 4;

const SEED: Transaction[] = [
  { id: '1', type: 'income',  amount: 5000, category: 'Salary',    date: '2023-01-01' },
  { id: '2', type: 'expense', amount: 1000, category: 'Rent',      date: '2023-01-02' },
  { id: '3', type: 'expense', amount: 500,  category: 'Groceries', date: '2023-01-03' },
];

export class InMemoryRepository implements TransactionRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = SEED.map(t => ({ ...t }));
  }

  async getAll(): Promise<Transaction[]> {
    return [...this.transactions];
  }

  async create(body: CreateTransactionBody): Promise<Transaction> {
    const transaction: Transaction = {
      id: String(idCounter++),
      type: body.type,
      amount: parseFloat(String(body.amount)),
      category: body.category,
      date: body.date,
    };
    this.transactions.push(transaction);
    return transaction;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.transactions.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.transactions.splice(index, 1);
    return true;
  }
}
