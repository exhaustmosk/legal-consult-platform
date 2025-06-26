import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';
import BASE_URL from '../config';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const handle = async () => {
    const res = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass }),
    });
    const d = await res.json();
    if (d.success && !d.isAdmin) {
      localStorage.setItem('authUser', JSON.stringify(d.user));
      nav('/user-dashboard');
    } else {
      setErr('Invalid credentials');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>User Login</h2>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={styles.input} />
        <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" style={styles.input} />
        <button onClick={handle} style={styles.button}>Login</button>
        {err && <p style={styles.error}>{err}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'var(--background-light)',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    animation: 'fadeIn 0.8s ease',
    width: '320px',
  },
  title: {
    color: 'var(--primary-blue)',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1.5px solid var(--input-border)',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'var(--primary-yellow)',
    color: 'var(--primary-blue)',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 5px 10px rgba(255, 209, 102, 0.6)',
  },
  error: {
    color: 'var(--error-red)',
    marginTop: '10px',
  },
};

export default UserLogin;
