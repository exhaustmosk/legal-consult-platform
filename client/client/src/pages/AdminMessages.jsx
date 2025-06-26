import { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/theme.css'
import BASE_URL from '../config';

function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${BASE_URL}/api/messages`)
      .then(res => {
        if (res.data.success) {
          const formatted = res.data.messages.map((msg, idx) => ({
            id: msg._id,
            email: msg.email,
            message: msg.message,
            time: new Date(msg.timestamp).toLocaleString()
          }))
          setMessages(formatted)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching messages:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="admin-messages">
      <h2>User Messages 📨</h2>
      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul className="message-list">
          {messages.map(msg => (
            <li key={msg.id} className="message-box">
              <p><strong>From:</strong> {msg.email}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <p><strong>Time:</strong> {msg.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AdminMessages
