import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/theme.css';
import '../styles/transactionHistory.css';

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      const user = JSON.parse(localStorage.getItem('authUser'));
      if (!user || !user.email) {
        setError('User not found.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/transactions?email=${user.email}`);
        setTransactions(res.data.transactions || []);
      } catch (err) {
        setError('Failed to load transactions.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h2>🧾 Your Transaction History</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && transactions.length === 0 && <p>No transactions yet.</p>}

      {!loading && transactions.length > 0 && (
        <table className="history-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Payment ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, idx) => (
              <tr key={txn.paymentId}>
                <td>{idx + 1}</td>
                <td>{txn.type === 'message' ? 'Message' : 'Call'}</td>
                <td>₹{txn.amount}</td>
                <td>{txn.paymentId}</td>
                <td>{new Date(txn.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionHistory;
