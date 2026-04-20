import { Transaction } from './types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: number) => void;
}

function TransactionList({ transactions, onDelete }: TransactionListProps) {
  return (
    <div className="transaction-list">
      <h2>Transactions</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id} className="transaction-item">
            <span>{transaction.type}</span>
            <span>${transaction.amount}</span>
            <span>{transaction.category}</span>
            <span>{transaction.date}</span>
            <button onClick={() => onDelete(transaction.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
