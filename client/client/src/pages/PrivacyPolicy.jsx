import '../styles/policy.css';

function PrivacyPolicy() {
  return (
    <div className="policy-container">
      <h1>Privacy Policy</h1>
      <p>Last Updated: June 25, 2025</p>

      <section>
        <h2>1. Information We Collect</h2>
        <p>We collect your name, email, phone number, and consultation queries to facilitate our services.</p>
      </section>

      <section>
        <h2>2. How We Use Your Data</h2>
        <p>Your data is used to manage your account, handle transactions, and enable consultations. We do not sell or rent your data to third parties.</p>
      </section>

      <section>
        <h2>3. Data Security</h2>
        <p>We use secure technologies to store and transmit your data. However, no method is 100% secure.</p>
      </section>

      <section>
        <h2>4. Third-Party Services</h2>
        <p>We may use third-party payment processors (e.g., Razorpay) who handle your financial details. We are not liable for their policies.</p>
      </section>

      <section>
        <h2>5. Your Rights</h2>
        <p>You may request to view or delete your personal data at any time by contacting us at <a href="mailto:samadhanhub@gmail.com">samadhanhub@gmail.com</a>.</p>
      </section>

      <section>
        <h2>6. Changes to Policy</h2>
        <p>We may update this policy. If so, we’ll update the date above and notify users where necessary.</p>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
