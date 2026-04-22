import { useState } from 'react';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import Charts from './Charts';
import { useTransactions } from './hooks/useTransactions';
import './App.css';

type Tab = 'overview' | 'history' | 'charts';

function App() {
  const { transactions, loading, error, clearError, addTransaction, deleteTransaction } = useTransactions();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [showModal, setShowModal] = useState(false);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  const handleAdd = async (body: Parameters<typeof addTransaction>[0]) => {
    await addTransaction(body);
    setShowModal(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Finance Dashboard</h1>
      </header>

      {error && (
        <div className="error-banner" role="alert">
          {error}
          <button onClick={clearError} aria-label="Dismiss error">✕</button>
        </div>
      )}

      <nav className="tabs">
        {(['overview', 'history', 'charts'] as Tab[]).map(tab => (
          <button
            key={tab}
            className={`tab-btn${activeTab === tab ? ' tab-btn--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      <main className="content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : activeTab === 'overview' ? (
          <div className="overview">
            <div className="summary-cards">
              <div className="card card--income">
                <p className="card-label">Total Income</p>
                <p className="card-value">${totalIncome.toFixed(2)}</p>
              </div>
              <div className="card card--expense">
                <p className="card-label">Total Expenses</p>
                <p className="card-value">${totalExpenses.toFixed(2)}</p>
              </div>
              <div className={`card card--balance ${netBalance >= 0 ? 'card--positive' : 'card--negative'}`}>
                <p className="card-label">Net Balance</p>
                <p className="card-value">${netBalance.toFixed(2)}</p>
              </div>
            </div>
            <div className="overview-hint">
              <p>{transactions.length} transaction{transactions.length !== 1 ? 's' : ''} recorded</p>
              <button className="link-btn" onClick={() => setActiveTab('history')}>View history →</button>
            </div>
          </div>
        ) : activeTab === 'history' ? (
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        ) : (
          <Charts transactions={transactions} />
        )}
      </main>

      <button className="fab" onClick={() => setShowModal(true)} aria-label="Add transaction">
        +
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close">✕</button>
            <TransactionForm onAdd={handleAdd} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
