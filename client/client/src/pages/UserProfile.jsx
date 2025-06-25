// /pages/UserProfile.jsx
import { useEffect, useState } from 'react';
import '../styles/theme.css';
import '../styles/profile.css';

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('authUser'));
    if (saved) setUser(saved);
  }, []);

  if (!user) {
    return (
      <div className="profile-loading-wrapper">
        <div className="profile-loader">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-role">{user.type === 'user' ? '👤 User' : '🛡️ Admin'}</p>
        <div className="profile-info">
          <div><strong>Email:</strong> {user.email}</div>
          {user.phone && <div><strong>Phone:</strong> {user.phone}</div>}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
