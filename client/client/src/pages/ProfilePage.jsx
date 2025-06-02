import { useAuth } from '../contexts/AuthContext'

function ProfilePage() {
  const { user } = useAuth()

  if (!user) return <p>Please log in.</p>

  return (
    <div>
      <h2>👤 Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Type:</strong> {user.type}</p>
      <p><strong>Status:</strong> Active</p>
      {/* Add more info like transaction history, etc. later */}
    </div>
  )
}

export default ProfilePage
