import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';
import '../styles/messageForm.css';

function MessageForm() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));

    if (!user || !user.name || !user.email) {
      setError('User not logged in.');
      return;
    }

    if (message.trim() === '') {
      setError('Please write your message before submitting.');
      return;
    }

    // ✅ Store temporarily in localStorage
    localStorage.setItem('pendingMessage', JSON.stringify(message.trim()));
    navigate('/payment?type=message');
  };

  const handleBack = () => {
    if (window.confirm('Go back to dashboard?')) {
      navigate('/user-dashboard');
    }
  };

  return (
    <div className="msg-page">
      <div className="msg-header">
        <h2>📩 Send a Legal Message</h2>
        <p>Type your question or concern below. A verified legal expert will reply within hours.</p>
      </div>

      <div className="msg-content">
        <textarea
          className="msg-textarea"
          placeholder="Describe your issue clearly..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {error && <p className="msg-error">{error}</p>}

        <div className="msg-buttons">
          <button className="msg-submit-btn" onClick={handleSubmit}>
            Continue to Payment →
          </button>
          <button className="msg-back-btn" onClick={handleBack}>
            ← Back
          </button>
        </div>
      </div>

      <div className="msg-assurance">
        <h4>Why trust us?</h4>
        <ul>
          <li>🔒 100% Confidential & Secure</li>
          <li>⚖️ Responses by Verified Legal Professionals</li>
          <li>📬 Affordable — Just ₹49</li>
          <li>⏱️ Replies within 24 Hours</li>
        </ul>
      </div>
    </div>
  );
}

export default MessageForm;
