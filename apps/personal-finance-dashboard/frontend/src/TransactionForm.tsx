import { useState } from 'react';
import { CreateTransactionBody } from './types';

interface TransactionFormProps {
  onAdd: (transaction: CreateTransactionBody) => void;
}

const INITIAL: CreateTransactionBody = { type: 'income', amount: '', category: '', date: '' };

function TransactionForm({ onAdd }: TransactionFormProps) {
  const [form, setForm] = useState<CreateTransactionBody>(INITIAL);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.amount || !form.category || !form.date) return;
    onAdd(form);
    setForm(INITIAL);
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h2>Add Transaction</h2>

      <label htmlFor="type">Type</label>
      <select id="type" name="type" value={form.type} onChange={handleChange}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <label htmlFor="amount">Amount</label>
      <input
        id="amount"
        type="number"
        name="amount"
        placeholder="0.00"
        min="0.01"
        step="0.01"
        value={form.amount}
        onChange={handleChange}
        required
      />

      <label htmlFor="category">Category</label>
      <input
        id="category"
        type="text"
        name="category"
        placeholder="e.g. Salary, Rent"
        value={form.category}
        onChange={handleChange}
        required
      />

      <label htmlFor="date">Date</label>
      <input
        id="date"
        type="text"
        name="date"
        placeholder="YYYY-MM-DD"
        pattern="\d{4}-\d{2}-\d{2}"
        value={form.date}
        onChange={handleChange}
        required
      />

      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
