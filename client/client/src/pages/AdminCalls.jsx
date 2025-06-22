import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCalls = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/calls');
      setCalls(res.data.calls);
    } catch (err) {
      console.error('Failed to fetch calls', err);
    }
  };

  const handleCheckboxChange = async (callId, currentStatus) => {
    try {
      await axios.post('http://localhost:5000/api/admin/calls/mark-attended', {
        callId,
        attended: !currentStatus
      });
      // update UI instantly
      setCalls(prev =>
        prev.map(call =>
          call._id === callId ? { ...call, attended: !currentStatus } : call
        )
      );
    } catch (err) {
      console.error('Failed to update call status', err);
    }
  };

  return (
    <div>
      <h2>📞 Admin - Scheduled Calls</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason</th>
            <th>Attended</th>
          </tr>
        </thead>
        <tbody>
          {calls.map(call => (
            <tr key={call._id}>
              <td>{call.name}</td>
              <td>{call.email}</td>
              <td>{call.phone}</td>
              <td>{call.date}</td>
              <td>{call.time}</td>
              <td>{call.reason}</td>
              <td>
                <input
                  type="checkbox"
                  checked={call.attended}
                  onChange={() => handleCheckboxChange(call._id, call.attended)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCalls;
