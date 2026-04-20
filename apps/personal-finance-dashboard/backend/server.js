const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// In-memory store for transactions
let transactions = [
  { id: 1, type: 'income', amount: 5000, category: 'Salary', date: '2023-01-01' },
  { id: 2, type: 'expense', amount: 1000, category: 'Rent', date: '2023-01-02' },
  { id: 3, type: 'expense', amount: 500, category: 'Groceries', date: '2023-01-03' },
];

// GET /transactions - list all transactions
app.get('/transactions', (req, res) => {
  res.json(transactions);
});

// POST /transactions - add new transaction
app.post('/transactions', (req, res) => {
  const { type, amount, category, date } = req.body;
  if (!type || !amount || !category || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newTransaction = {
    id: transactions.length + 1,
    type,
    amount: parseFloat(amount),
    category,
    date,
  };
  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

// DELETE /transactions/:id - remove transaction
app.delete('/transactions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = transactions.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  transactions.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});