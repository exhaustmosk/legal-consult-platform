import { useState } from 'react';
import { users } from '../mockUsers';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';

function LoginPage({ type, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const found = users.find(
      u => u.type === type && u.email === email && u.password === password
    );
    if (found) {
      const loggedInUser = { type, email };
      setUser(loggedInUser);
      localStorage.setItem('authUser', JSON.stringify(loggedInUser));
      navigate(type === 'admin' ? '/admin-dashboard' : '/user-dashboard');
    } else {
      setError('Invalid credentials');
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
          <button onClick={handleLogin} className="login-button">Login</button>
          {error && <p className="login-error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
