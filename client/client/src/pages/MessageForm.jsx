import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/theme.css'

function MessageForm() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (message.trim() === '') {
      setError('Please enter your message before submitting.')
      return
    }
    setError('')
    alert(`Message sent:\n\n${message}`)
    setMessage('')
    navigate('/user-dashboard')
  }

  const handleBack = () => {
    const confirmed = window.confirm('Are you sure you want to exit?')
    if (confirmed) {
      navigate('/user-dashboard')
    }
  }

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

        <button onClick={handleSubmit} className="submit-button">
          Send Message
        </button>

        <button onClick={handleBack} className="back-button">
          Back to Dashboard
        </button>
      </div>
  )
}

export default MessageForm
