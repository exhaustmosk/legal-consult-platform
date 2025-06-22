import { Link } from 'react-router-dom';
// import '../styles/theme';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2>Welcome back, Admin 👨‍⚖️</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>📨 Messages</h3>
          <p>24</p>
        </div>
        <div className="stat-card">
          <h3>📞 Scheduled Calls</h3>
          <p>10</p>
        </div>
        <div className="stat-card">
          <h3>💳 Transactions</h3>
          <p>₹4,950</p>
        </div>
      </div>

      <div className="admin-links">
        <Link to="/admin-messages" className="admin-link-button">View All Messages</Link>
        <Link to="/call-scheduler" className="admin-link-button">View Scheduled Calls</Link>
        <Link to="/transaction-history" className="admin-link-button">View Transactions</Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
