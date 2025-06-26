import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/theme.css';
import BASE_URL from '../config';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    type: 'user', // 👈 Default user type
  });

  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        alert('OTP sent to your email!');
      } else {
        alert('Failed to send OTP');
      }
    } catch (err) {
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtpAndRegister = async () => {
    setLoading(true);
    try {
      // First verify OTP
      const verifyRes = await fetch(`${BASE_URL}/api/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: enteredOtp }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        alert('Incorrect OTP');
        return;
      }

      // Now register
      const { confirmPassword, ...registerData } = formData;
      const res = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });

      const data = await res.json();
      if (data.success) {
        alert('Registered successfully!');
        navigate('/user-login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create a New Account</h2>

      {!otpSent ? (
        <form className="form" onSubmit={handleSendOtp}>
          <input className="form-input" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input className="form-input" name="email" placeholder="Gmail" value={formData.email} onChange={handleChange} required />
          <input className="form-input" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          <input className="form-input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input className="form-input" type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          
          {/* Optional: Hidden or dropdown role selector in future */}
          {/* <select className="form-input" name="type" value={formData.type} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select> */}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      ) : (
        <div className="form">
          <input
            className="form-input"
            placeholder="Enter OTP"
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtpAndRegister} className="btn" disabled={loading}>
            {loading ? 'Registering...' : 'Verify & Register'}
          </button>
        </div>
      )}

      <p className="form-note">
        Already have an account? <Link to="/user-login">Login here</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
