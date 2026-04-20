import { useState } from 'react'

function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({ type: 'income', amount: '', category: '', date: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.amount || !form.category || !form.date) return
    onAdd(form)
    setForm({ type: 'income', amount: '', category: '', date: '' })
  }

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
  )
}

export default TransactionForm