import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const navigate = useNavigate()

  return (
    <div>
      <h2>Welcome, Admin 🛠️</h2>
      <button onClick={() => navigate('/admin-messages')}>📨 View Messages</button>
    </div>
  )
}

export default AdminDashboard
