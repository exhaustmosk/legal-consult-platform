import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/theme.css';

function LoginPage({ type, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password, type })
      });

      const data = await res.json();

      if (data.success) {
       const loggedInUser = data.user;
       if (setUser) setUser(loggedInUser);
            
       // ✅ Store entire user object
       localStorage.setItem('authUser', JSON.stringify(loggedInUser));
            
       // ✅ Also store just the user email (for Razorpay, etc.)
       localStorage.setItem('userEmail', loggedInUser.email);
            
       navigate(type === 'admin' ? '/admin-dashboard' : '/user-dashboard');
      }
 else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">{type === 'admin' ? 'Admin Login' : 'User Login'}</h2>

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="login-input"
          />

          <button onClick={handleLogin} className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {error && <p className="login-error">{error}</p>}

          {type === 'user' && (
            <p className="register-link">
              Don't have an account? <Link to="/register">Create a new account</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
