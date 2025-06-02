import { useState } from 'react'
import { users } from '../mockUsers'
import { useNavigate } from 'react-router-dom'
import '../styles/theme.css'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    const found = users.find(u => u.type === 'admin' && u.email === email && u.password === password)
    if (found) {
      navigate('/admin-dashboard')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Login</h2>

        <input
          type="text"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} style={styles.button}>Login</button>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  )
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
}

export default AdminLogin
