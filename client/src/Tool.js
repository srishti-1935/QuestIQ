import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import History from './History';
import { Brain, ArrowLeft, Sparkles, Flame, Calendar, Puzzle, Search, Lightbulb, CheckCircle, AlertTriangle } from 'lucide-react';

function Tool() {
  const [thought, setThought] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('analyze');

  const analyze = async () => {
    if (!thought.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await axios.post('https://questiq-production.up.railway.app/api/analyze', { thought });
      setResult(res.data);
      saveToHistory(thought, res.data);
    } catch (err) {
      setError('Something went wrong. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveToHistory = (thought, result) => {
    const history = JSON.parse(localStorage.getItem('biasHistory') || '[]');
    history.unshift({ thought, result, date: new Date().toLocaleDateString() });
    localStorage.setItem('biasHistory', JSON.stringify(history.slice(0, 50)));
  };

  const getTodayCount = () => {
    const history = JSON.parse(localStorage.getItem('biasHistory') || '[]');
    const today = new Date().toLocaleDateString();
    return history.filter(h => h.date === today).length;
  };

  const getStreak = () => {
    const history = JSON.parse(localStorage.getItem('biasHistory') || '[]');
    if (history.length === 0) return 0;
    const dates = [...new Set(history.map(h => h.date))];
    let streak = 1;
    for (let i = 1; i < dates.length; i++) {
      const diff = (new Date(dates[i - 1]) - new Date(dates[i])) / (1000 * 60 * 60 * 24);
      if (diff === 1) streak++;
      else break;
    }
    return streak;
  };

  const severityClass = { low: 'sev-low', medium: 'sev-medium', high: 'sev-high' };

  const stats = [
    { icon: <Flame size={16} strokeWidth={1.5} />, value: getTodayCount(), label: 'Today' },
    { icon: <Calendar size={16} strokeWidth={1.5} />, value: `${getStreak()}d`, label: 'Streak' },
    { icon: <Puzzle size={16} strokeWidth={1.5} />, value: JSON.parse(localStorage.getItem('biasHistory') || '[]').length, label: 'Total' }
  ];

  return (
    <div>
      <div className="aurora-bg">
        <div className="aurora-blob"></div>
      </div>
      <div className="hero-bg-img"></div>

      <div className="tool-page">
        <div className="tool-nav">
          <Link to="/" className="tool-nav-logo">
            <img src="/images/logo.png" alt="QuestIQ" className="nav-logo-img" />
            QuestIQ
          </Link>
          <Link to="/" className="back-btn">
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        <div className="tabs">
          <button
            className={activeTab === 'analyze' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('analyze')}
          >
            Analyze
          </button>
          <button
            className={activeTab === 'history' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('history')}
          >
            My Bias Profile
          </button>
        </div>

        {activeTab === 'analyze' ? (
          <>
            <div className="glass input-card">
              <div className="input-label">What's on your mind?</div>
              <textarea
                value={thought}
                onChange={(e) => setThought(e.target.value)}
                placeholder="Type a thought, decision, or argument you're wrestling with..."
                rows={4}
                onKeyDown={(e) => { if (e.key === 'Enter' && e.ctrlKey) analyze(); }}
              />
              <button
                className="analyze-btn"
                onClick={analyze}
                disabled={loading || !thought.trim()}
              >
                {loading ? (
                  <span className="loading-dots">
                    <span>·</span><span>·</span><span>·</span>
                  </span>
                ) : (
                  <><Sparkles size={15} strokeWidth={1.5} /> Analyze My Thinking</>
                )}
              </button>
            </div>

            {error && <div className="error">{error}</div>}

            {result && (
              <div className="glass result-card">
                {result.biasDetected ? (
                  <>
                    <div className="bias-header">
                      <h2>{result.biasName}</h2>
                      <span className={`severity ${severityClass[result.severity] || 'sev-medium'}`}>
                        {result.severity} severity
                      </span>
                    </div>
                    <div className="section">
                      <div className="section-label">
                        <Search size={11} strokeWidth={2} /> What's happening
                      </div>
                      <p>{result.explanation}</p>
                    </div>
                    <div className="section reframe">
                      <div className="section-label">
                        <Lightbulb size={11} strokeWidth={2} /> Clearer way to think
                      </div>
                      <p>{result.reframe}</p>
                    </div>
                  </>
                ) : (
                  <div className="no-bias">
                    <CheckCircle size={28} strokeWidth={1.5} style={{ color: '#4ade80', marginBottom: '0.5rem' }} />
                    <h2>No strong bias detected</h2>
                    <p>{result.reframe}</p>
                  </div>
                )}
              </div>
            )}

            <div className="stats-row">
              {stats.map((s, i) => (
                <div key={i} className="glass stat-card">
                  <div className="stat-icon">{s.icon}</div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <History />
        )}
      </div>
    </div>
  );
}

export default Tool;