import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PaymentPage from './pages/PaymentPage';
import MessageForm from './pages/MessageForm';
import LoginPage from './pages/LoginPage';
import AdminMessages from './pages/AdminMessages';

import './styles/theme.css';

function App() {
  const [user, setUser] = useState(null); // null | { type: 'user' | 'admin', email }
  const navigate = useNavigate();

  // Auto-login simulation (e.g. if needed from localStorage later)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('authUser'));
    if (saved) setUser(saved);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="app-wrapper">
      <header className="top-strip">
        <h1>Legal Consultation</h1>
      </header>

      <nav className="main-nav">
  {!user ? (
    <>
      <Link to="/user-login">User Login</Link>
      <Link to="/admin-login">Admin Login</Link>
    </>
  ) : (
    <div className="profile-menu">
      <span>{user.type === 'admin' ? '👨‍⚖️ Admin' : '👤 User'}: {user.email}</span>
      <div className="dropdown">
        {user.type === 'user' && (
          <>
            <Link to="/user-dashboard">Dashboard</Link>
            <Link to="/payment">Payment History</Link>
          </>
        )}
        {user.type === 'admin' && (
          <>
            <Link to="/admin-dashboard">Dashboard</Link>
            <Link to="/admin-messages">View Messages</Link>
          </>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )}
</nav>


      <main className="main-content">
        <Routes>
          <Route path="/admin-messages" element={<AdminMessages />} />
          <Route path="/user-login" element={<LoginPage type="user" setUser={setUser} />} />
          <Route path="/admin-login" element={<LoginPage type="admin" setUser={setUser} />} />
          <Route path="/message-form" element={<MessageForm />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
