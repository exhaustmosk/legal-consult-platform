// src/pages/TransactionHistory.jsx
import { useEffect, useState } from 'react'
import '../styles/theme.css'

const mockTransactions = [
  { id: 1, type: 'Message', amount: 49, date: '2025-06-01' },
  { id: 2, type: 'Call', amount: 99, date: '2025-06-03' },
  { id: 3, type: 'Message', amount: 49, date: '2025-06-05' }
]

function TransactionHistory() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    // Simulate API fetch
    setTransactions(mockTransactions)
  }, [])

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-heading">Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Amount (₹)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.type}</td>
                <td>{t.amount}</td>
                <td>{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TransactionHistory
