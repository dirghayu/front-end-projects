import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import TransactionList from '../TransactionList';
import { Transaction } from '../types';

const onDelete = vi.fn();

const TRANSACTIONS: Transaction[] = [
  { id: '1', type: 'income', amount: 5000, category: 'Salary', date: '2024-01-01' },
  { id: '2', type: 'expense', amount: 1200.5, category: 'Rent', date: '2024-01-02' },
];

beforeEach(() => {
  onDelete.mockClear();
});

describe('TransactionList', () => {
  it('renders an empty state message when there are no transactions', () => {
    render(<TransactionList transactions={[]} onDelete={onDelete} />);

    expect(screen.getByText(/no transactions yet/i)).toBeInTheDocument();
  });

  it('renders all transactions', () => {
    render(<TransactionList transactions={TRANSACTIONS} onDelete={onDelete} />);

    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Rent')).toBeInTheDocument();
  });

  it('formats amounts to two decimal places', () => {
    render(<TransactionList transactions={TRANSACTIONS} onDelete={onDelete} />);

    expect(screen.getByText('$5000.00')).toBeInTheDocument();
    expect(screen.getByText('$1200.50')).toBeInTheDocument();
  });

  it('calls onDelete with the correct id when delete is clicked', async () => {
    const user = userEvent.setup();
    render(<TransactionList transactions={TRANSACTIONS} onDelete={onDelete} />);

    await user.click(screen.getByRole('button', { name: /delete salary/i }));

    expect(onDelete).toHaveBeenCalledOnce();
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('does not render the empty state when transactions exist', () => {
    render(<TransactionList transactions={TRANSACTIONS} onDelete={onDelete} />);

    expect(screen.queryByText(/no transactions yet/i)).not.toBeInTheDocument();
  });
});
