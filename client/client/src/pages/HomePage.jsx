import '../styles/theme.css';

function HomePage() {
  return (
    <div className="homepage-container">
      <section className="intro-section">
        <h2>Welcome to Legal Consultation</h2>
        <p>
          We provide fast, reliable, and affordable legal consultations online. Whether you
          need advice, document review, or a call with a lawyer, we’re here to help.
        </p>
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
          alt="Legal Help"
          className="homepage-img"
        />
      </section>

      <section className="about-section">
        <h3>About Us</h3>
        <p>
          Our mission is to make legal help accessible to everyone. Our experienced
          professionals are available for instant messaging or scheduled calls.
        </p>
      </section>
    </div>
  );
}

export default HomePage;
