import { useState } from 'react';
import { CreateTransactionBody } from './types';

interface TransactionFormProps {
  onAdd: (transaction: CreateTransactionBody) => void;
}

function TransactionForm({ onAdd }: TransactionFormProps) {
  const [form, setForm] = useState<CreateTransactionBody>({
    type: 'income',
    amount: '',
    category: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.amount || !form.category || !form.date) return;
    onAdd(form);
    setForm({ type: 'income', amount: '', category: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h2>Add Transaction</h2>
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
