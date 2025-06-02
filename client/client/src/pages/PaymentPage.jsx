import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function PaymentPage() {
  const [params] = useSearchParams()
  const type = params.get('type')
  const navigate = useNavigate()
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    if (type === 'message') setAmount(49)
    else if (type === 'call') setAmount(99)
  }, [type])

  const handleContinue = () => {
    if (type === 'message') {
      navigate('/message-form')
    } else if (type === 'call') {
      alert('🔧 Call scheduling flow is coming soon!')
    }
  }

  return (
    <div>
      <h2>💰 Payment Page</h2>
      <p>
        You selected: <strong>{type === 'message' ? 'Message (₹49)' : 'Call (₹99 for 5 min)'}</strong>
      </p>

      <p>Total Amount: ₹{amount}</p>

      <p style={{ fontStyle: 'italic' }}>(UPI payment simulation - real payments coming soon)</p>

      <button onClick={handleContinue} style={{ marginTop: '15px' }}>
        Continue
      </button>
    </div>
  )
}

export default PaymentPage
