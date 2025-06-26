import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/payment.css';
import BASE_URL from '../config';

function PaymentPage() {
  const [params] = useSearchParams();
  const type = params.get('type');
  const navigate = useNavigate();

  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [callDetails, setCallDetails] = useState(null);

  useEffect(() => {
    if (type === 'message') {
      setAmount(49);
      const savedMessage = localStorage.getItem('pendingMessage');
      if (savedMessage) setMessage(JSON.parse(savedMessage));
    } else if (type === 'call') {
      setAmount(99);
      const savedCall = localStorage.getItem('pendingCall');
      if (savedCall) setCallDetails(JSON.parse(savedCall));
    }
  }, [type]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) {
      alert('⚠️ Razorpay SDK failed to load.');
      setLoading(false);
      return;
    }

    try {
      const orderRes = await axios.post(`${BASE_URL}/api/create-order`, { amount });
      const { id: order_id, amount: razorAmount, currency } = orderRes.data.order;
      const authUser = JSON.parse(localStorage.getItem('authUser'));

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorAmount,
        currency,
        name: 'Legal Consultation',
        description: `Payment for ${type}`,
        order_id,
        handler: async (response) => {
          const verifyRes = await axios.post(`${BASE_URL}/api/payment/verify`, response);
          if (verifyRes.data.success) {
            // Log payment
            await axios.post(`${BASE_URL}/api/payment-success`, {
              email: authUser?.email || 'anonymous@test.com',
              paymentId: response.razorpay_payment_id,
              amount,
              type,
            });

            // Submit message
            if (type === 'message' && message) {
              await axios.post(`${BASE_URL}/api/messages`, {
                name: authUser?.name,
                email: authUser?.email,
                message,
              });
              localStorage.removeItem('pendingMessage');
            }

            // Submit call schedule
            if (type === 'call' && callDetails) {
              await axios.post(`${BASE_URL}/api/schedule-call`, callDetails);
              localStorage.removeItem('pendingCall');
            }

            navigate('/user-dashboard');
          } else {
            alert('❌ Payment verification failed.');
          }
        },
        prefill: {
          name: authUser?.name || 'User',
          email: authUser?.email || 'test@test.com',
        },
        theme: {
          color: '#0077cc',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error('Payment Error:', err);
      alert('💥 Payment failed. Try again.');
    }

    setLoading(false);
  };

  return (
    <div className="payment-container">
      <div className="open-info">
        <h2>🧾 Final Review</h2>
        <p>
          You selected: <strong>{type === 'message' ? 'Message (₹49)' : 'Call (₹99 for 5 min)'}</strong>
        </p>

        {type === 'message' && message && (
          <div className="recap-section">
            <p><strong>Your Message:</strong></p>
            <p className="recap-box">{message}</p>
          </div>
        )}

        {type === 'call' && callDetails && (
          <div className="recap-section">
            <p><strong>Your Call Schedule:</strong></p>
            <ul>
              <li>📅 Date: {callDetails.date}</li>
              <li>⏰ Time: {callDetails.time}</li>
              <li>📞 Phone: {callDetails.phone}</li>
              {callDetails.reason && <li>📝 Reason: {callDetails.reason}</li>}
            </ul>
          </div>
        )}
      </div>

      <div className="payment-card-glass">
        <p className="amount">Amount: ₹{amount}</p>
        <button onClick={handlePayment} disabled={loading} className="futuristic-btn">
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
