import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';
import '../styles/userDashboard.css';

function UserDashboard() {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMessageClick = () => {
    navigate('/message-form'); // ✅ updated
  };

  const handleCallClick = () => {
    navigate('/call-scheduler'); // ✅ updated
  };

  return (
    <div className="user-dashboard">
      <section className="dashboard-hero">
        <h2>Welcome Back!</h2>
        <p>How would you like to consult with our legal experts today?</p>
      </section>

      <section className="dashboard-options">
        <div className="dashboard-card" onClick={handleMessageClick}>
          <h3>✉️ Message</h3>
          <p>₹49 only</p>
          <p>Ask your queries regarding legal issues, document review/drafting and get replies within hours</p>
        </div>

        <div className="dashboard-card" onClick={handleCallClick}>
          <h3>📞 Call</h3>
          <p>₹99 for 5 min</p>
          <p>Speak directly with a legal advisor over a short call</p>
        </div>
      </section>
    </div>
  );
}

export default UserDashboard;
