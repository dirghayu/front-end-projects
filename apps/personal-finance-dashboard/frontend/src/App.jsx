import { useState, useEffect } from 'react'
import axios from 'axios'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'
import Charts from './Charts'
import './App.css'

function App() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/transactions')
      setTransactions(response.data)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTransaction = async (transaction) => {
    try {
      const response = await axios.post('http://localhost:3001/transactions', transaction)
      setTransactions([...transactions, response.data])
    } catch (error) {
      console.error('Error adding transaction:', error)
    }
  }

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/transactions/${id}`)
      setTransactions(transactions.filter(t => t.id !== id))
    } catch (error) {
      console.error('Error deleting transaction:', error)
    }
  }

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  const netBalance = totalIncome - totalExpenses

  if (loading) return <div>Loading...</div>

  return (
    <div className="app">
      <h1>Personal Finance Dashboard</h1>
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
  )
}

export default App
