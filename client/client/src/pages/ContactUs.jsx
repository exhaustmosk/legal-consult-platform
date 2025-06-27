import '../styles/contact.css';
import { Link } from 'react-router-dom';

function ContactUs() {
  return (
    <div className="contact-container">
      <section className="contact-hero">
        <h1>Contact & Support</h1>
        <p>If you're facing any issues or need help using our platform, we're here for you.</p>
      </section>

      <section className="contact-info">
        <div className="card">
          <h2>📧 Email Support</h2>
          <p>Have questions or technical issues?</p>
          <p>Email us at: <a href="mailto:support@samadhanhub.com">support@samadhanhub.com</a></p>
        </div>

        <div className="card">
          <h2>ℹ️ How Our Platform Works</h2>
          <ul>
            <li>1. Log in or register as a user</li>
            <li>2. Choose Message or Call Consultation</li>
            <li>3. Submit your query or schedule a call</li>
            <li>4. Make payment via secure UPI</li>
            <li>5. Get expert legal advice from our trusted panel</li>
          </ul>
        </div>

        <div className="card warning">
          <h2>🚫 Please Note</h2>
          <p>This email is <strong>only for technical and support issues</strong>.</p>
          <p><em>Do not send legal queries via email — use the platform's consultation features.</em></p>
        </div>

        <div className="card refund">
          <h2>💸 Need a Refund?</h2>
          <p>If you were charged incorrectly or experienced a failed transaction, you can request a refund.</p>
          <Link to="/refund-policy" className="refund-button">Request a Refund</Link>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
