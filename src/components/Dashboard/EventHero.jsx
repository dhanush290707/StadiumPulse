import { useEvent } from '../../context/EventContext';
import PulseIndicator from '../common/PulseIndicator';
import '../../styles/dashboard.css';

export default function EventHero() {
  const { event, scores } = useEvent();
  const { homeTeam, awayTeam, venue } = event;

  return (
    <section className="event-hero glass" id="event-hero">
      <div className="event-hero__status">
        <span className="event-hero__live-tag">
          <PulseIndicator variant="live" />
          LIVE
        </span>
        <span className="event-hero__period">Q{scores.quarter}</span>
        <span className="event-hero__clock">{scores.clock}</span>
      </div>

      <div className="event-hero__scoreboard">
        <div className="event-hero__team">
          <div
            className="event-hero__team-logo"
            style={{ background: homeTeam.colorBg, border: `2px solid ${homeTeam.color}` }}
          >
            {homeTeam.logo}
          </div>
          <span className="event-hero__team-name">{homeTeam.name}</span>
          <span className="event-hero__team-record">{homeTeam.record}</span>
        </div>

        <div className="event-hero__score-center">
          <span className="event-hero__score gradient-text">
            {scores.home} – {scores.away}
          </span>
          <div className="event-hero__score-divider" />
        </div>

        <div className="event-hero__team">
          <div
            className="event-hero__team-logo"
            style={{ background: awayTeam.colorBg, border: `2px solid ${awayTeam.color}` }}
          >
            {awayTeam.logo}
          </div>
          <span className="event-hero__team-name">{awayTeam.name}</span>
          <span className="event-hero__team-record">{awayTeam.record}</span>
        </div>
      </div>

      <p className="event-hero__venue">
        📍 {venue.name} · {venue.city}
      </p>
    </section>
  );
}
