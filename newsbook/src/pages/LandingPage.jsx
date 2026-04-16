import { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthModal from "../components/AuthModal";

function LandingPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const loginFields = useMemo(
    () => [
      { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
      { label: "Password", name: "password", type: "password", placeholder: "Enter password" }
    ],
    []
  );

  const signupFields = useMemo(
    () => [
      { label: "Full Name", name: "fullName", type: "text", placeholder: "Your name" },
      { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
      {
        label: "Password",
        name: "password",
        type: "password",
        minLength: 6,
        placeholder: "Create password"
      }
    ],
    []
  );

  const openModal = (name) => setActiveModal(name);
  const closeModal = () => setActiveModal(null);

  const showToast = (message) => {
    setToastMessage(message);
    window.clearTimeout(window.newsbookToastTimer);
    window.newsbookToastTimer = window.setTimeout(() => {
      setToastMessage("");
    }, 2200);
  };

  const onLoginSubmit = () => {
    closeModal();
    showToast("Login successful. Welcome back.");
  };

  const onSignupSubmit = () => {
    closeModal();
    showToast("Signup complete. Your account is ready.");
  };

  return (
    <div className="page landing-page">
      <div className="grain" aria-hidden="true"></div>

      <header className="site-header">
        <nav className="main-nav">
          <Link className="brand" to="/" aria-label="NewsBook home">
            <span className="brand-badge">NB</span>
            <span className="brand-text">NewsBook Daily</span>
          </Link>

          <ul className="nav-links" aria-label="Main navigation">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <NavLink to="/news" className={({ isActive }) => (isActive ? "active" : "")}>News</NavLink>
            </li>
          </ul>

          <div className="auth-zone" aria-label="Authentication actions">
            <button className="btn btn-login" onClick={() => openModal("login")}>
              Login
            </button>
            <button className="btn btn-signup" onClick={() => openModal("signup")}>
              Sign Up
            </button>
            <div className="auth-hover-card" aria-hidden="true">
              <p>Hover unlocked: instant account access.</p>
              <span>Click Login or Sign Up to continue.</span>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy reveal">
            <p className="eyebrow">Fresh every day</p>
            <h1>Daily news updates with speed, clarity, and style.</h1>
            <p className="hero-description">
              One place for business, technology, world affairs, sports, and health. Start with today and
              stay ahead every morning.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/news">
                Open Daily Feed
              </Link>
              <a className="btn btn-ghost" href="#features">
                Explore Features
              </a>
            </div>
          </div>

          <aside className="hero-panel reveal-delayed" aria-label="Today summary">
            <div className="live-pill">
              <span className="pulse-dot"></span>
              <span>Live updates</span>
            </div>
            <h2>Today at a glance</h2>
            <ul>
              <li>
                <strong>24+</strong> stories tracked
              </li>
              <li>
                <strong>8</strong> categories available
              </li>
              <li>
                <strong>1 tap</strong> to refresh feed
              </li>
            </ul>
            <Link to="/news" className="mini-link">
              View headline cards
            </Link>
          </aside>
        </section>

        <section className="features" id="features">
          <article className="feature-card reveal">
            <h3>Landing Experience</h3>
            <p>Modern newspaper inspired design with smooth entry animation and responsive layout.</p>
          </article>
          <article className="feature-card reveal-delay-2">
            <h3>Login / Signup Hover</h3>
            <p>Auth buttons include clear hover interactions, visual feedback, and quick access forms.</p>
          </article>
          <article className="feature-card reveal-delay-3">
            <h3>Card Based News Page</h3>
            <p>Main page displays headlines in clean cards with source, summary, and publish date.</p>
          </article>
        </section>
      </main>

      <footer className="site-footer">
        <p>NewsBook Daily</p>
        <Link to="/news">Read today news</Link>
      </footer>

      <AuthModal
        isOpen={activeModal === "login"}
        title="Login"
        submitLabel="Continue"
        fields={loginFields}
        onClose={closeModal}
        onSubmit={onLoginSubmit}
      />

      <AuthModal
        isOpen={activeModal === "signup"}
        title="Sign Up"
        submitLabel="Create Account"
        fields={signupFields}
        onClose={closeModal}
        onSubmit={onSignupSubmit}
      />

      <div className={`toast ${toastMessage ? "show" : ""}`} aria-live="polite">
        {toastMessage}
      </div>
    </div>
  );
}

export default LandingPage;