import { useNavigate } from 'react-router-dom'
import '../styles/theme.css'

function LoginLanding() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <div style={styles.headerBox}>
        <h1 style={styles.headerText}>Legal Consultation</h1>
      </div>

      <div style={styles.boxWrapper}>
        <div style={styles.loginBox} onClick={() => navigate('/user-login')}>
          <h2>User Login</h2>
        </div>
        <div style={styles.loginBox} onClick={() => navigate('/admin-login')}>
          <h2>Admin Login</h2>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'var(--background-light)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  headerBox: {
    backgroundColor: 'var(--primary-blue)',
    padding: '20px 40px',
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
    marginBottom: '40px',
  },
  headerText: {
    color: 'white',
    margin: 0,
    fontSize: '32px',
    fontWeight: '600',
    textAlign: 'center',
  },
  boxWrapper: {
    display: 'flex',
    gap: '40px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  loginBox: {
    backgroundColor: 'var(--primary-yellow)',
    padding: '30px 50px',
    borderRadius: '12px',
    color: 'var(--primary-blue)',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'center',
    boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
    transition: 'transform 0.2s ease',
  },
  loginBoxHover: {
    transform: 'scale(1.05)',
  },
}

export default LoginLanding
