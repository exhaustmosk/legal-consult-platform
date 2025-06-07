// src/pages/AdminCallBookings.jsx
import { useEffect, useState } from 'react';
import '../styles/theme.css';

function AdminCallBookings() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('callAppointments')) || [];
    setAppointments(data);
  }, []);

  return (
    <div className="admin-section">
      <h2>Scheduled Calls</h2>
      {appointments.length === 0 ? (
        <p>No calls scheduled yet.</p>
      ) : (
        <ul className="appointment-list">
          {appointments.map((a) => (
            <li key={a.id} className="appointment-card">
              <strong>Date:</strong> {a.date}<br />
              <strong>Time:</strong> {a.time}<br />
              <strong>Notes:</strong> {a.notes || 'N/A'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminCallBookings;
