import { useNavigate } from 'react-router-dom'

function UserDashboard() {
  const navigate = useNavigate()

  const handleMessageClick = () => {
    navigate('/payment?type=message')
  }

  const handleCallClick = () => {
    navigate('/payment?type=call')
  }

  return (
    <div style={styles.container}>
      <h2>Welcome, User! 👤</h2>
      <p>Select your consultation mode:</p>

      <div style={styles.buttonContainer}>
        <button onClick={handleMessageClick} style={styles.button}>
          ✉️ Message (₹49)
        </button>

        <button onClick={handleCallClick} style={styles.button}>
          📞 Call (₹99 for 5 min)
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px'
  },
  buttonContainer: {
    marginTop: '20px'
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    margin: '10px',
    borderRadius: '8px',
    border: '1px solid #444',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer'
  }
}

export default UserDashboard
