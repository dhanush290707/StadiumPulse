import { useEvent } from '../../context/EventContext';
import ScoreCard from './ScoreCard';
import StatCard from './StatCard';
import '../../styles/livefeed.css';

export default function LiveFeed() {
  const { timeline, stats, sentiment, event } = useEvent();

  const sentimentEmoji = sentiment > 80 ? '🔥' : sentiment > 60 ? '😄' : sentiment > 40 ? '😐' : '😴';
  const sentimentLabel = sentiment > 80 ? 'Electric!' : sentiment > 60 ? 'Excited' : sentiment > 40 ? 'Steady' : 'Quiet';

  return (
    <div className="live-feed" id="live-feed-view">
      <div className="live-feed__header">
        <h1 className="live-feed__title">Live Feed</h1>
        <p className="live-feed__subtitle">Real-time game updates & stats</p>
      </div>

      <ScoreCard />

      {/* Game Stats */}
      <section className="stats-section">
        <h2 className="stats-section__title">
          Game Stats — {event.homeTeam.abbreviation} vs {event.awayTeam.abbreviation}
        </h2>
        <div className="stats-grid">
          {stats.map(stat => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      {/* Crowd Sentiment */}
      <div className="sentiment-card glass" id="crowd-sentiment">
        <div className="sentiment-card__title">Crowd Pulse</div>
        <div className="sentiment-card__meter">
          <span className="sentiment-card__emoji">{sentimentEmoji}</span>
          <div className="sentiment-card__bar-container">
            <div className="sentiment-card__bar">
              <div className="sentiment-card__bar-fill" style={{ width: `${sentiment}%` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="sentiment-card__label">{sentimentLabel}</span>
              <span className="sentiment-card__desc"
                style={{ fontFamily: 'var(--ff-mono)', fontWeight: 600, color: 'var(--clr-accent-light)' }}>
                {sentiment}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Timeline */}
      <section className="timeline-section">
        <h2 className="timeline-section__title">Game Timeline</h2>
        <div className="timeline">
          {timeline.map(evt => (
            <div key={evt.id} className="timeline-event" id={`timeline-${evt.id}`}>
              <span className="timeline-event__time">{evt.time.split(':').slice(-1)[0]}′</span>
              <span className={`timeline-event__dot timeline-event__dot--${evt.type}`} />
              <div className="timeline-event__content">
                <div className="timeline-event__title">{evt.title}</div>
                <div className="timeline-event__desc">{evt.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
