import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import { Transaction, CreateTransactionBody } from '../types';
import * as api from '../api/transactions';

interface UseTransactionsResult {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  clearError: () => void;
  addTransaction: (body: CreateTransactionBody) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

export function useTransactions(): UseTransactionsResult {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api
      .fetchAll()
      .then(data => {
        if (!cancelled) setTransactions(data);
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load transactions. Is the backend running?');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const addTransaction = useCallback(async (body: CreateTransactionBody) => {
    try {
      const created = await api.create(body);
      setTransactions(prev => [...prev, created]);
    } catch (err) {
      const msg = err instanceof AxiosError ? (err.response?.data?.error ?? 'Unknown error') : 'Unknown error';
      setError(`Failed to add transaction: ${msg}`);
    }
  }, []);

  const deleteTransaction = useCallback(async (id: string) => {
    try {
      await api.remove(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch {
      setError('Failed to delete transaction.');
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { transactions, loading, error, clearError, addTransaction, deleteTransaction };
}
