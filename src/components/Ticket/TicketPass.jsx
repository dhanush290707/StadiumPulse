import { useUser } from '../../context/UserContext';
import { useEvent } from '../../context/EventContext';
import '../../styles/extras.css';

// Generate a pseudo-random barcode pattern
function generateBarcodeHeights() {
  const heights = [];
  for (let i = 0; i < 40; i++) {
    heights.push(15 + Math.random() * 35);
  }
  return heights;
}

const BARCODE_HEIGHTS = generateBarcodeHeights();

export default function TicketPass() {
  const { seat, openSeatModal } = useUser();
  const { event } = useEvent();
  const { homeTeam, awayTeam, venue } = event;

  return (
    <div className="ticket-view" id="ticket-view">
      <div className="ticket-view__header">
        <div className="ticket-view__header-top">
          <div>
            <h1 className="ticket-view__title">My Ticket</h1>
            <p className="ticket-view__subtitle">Digital game pass — show at entry</p>
          </div>
          <button
            className="ticket-view__edit-seat-btn"
            onClick={openSeatModal}
            title="Edit seat"
            id="ticket-edit-seat-btn"
          >
            ✏️ Edit Seat
          </button>
        </div>
      </div>

      <div className="digital-ticket glass" id="digital-ticket">
        <div className="digital-ticket__event-badge">
          🏈 NFL Regular Season · Week 3
        </div>

        <div className="digital-ticket__teams">
          <div className="digital-ticket__team">
            <div
              className="digital-ticket__team-logo"
              style={{ background: homeTeam.colorBg, border: `2px solid ${homeTeam.color}` }}
            >
              {homeTeam.logo}
            </div>
            <span className="digital-ticket__team-name">{homeTeam.city} {homeTeam.name}</span>
          </div>
          <span className="digital-ticket__vs">VS</span>
          <div className="digital-ticket__team">
            <div
              className="digital-ticket__team-logo"
              style={{ background: awayTeam.colorBg, border: `2px solid ${awayTeam.color}` }}
            >
              {awayTeam.logo}
            </div>
            <span className="digital-ticket__team-name">{awayTeam.city} {awayTeam.name}</span>
          </div>
        </div>

        <div className="digital-ticket__divider" />

        <div className="digital-ticket__seat-highlight">
          <div className="digital-ticket__seat-item">
            <div className="digital-ticket__seat-item-value">{seat.section}</div>
            <div className="digital-ticket__seat-item-label">Section</div>
          </div>
          <div className="digital-ticket__seat-item">
            <div className="digital-ticket__seat-item-value">{seat.row}</div>
            <div className="digital-ticket__seat-item-label">Row</div>
          </div>
          <div className="digital-ticket__seat-item">
            <div className="digital-ticket__seat-item-value">{seat.seat}</div>
            <div className="digital-ticket__seat-item-label">Seat</div>
          </div>
        </div>

        <div className="digital-ticket__details">
          <div className="digital-ticket__detail">
            <span className="digital-ticket__detail-label">Date</span>
            <span className="digital-ticket__detail-value">Sep 27, 2026</span>
          </div>
          <div className="digital-ticket__detail">
            <span className="digital-ticket__detail-label">Kickoff</span>
            <span className="digital-ticket__detail-value">{event.kickoff}</span>
          </div>
          <div className="digital-ticket__detail">
            <span className="digital-ticket__detail-label">Venue</span>
            <span className="digital-ticket__detail-value">{venue.name}</span>
          </div>
          <div className="digital-ticket__detail">
            <span className="digital-ticket__detail-label">Gate</span>
            <span className="digital-ticket__detail-value">Gate {seat.gate}</span>
          </div>
          <div className="digital-ticket__detail">
            <span className="digital-ticket__detail-label">Level</span>
            <span className="digital-ticket__detail-value">{seat.level}</span>
          </div>
          <div className="digital-ticket__detail">
            <span className="digital-ticket__detail-label">Holder</span>
            <span className="digital-ticket__detail-value">Alex Mitchell</span>
          </div>
        </div>

        <div className="digital-ticket__barcode">
          <div className="digital-ticket__barcode-bars">
            {BARCODE_HEIGHTS.map((h, i) => (
              <div key={i} className="digital-ticket__barcode-bar" style={{ height: `${h}px`, width: i % 4 === 0 ? '2px' : '3px' }} />
            ))}
          </div>
          <span className="digital-ticket__barcode-text">TKT-2026-NFL-KC108J14</span>
        </div>
      </div>

      {/* Seat Upgrade Prompt */}
      <div className="upgrade-prompt glass" id="upgrade-prompt">
        <div className="upgrade-prompt__title">
          ⬆️ Upgrade Available
        </div>
        <p className="upgrade-prompt__text">
          Club Level seats are available for today's game! Enjoy premium seating, exclusive lounges, and in-seat service.
        </p>
        <div className="upgrade-prompt__options">
          <div className="upgrade-option" id="upgrade-club">
            <div className="upgrade-option__tier">Club Level</div>
            <div className="upgrade-option__price">+$85</div>
            <div className="upgrade-option__desc">Premium view, lounge access</div>
          </div>
          <div className="upgrade-option" id="upgrade-suite">
            <div className="upgrade-option__tier">Suite Level</div>
            <div className="upgrade-option__price">+$250</div>
            <div className="upgrade-option__desc">Private suite, all-inclusive</div>
          </div>
        </div>
      </div>

      {/* Weather Widget */}
      <div className="weather-widget glass" id="weather-widget">
        <span className="weather-widget__icon">⛅</span>
        <div className="weather-widget__info">
          <div className="weather-widget__temp">72°F</div>
          <div className="weather-widget__desc">Partly Cloudy</div>
        </div>
        <div className="weather-widget__details">
          <span className="weather-widget__detail">💨 5 mph</span>
          <span className="weather-widget__detail">💧 22%</span>
          <span className="weather-widget__detail">☀️ UV: Low</span>
        </div>
      </div>
    </div>
  );
}
