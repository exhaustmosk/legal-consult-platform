import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PaymentPage from './pages/PaymentPage';
import MessageForm from './pages/MessageForm';
import LoginPage from './pages/LoginPage';
import AdminMessages from './pages/AdminMessages';
import TransactionHistory from './pages/Transactionhistory';
import CallScheduleForm from './pages/CallScheduleForm';
import HomePage from './pages/HomePage';

import './styles/theme.css';

function App() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('authUser'));
    if (saved) setUser(saved);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

        {user && (
          <div className="profile-wrapper" ref={dropdownRef}>
            <div
              className="profile-avatar"
              onClick={() => setShowDropdown(prev => !prev)}
            >
              {user.email.charAt(0).toUpperCase()}
            </div>
            {showDropdown && (
              <div className="profile-dropdown">
                {user.type === 'user' && (
                  <>
                    <Link to="/user-dashboard">Dashboard</Link>
                    <Link to="/payment">Payment History</Link>
                    <Link to="/transaction-history">Transactions</Link>
                    <Link to="/message-form">Messages</Link>
                    <Link to="/call-scheduler">Schedule Call</Link>
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
            )}
          </div>
        )}
      </header>

      {user?.type === 'user' && (
        <nav className="main-nav user-tabs">
          <Link to="/">Home Page</Link>
          <Link to="/user-dashboard">Bookings</Link>
          <Link to="/transaction-history">Transactions</Link>
          <Link to="/message-form">Messages</Link>
          <Link to="/call-scheduler">Call</Link>
        </nav>
      )}

      {!user && (
        <nav className="main-nav">
          <Link to="/user-login">User Login</Link>
          <Link to="/admin-login">Admin Login</Link>
        </nav>
      )}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user-login" element={<LoginPage type="user" setUser={setUser} />} />
          <Route path="/admin-login" element={<LoginPage type="admin" setUser={setUser} />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/message-form" element={<MessageForm />} />
          <Route path="/admin-messages" element={<AdminMessages />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/call-scheduler" element={<CallScheduleForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
