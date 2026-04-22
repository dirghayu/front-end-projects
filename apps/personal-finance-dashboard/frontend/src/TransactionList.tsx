import { Transaction } from './types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

function TransactionList({ transactions, onDelete }: TransactionListProps) {
  return (
    <div className="transaction-list">
      <h2>Transactions</h2>
      {transactions.length === 0 ? (
        <p className="empty-state">No transactions yet. Add one above.</p>
      ) : (
        <ul>
          {transactions.map(transaction => (
            <li key={transaction.id} className="transaction-item">
              <span className={`type type--${transaction.type}`}>{transaction.type}</span>
              <span>${transaction.amount.toFixed(2)}</span>
              <span>{transaction.category}</span>
              <span>{transaction.date}</span>
              <button onClick={() => onDelete(transaction.id)} aria-label={`Delete ${transaction.category} transaction`}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;
