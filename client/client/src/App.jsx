import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PaymentPage from './pages/PaymentPage';
import MessageForm from './pages/MessageForm';
import LoginPage from './pages/LoginPage';
import AdminMessages from './pages/AdminMessages';
import TransactionHistory from './pages/TransactionHistory';
import CallScheduleForm from './pages/CallScheduleForm';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import PrivateRoute from './components/PrivateRoute';
import AdminCalls from './pages/AdminCalls';
import logo from './assets/logo.png';
import UserProfile from './pages/UserProfile';

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
        <img
          src={logo}
          alt="Legal Consultation Logo"
          className="logo-img"
          onClick={() => navigate('/')}
        />

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
                  <Link to="/user-profile">Profile</Link>
                    <Link to="/user-dashboard">Booking</Link>
                    
                  </>
                )}
                {user.type === 'admin' && (
                  <>
                    <Link to="/admin-dashboard">Dashboard</Link>
                    <Link to="/admin-messages">View Messages</Link>
                    <Link to="/admin-calls">View Calls</Link>
                  </>
                )}
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Nav bar for logged-in user */}
      {user?.type === 'user' && (
        <nav className="main-nav user-tabs">
          <Link to="/">Home Page</Link>
          <Link to="/user-dashboard">Bookings</Link>
          <Link to="/transaction-history">Transactions</Link>
        </nav>
      )}

      {/* Nav bar for not logged-in users */}
      {!user && (
        <nav className="main-nav">
          <Link to="/user-login">User Login</Link>
          <Link to="/admin-login">Admin Login</Link>
        </nav>
      )}

      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user-login" element={<LoginPage type="user" setUser={setUser} />} />
          <Route path="/admin-login" element={<LoginPage type="admin" setUser={setUser} />} />
          <Route path="/login/user" element={<LoginPage type="user" setUser={setUser} />} />

          {/* Protected Routes */}
          <Route
            path="/user-dashboard"
            element={
              <PrivateRoute allowedType="user">
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <PrivateRoute allowedType="user">
                <UserProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute allowedType="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <PrivateRoute allowedType="user">
                <PaymentPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/message-form"
            element={
              <PrivateRoute allowedType="user">
                <MessageForm user={user} />
              </PrivateRoute>
            }
          />
          <Route path="/call-scheduler" element={
  <PrivateRoute allowedType="user">
    <CallScheduleForm />
  </PrivateRoute>
} />

          <Route
            path="/transaction-history"
            element={
              <PrivateRoute allowedType="user">
                <TransactionHistory />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-messages"
            element={
              <PrivateRoute allowedType="admin">
                <AdminMessages />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-calls"
            element={
              <PrivateRoute allowedType="admin">
                <AdminCalls />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
