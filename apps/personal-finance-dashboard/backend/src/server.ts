import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

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
  amount: number | string;
  category: string;
  date: string;
}

let transactions: Transaction[] = [
  { id: 1, type: 'income', amount: 5000, category: 'Salary', date: '2023-01-01' },
  { id: 2, type: 'expense', amount: 1000, category: 'Rent', date: '2023-01-02' },
  { id: 3, type: 'expense', amount: 500, category: 'Groceries', date: '2023-01-03' },
];

app.get('/transactions', (_req: Request, res: Response) => {
  res.json(transactions);
});

app.post('/transactions', (req: Request<{}, Transaction, CreateTransactionBody>, res: Response) => {
  const { type, amount, category, date } = req.body;
  if (!type || !amount || !category || !date) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  const newTransaction: Transaction = {
    id: transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1,
    type,
    amount: parseFloat(String(amount)),
    category,
    date,
  };
  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

app.delete('/transactions/:id', (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id);
  const index = transactions.findIndex(t => t.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Transaction not found' });
    return;
  }
  transactions.splice(index, 1);
  res.status(204).send();
});

// Exported for testing
export { transactions, app };

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
