import '../styles/theme.css';

function RefundPolicy() {
  return (
    <div className="page-container">
      <h2>Refund Policy</h2>
      <p>Effective Date: June 25, 2025</p>

      <section>
        <h3>1. Eligibility for Refund</h3>
        <p>
          Refunds are applicable only for services that haven't been delivered as described. 
          This includes:
          <ul>
            <li>Call not attended by the legal advisor</li>
            <li>No response to your message within 48 hours</li>
            <li>Technical failures during payment or service usage</li>
          </ul>
        </p>
      </section>

      <section>
        <h3>2. Non-Refundable Situations</h3>
        <p>
          We do not process refunds in the following cases:
          <ul>
            <li>If the user misses or cancels the scheduled call</li>
            <li>If the user submits unclear/incomplete message queries</li>
            <li>If the service was consumed as intended</li>
            <li>Dissatisfaction with advice (as legal advice is subjective and non-guaranteed)</li>
          </ul>
        </p>
      </section>

      <section>
        <h3>3. How to Request a Refund</h3>
        <p>
          To request a refund, send an email to <strong>samadhanhub@gmail.com</strong> with:
          <ul>
            <li>Your registered email</li>
            <li>Transaction ID</li>
            <li>Service type (Message/Call)</li>
            <li>Reason for refund</li>
          </ul>
          Our team will respond within 3-5 working days.
        </p>
      </section>

      <section>
        <h3>4. Refund Processing Time</h3>
        <p>
          Once your refund is approved, the amount will be credited to your original payment method
          within 5-7 business days.
        </p>
      </section>

      <section>
        <h3>5. Contact</h3>
        <p>
          For questions or concerns, please reach out to our technical support team at <strong>samadhanhub@gmail.com</strong>.
        </p>
      </section>
    </div>
  );
}

export default RefundPolicy;
