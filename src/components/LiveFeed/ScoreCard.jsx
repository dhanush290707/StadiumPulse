import { useEvent } from '../../context/EventContext';
import PulseIndicator from '../common/PulseIndicator';

export default function ScoreCard() {
  const { event, scores } = useEvent();
  const { homeTeam, awayTeam } = event;

  const quarterLabels = ['Q1', 'Q2', 'Q3', 'Q4'];

  return (
    <div className="score-card glass" id="score-card">
      <div className="score-card__teams">
        <div className="score-card__team">
          <div className="score-card__team-badge" style={{ background: homeTeam.colorBg, border: `2px solid ${homeTeam.color}` }}>
            {homeTeam.logo}
          </div>
          <span className="score-card__team-name">{homeTeam.city}<br />{homeTeam.name}</span>
        </div>

        <div className="score-card__scores">
          <div className="score-card__big-score gradient-text">
            {scores.home} – {scores.away}
          </div>
          <div className="score-card__period">
            <PulseIndicator variant="live" /> Q{scores.quarter} · {scores.clock}
          </div>
        </div>

        <div className="score-card__team">
          <div className="score-card__team-badge" style={{ background: awayTeam.colorBg, border: `2px solid ${awayTeam.color}` }}>
            {awayTeam.logo}
          </div>
          <span className="score-card__team-name">{awayTeam.city}<br />{awayTeam.name}</span>
        </div>
      </div>

      {/* Quarter breakdown */}
      <div className="score-card__quarters">
        <div className="score-card__quarter-header" />
        {quarterLabels.map((q, i) => (
          <div
            key={q}
            className={`score-card__quarter-header ${i + 1 === scores.quarter ? 'score-card__quarter-cell--active' : ''}`}
          >
            {q}
          </div>
        ))}
        <div className="score-card__quarter-header">T</div>

        {/* Home row */}
        <div className="score-card__quarter-cell score-card__quarter-cell--team">{homeTeam.abbreviation}</div>
        {scores.quarters.home.map((pts, i) => (
          <div
            key={`h${i}`}
            className={`score-card__quarter-cell ${i + 1 === scores.quarter ? 'score-card__quarter-cell--active' : ''}`}
          >
            {pts}
          </div>
        ))}
        <div className="score-card__quarter-cell score-card__quarter-cell--total">{scores.home}</div>

        {/* Away row */}
        <div className="score-card__quarter-cell score-card__quarter-cell--team">{awayTeam.abbreviation}</div>
        {scores.quarters.away.map((pts, i) => (
          <div
            key={`a${i}`}
            className={`score-card__quarter-cell ${i + 1 === scores.quarter ? 'score-card__quarter-cell--active' : ''}`}
          >
            {pts}
          </div>
        ))}
        <div className="score-card__quarter-cell score-card__quarter-cell--total">{scores.away}</div>
      </div>
    </div>
  );
}
