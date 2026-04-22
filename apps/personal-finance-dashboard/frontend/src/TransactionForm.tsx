import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CreateTransactionBody } from './types';

interface TransactionFormProps {
  onAdd: (transaction: CreateTransactionBody) => void;
}

const INITIAL: CreateTransactionBody = { type: 'income', amount: '', category: '', date: '' };

function sixMonthsAgo(): Date {
  const d = new Date();
  d.setMonth(d.getMonth() - 6);
  d.setHours(0, 0, 0, 0);
  return d;
}

function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

function TransactionForm({ onAdd }: TransactionFormProps) {
  const [form, setForm] = useState<CreateTransactionBody>(INITIAL);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const minDate = sixMonthsAgo();
  const maxDate = new Date();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setForm(prev => ({ ...prev, date: date ? toDateString(date) : '' }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.amount || !form.category || !form.date) return;
    onAdd(form);
    setForm(INITIAL);
    setSelectedDate(null);
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
      <DatePicker
        id="date"
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={minDate}
        maxDate={maxDate}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
        required
      />

      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
