import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import Charts from './Charts';
import { useTransactions } from './hooks/useTransactions';
import './App.css';

function App() {
  const { transactions, loading, error, clearError, addTransaction, deleteTransaction } = useTransactions();

  if (loading) return <div>Loading...</div>;

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="app">
      <h1>Personal Finance Dashboard</h1>
      {error && (
        <div className="error-banner" role="alert">
          {error}
          <button onClick={clearError} aria-label="Dismiss error">✕</button>
        </div>
      )}
      <div className="summary-cards">
        <div className="card">
          <h3>Total Income</h3>
          <p>${totalIncome.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Total Expenses</h3>
          <p>${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Net Balance</h3>
          <p>${netBalance.toFixed(2)}</p>
        </div>
      </div>
      <TransactionForm onAdd={addTransaction} />
      <TransactionList transactions={transactions} onDelete={deleteTransaction} />
      <Charts transactions={transactions} />
    </div>
  );
}

export default App;
