import { renderHook, act, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useTransactions } from '../hooks/useTransactions';
import * as api from '../api/transactions';
import { Transaction } from '../types';

vi.mock('../api/transactions');

const SEED: Transaction[] = [
  { id: '1', type: 'income', amount: 5000, category: 'Salary', date: '2024-01-01' },
  { id: '2', type: 'expense', amount: 1000, category: 'Rent', date: '2024-01-02' },
];

beforeEach(() => {
  vi.mocked(api.fetchAll).mockResolvedValue(SEED);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('useTransactions', () => {
  it('fetches transactions on mount', async () => {
    const { result } = renderHook(() => useTransactions());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.transactions).toEqual(SEED);
    expect(result.current.error).toBeNull();
  });

  it('sets error when fetchAll fails', async () => {
    vi.mocked(api.fetchAll).mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useTransactions());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/failed to load/i);
    expect(result.current.transactions).toEqual([]);
  });

  it('adds a new transaction', async () => {
    const newTx: Transaction = { id: '3', type: 'income', amount: 200, category: 'Freelance', date: '2024-02-01' };
    vi.mocked(api.create).mockResolvedValue(newTx);

    const { result } = renderHook(() => useTransactions());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.addTransaction({ type: 'income', amount: '200', category: 'Freelance', date: '2024-02-01' });
    });

    expect(result.current.transactions).toHaveLength(3);
    expect(result.current.transactions[2]).toEqual(newTx);
  });

  it('sets error when addTransaction fails', async () => {
    vi.mocked(api.create).mockRejectedValue(new Error('Server error'));

    const { result } = renderHook(() => useTransactions());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.addTransaction({ type: 'expense', amount: '50', category: 'Food', date: '2024-02-01' });
    });

    expect(result.current.error).toMatch(/failed to add/i);
  });

  it('removes a transaction by id', async () => {
    vi.mocked(api.remove).mockResolvedValue(undefined);

    const { result } = renderHook(() => useTransactions());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.deleteTransaction('1');
    });

    expect(result.current.transactions).toHaveLength(1);
    expect(result.current.transactions[0].id).toBe('2');
  });

  it('sets error when deleteTransaction fails', async () => {
    vi.mocked(api.remove).mockRejectedValue(new Error('Delete failed'));

    const { result } = renderHook(() => useTransactions());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.deleteTransaction('1');
    });

    expect(result.current.error).toMatch(/failed to delete/i);
  });

  it('clears error via clearError', async () => {
    vi.mocked(api.fetchAll).mockRejectedValue(new Error('error'));

    const { result } = renderHook(() => useTransactions());
    await waitFor(() => expect(result.current.error).not.toBeNull());

    act(() => result.current.clearError());

    expect(result.current.error).toBeNull();
  });
});
