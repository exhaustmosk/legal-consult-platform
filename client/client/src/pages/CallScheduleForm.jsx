// src/pages/CallScheduleForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';

function CallScheduleForm() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const appointments = JSON.parse(localStorage.getItem('callAppointments')) || [];
    const newBooking = {
      id: Date.now(),
      date,
      time,
      notes,
    };
    appointments.push(newBooking);
    localStorage.setItem('callAppointments', JSON.stringify(appointments));

    alert('Call scheduled successfully!');
    navigate('/user-dashboard');
  };

  return (
    <div className="form-page">
      <div className="form-box">
        <h2>Schedule a Call</h2>
        <form onSubmit={handleSubmit}>
          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

          <label>Time</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

          <label>Additional Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="4"
            placeholder="E.g. Legal topic, preferred language"
          />

          <button type="submit">Book Call</button>
        </form>
      </div>
    </div>
  );
}

export default CallScheduleForm;
