import { useState } from 'react';
import '../styles/theme.css';

function CallScheduleForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    reason: '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:5000/api/schedule-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.success) {
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', date: '', time: '', reason: '' });
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Schedule a Call</h2>
      <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
      <input type="date" name="date" value={form.date} onChange={handleChange} />
      <input type="time" name="time" value={form.time} onChange={handleChange} />
      <textarea name="reason" placeholder="Reason (optional)" value={form.reason} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
      {success && <p style={{ color: 'green' }}>✅ Call Scheduled Successfully!</p>}
    </div>
  );
}

export default CallScheduleForm;
