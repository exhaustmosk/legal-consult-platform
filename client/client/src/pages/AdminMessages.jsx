import { useState } from 'react'
import '../styles/theme.css'

const mockMessages = [
  { id: 1, email: 'user1@example.com', message: 'I need help with property dispute.', time: '2025-06-02 10:15 AM' },
  { id: 2, email: 'user2@example.com', message: 'What is the process of filing a PIL?', time: '2025-06-02 10:30 AM' },
  { id: 3, email: 'user3@example.com', message: 'Can I get bail before arrest?', time: '2025-06-02 10:45 AM' }
]

function AdminMessages() {
  const [messages, setMessages] = useState(mockMessages)

  return (
    <div className="admin-messages">
      <h2>User Messages 📨</h2>
      {messages.length === 0 ? (
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
