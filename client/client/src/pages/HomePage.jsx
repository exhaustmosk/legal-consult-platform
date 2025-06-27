import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/theme.css';
import '../styles/home.css';
import heroImage from '../assets/img.png';
function HomePage() {
  const [showScroll, setShowScroll] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('authUser'));
    setIsUserLoggedIn(saved?.type === 'user');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="homepage-modern">
      {/* 🔹 Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            ⚖️ Legal Help, Anytime,<br /> Anywhere.
          </h1>
          <p>
            Book expert legal consultations in minutes. We bring trusted lawyers
            to your fingertips — quick, affordable & secure.
          </p>
          <Link
            to={isUserLoggedIn ? '/user-dashboard' : '/login/user'}
            className="cta-button"
          >
            {isUserLoggedIn ? '📅 Book Your Appointment' : 'Login'}
          </Link>
        </div>
        <div className="hero-image">
           <img
            src={heroImage} // ✅ local image here
            alt="Legal Illustration"
            className="hero-img"
          />
        </div>
      </section>


      {/* 🔹 Services */}
      <section className="services-section-modern">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            📩 <h3>Ask a Message</h3>
            <p>Send your legal question & get expert replies fast.</p>
          </div>
          <div className="service-card">
            📞 <h3>Call a Lawyer</h3>
            <p>Book a 5-minute call & get legal advice directly.</p>
          </div>
          <div className="service-card">
            📄 <h3>Document Review</h3>
            <p>Have contracts or agreements reviewed by a pro.</p>
          </div>
          <div className="service-card">
            🧾 <h3>Notice Drafting</h3>
            <p>Get help writing legal notices or letters affordably.</p>
          </div>
        </div>
      </section>

            {/* 🔹 Why Us Highlights */}
      <section className="highlight-section">
        <h2>Why Choose Us?</h2>
        <div className="highlight-grid">
          <div className="highlight-card">✅ Verified Lawyers</div>
          <div className="highlight-card">🔐 Safe & Private</div>
          <div className="highlight-card">💳 Transparent Pricing</div>
          <div className="highlight-card">⚡ Fast Responses</div>
        </div>
      </section>
      {/* 🔹 How It Works */}
      <section className="how-it-works-animated">
        <h2>How It Works</h2>
        <ol>
          <li>1️⃣ Choose Message or Call</li>
          <li>2️⃣ Fill in your query details</li>
          <li>3️⃣ Make a secure payment</li>
          <li>4️⃣ Get legal help instantly</li>
        </ol>
      </section>

      {/* 🔹 Scroll to Top */}
      {showScroll && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
}

export default HomePage;
