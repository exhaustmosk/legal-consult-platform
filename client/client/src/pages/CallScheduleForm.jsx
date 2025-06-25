import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';
import '../styles/callScheduleForm.css';

function CallScheduleForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    reason: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSuccess('');
    setError('');

    const { name, email, phone, date, time } = form;
    if (!name || !email || !phone || !date || !time) {
      setError('❌ Please fill in all required fields.');
      return;
    }

    try {
      localStorage.setItem('pendingCall', JSON.stringify(form));
      setSuccess('✅ Call details saved. Redirecting to payment...');

      setTimeout(() => {
        navigate('/payment?type=call');
      }, 1500);
    } catch (err) {
      setError('⚠️ Unable to save call details. Please try again.');
    }
  };

  const handleBack = () => {
    if (window.confirm('Go back to dashboard?')) navigate('/user-dashboard');
  };

  return (
    <div className="call-page">
      <div className="call-header">
        <h2>📞 Schedule a Legal Call</h2>
        <p>Book a 5-minute call with a certified legal expert at your preferred time.</p>
      </div>

      <div className="call-form">
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
        />
        <textarea
          name="reason"
          placeholder="Reason (optional)"
          value={form.reason}
          onChange={handleChange}
        />

        {error && <p className="call-error">{error}</p>}
        {success && <p className="call-success">{success}</p>}

        <div className="call-buttons">
          <button className="call-submit-btn" onClick={handleSubmit}>
            Schedule & Continue →
          </button>
          <button className="call-back-btn" onClick={handleBack}>
            ← Back
          </button>
        </div>
      </div>

      <div className="call-assurance">
        <h4>Why Choose Our Call Service?</h4>
        <ul>
          <li>📆 Schedule anytime that works for you</li>
          <li>🎓 Speak with verified legal professionals</li>
          <li>🔐 Fully confidential & secure</li>
          <li>💰 Just ₹99 for 5 minutes</li>
        </ul>
      </div>
    </div>
  );
}

export default CallScheduleForm;
