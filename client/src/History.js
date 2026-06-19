import { Target, AlertTriangle, CheckCircle, Brain } from 'lucide-react';

function History() {
  const history = JSON.parse(localStorage.getItem('biasHistory') || '[]');

  const biasCounts = history.reduce((acc, item) => {
    if (item.result.biasDetected) {
      const name = item.result.biasName;
      acc[name] = (acc[name] || 0) + 1;
    }
    return acc;
  }, {});

  const topBias = Object.entries(biasCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="history">
      <h2>Your Bias Profile</h2>

      {topBias && (
        <div className="glass top-bias-card">
          <Target size={22} strokeWidth={1.5} style={{ color: '#8b5cf6', flexShrink: 0 }} />
          <div>
            <div className="top-bias-label">Most common bias</div>
            <div className="top-bias-name">{topBias[0]}</div>
            <div className="top-bias-count">detected {topBias[1]} time{topBias[1] > 1 ? 's' : ''}</div>
          </div>
        </div>
      )}

      <div className="history-list">
        {history.length === 0 ? (
          <div className="empty-state">
            <Brain size={32} strokeWidth={1} style={{ color: '#2e2c40', marginBottom: '0.75rem' }} />
            <p>No analyses yet — start thinking out loud!</p>
          </div>
        ) : (
          history.map((item, i) => (
            <div key={i} className="glass history-item">
              <p className="history-thought">"{item.thought}"</p>
              <div className="history-bottom">
                <span className="history-bias">
                  {item.result.biasDetected
                    ? <><AlertTriangle size={12} strokeWidth={2} /> {item.result.biasName}</>
                    : <><CheckCircle size={12} strokeWidth={2} /> No bias detected</>
                  }
                </span>
                <span className="history-date">{item.date}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;