import { Link } from 'react-router-dom';
import { Brain, Search, Lightbulb, BarChart2, ArrowRight } from 'lucide-react';

function Landing() {
  return (
    <div className="landing">
      <div className="aurora-bg">
        <div className="aurora-blob"></div>
      </div>
      <div className="hero-bg-img"></div>

      <nav className="nav">
        <div className="nav-logo">
          <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="QuestIQ" className="nav-logo-img" />
          QuestIQ
        </div>
        <Link to="/app" className="nav-cta">Try it free <ArrowRight size={13} /></Link>
      </nav>

      <section className="hero">
        <div className="hero-eyebrow">
          <Brain size={12} strokeWidth={1.5} /> Cognitive Bias Detector
        </div>
        <h1>
          Your thoughts lie to you.<br />
          <em>We catch them.</em>
        </h1>
        <p className="hero-sub">
          Detect. Understand. Grow. — Every day your brain takes shortcuts that distort your decisions. QuestIQ spots those patterns in real time and shows you how to think more clearly.
        </p>
        <div className="hero-actions">
          <Link to="/app" className="btn-primary">
            Analyze Your Thinking <ArrowRight size={16} />
          </Link>
          <a href="#how" className="btn-secondary">See how it works</a>
        </div>
      </section>

      <div className="hero-preview">
        <div className="glass preview-card">
          <p className="preview-thought">
            "I should keep using this framework — I've already spent 3 months learning it."
          </p>
          <div className="preview-bias">
            <span className="preview-bias-name">Sunk Cost Fallacy</span>
            <span className="preview-badge">medium severity</span>
          </div>
          <p className="preview-reframe">
            The time already spent shouldn't drive future decisions. Evaluate the framework on its current merits and where it leads you — not what you've already invested.
          </p>
        </div>
      </div>

      <section className="features" id="how">
        <p className="features-label">How it works</p>
        <div className="features-grid">
          <div className="glass feature-card">
            <div className="feature-icon purple"><Search size={18} strokeWidth={1.5} /></div>
            <h3>Detect the bias</h3>
            <p>Type any thought, decision, or argument. Our AI identifies which cognitive bias is at play — from sunk cost to confirmation bias and beyond.</p>
          </div>
          <div className="glass feature-card">
            <div className="feature-icon pink"><Lightbulb size={18} strokeWidth={1.5} /></div>
            <h3>Reframe your thinking</h3>
            <p>Get a clear, non-judgmental explanation of what's happening — and a concrete reframe showing you what unbiased reasoning looks like.</p>
          </div>
          <div className="glass feature-card">
            <div className="feature-icon blue"><BarChart2 size={18} strokeWidth={1.5} /></div>
            <h3>Track your patterns</h3>
            <p>Over time, your bias profile reveals which thinking traps you fall into most — so you can catch them before they catch you.</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        Built with curiosity by a history-loving CS student · QuestIQ 2026
      </footer>
    </div>
  );
}

export default Landing;