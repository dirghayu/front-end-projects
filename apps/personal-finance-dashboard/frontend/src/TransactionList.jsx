function TransactionList({ transactions, onDelete }) {
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
  )
}

export default TransactionList