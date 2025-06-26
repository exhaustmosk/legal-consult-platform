import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/theme.css'; // if needed
import BASE_URL from '../config';

function AdminDashboard() {
  const [stats, setStats] = useState({
    messages: 0,
    calls: 0,
    totalAmount: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [msgRes, callRes, txnRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/messages`),
          axios.get(`${BASE_URL}/api/admin/calls`),
          axios.get(`${BASE_URL}/api/payments`),
        ]);

        const messages = msgRes.data.messages?.length || 0;
        const calls = callRes.data.calls?.length || 0;
        const totalAmount = txnRes.data.payments?.reduce((sum, tx) => sum + tx.amount, 0) || 0;

        setStats({ messages, calls, totalAmount });
        setLoading(false);
      } catch (err) {
        console.error('❌ Failed to fetch admin stats:', err);
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Welcome back, Admin 👨‍⚖️</h2>

      {loading ? (
        <p>Loading dashboard data...</p>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>📨 Messages</h3>
              <p>{stats.messages}</p>
            </div>
            <div className="stat-card">
              <h3>📞 Scheduled Calls</h3>
              <p>{stats.calls}</p>
            </div>
            <div className="stat-card">
              <h3>💳 Transactions</h3>
              <p>₹{stats.totalAmount}</p>
            </div>
          </div>

          <div className="admin-links">
            <Link to="/admin-messages" className="admin-link-button">View All Messages</Link>
            <Link to="/admin-calls" className="admin-link-button">View Scheduled Calls</Link>
            <Link to="/transaction-history" className="admin-link-button">View Transactions</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
