import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/theme.css';

function MessageForm() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('authUser')); // ✅ get user info

    if (!user || !user.name || !user.email) {
      setError('User not logged in');
      return;
    }

    if (message.trim() === '') {
      setError('Please enter your message before submitting.');
      return;
    }

    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:5000/api/messages', {
        name: user.name,
        email: user.email,
        message
      });

      if (res.data.success) {
        setSuccess('Message sent successfully!');
        setMessage('');
        setTimeout(() => navigate('/user-dashboard'), 1500);
      } else {
        setError('❌ Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('❌ Failed to send message. Please try again.');
    }
  };

  const handleBack = () => {
    const confirmed = window.confirm('Are you sure you want to exit?');
    if (confirmed) {
      navigate('/user-dashboard');
    }
  };

  return (
    <div className="message-form-container">
      <h2>Send Your Message</h2>
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type your legal question or message here..."
        className="message-textarea"
      />
      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}

      <button onClick={handleSubmit} className="submit-button">
        Send Message
      </button>

      <button onClick={handleBack} className="back-button">
        Back to Dashboard
      </button>
    </div>
  );
}

export default MessageForm;
