import express, { Request, Response } from 'express';
import { TransactionRepository } from '../repository/TransactionRepository';
import { Transaction, CreateTransactionBody, ErrorResponse } from '../types/Transaction';

export function createApp(repo: TransactionRepository) {
  const app = express();
  app.use(express.json());

  app.get('/transactions', async (_req: Request, res: Response) => {
    const transactions = await repo.getAll();
    res.json(transactions);
  });

  app.post(
    '/transactions',
    async (
      req: Request<Record<string, never>, Transaction | ErrorResponse, CreateTransactionBody>,
      res: Response
    ) => {
      const { type, amount, category, date } = req.body;
      if (!type || !amount || !category || !date) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
      const transaction = await repo.create({ type, amount, category, date });
      res.status(201).json(transaction);
    }
  );

  app.delete('/transactions/:id', async (req: Request<{ id: string }>, res: Response) => {
    const found = await repo.delete(req.params.id);
    if (!found) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }
    res.status(204).send();
  });

  return app;
}
