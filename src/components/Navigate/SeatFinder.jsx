import { useState } from 'react';
import { useUser } from '../../context/UserContext';

export default function SeatFinder() {
  const { seat, openSeatModal } = useUser();
  const [showDirections, setShowDirections] = useState(false);

  return (
    <section className="seat-finder glass" id="seat-finder">
      <div className="seat-finder__label">
        <span>💺</span>
        Your Seat
      </div>

      <div className="seat-finder__your-seat">
        <div className="seat-finder__seat-icon">🎟️</div>
        <div className="seat-finder__seat-info">
          <div className="seat-finder__seat-number">
            Sec {seat.section} · Row {seat.row} · Seat {seat.seat}
          </div>
          <div className="seat-finder__seat-detail">
            {seat.level} · Enter via Gate {seat.gate}
          </div>
        </div>
        <button
          className="seat-finder__edit-btn"
          onClick={openSeatModal}
          title="Edit seat"
          id="seatfinder-edit-btn"
        >
          ✏️
        </button>
        <button
          className="seat-finder__directions-btn"
          onClick={() => setShowDirections(!showDirections)}
          id="directions-btn"
        >
          {showDirections ? 'Hide' : '📍 Directions'}
        </button>
      </div>

      {showDirections && (
        <div className="directions-steps" id="directions-panel">
          <div className="directions-steps__title">
            <span>🚶</span>
            Step-by-step directions
          </div>
          {seat.directions.map((step, idx) => (
            <div key={idx}>
              <div className="direction-step">
                <div className="direction-step__number">{idx + 1}</div>
                <div className="direction-step__text">{step}</div>
              </div>
              {idx < seat.directions.length - 1 && (
                <div className="direction-step__connector" />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
