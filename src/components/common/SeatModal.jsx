import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';

const LEVELS = ['Field Level', 'Lower Bowl', 'Club Level', 'Upper Bowl', 'Suite Level'];
const GATES = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function SeatModal() {
  const { seat, updateSeat, isSeatModalOpen, closeSeatModal } = useUser();

  const [form, setForm] = useState({
    section: seat.section,
    row: seat.row,
    seat: seat.seat,
    level: seat.level,
    gate: seat.gate,
  });

  const [saved, setSaved] = useState(false);

  // Sync form when seat changes externally
  useEffect(() => {
    setForm({
      section: seat.section,
      row: seat.row,
      seat: seat.seat,
      level: seat.level,
      gate: seat.gate,
    });
  }, [seat]);

  if (!isSeatModalOpen) return null;

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    updateSeat({
      ...form,
      section: Number(form.section) || form.section,
      seat: Number(form.seat) || form.seat,
    });
    setSaved(true);
    setTimeout(() => {
      closeSeatModal();
      setSaved(false);
    }, 800);
  };

  const hasChanges =
    form.section != seat.section ||
    form.row !== seat.row ||
    form.seat != seat.seat ||
    form.level !== seat.level ||
    form.gate !== seat.gate;

  return (
    <div
      className="seat-modal-overlay"
      onClick={(e) => e.target === e.currentTarget && closeSeatModal()}
      id="seat-modal-overlay"
    >
      <div className="seat-modal glass-strong" id="seat-modal">
        <div className="seat-modal__handle" />

        <div className="seat-modal__header">
          <h2 className="seat-modal__title">🎟️ Edit Seat Info</h2>
          <p className="seat-modal__subtitle">Update your seat assignment anytime</p>
        </div>

        {/* Current seat preview */}
        <div className="seat-modal__preview">
          <div className="seat-modal__preview-item">
            <span className="seat-modal__preview-value">{form.section}</span>
            <span className="seat-modal__preview-label">Section</span>
          </div>
          <div className="seat-modal__preview-divider">·</div>
          <div className="seat-modal__preview-item">
            <span className="seat-modal__preview-value">{form.row}</span>
            <span className="seat-modal__preview-label">Row</span>
          </div>
          <div className="seat-modal__preview-divider">·</div>
          <div className="seat-modal__preview-item">
            <span className="seat-modal__preview-value">{form.seat}</span>
            <span className="seat-modal__preview-label">Seat</span>
          </div>
        </div>

        {/* Form fields */}
        <div className="seat-modal__form">
          <div className="seat-modal__row">
            <div className="seat-modal__field">
              <label className="seat-modal__label" htmlFor="seat-section">Section</label>
              <input
                id="seat-section"
                className="seat-modal__input"
                type="number"
                min="100"
                max="400"
                value={form.section}
                onChange={(e) => handleChange('section', e.target.value)}
                placeholder="e.g. 108"
              />
            </div>
            <div className="seat-modal__field">
              <label className="seat-modal__label" htmlFor="seat-row">Row</label>
              <input
                id="seat-row"
                className="seat-modal__input"
                type="text"
                maxLength={3}
                value={form.row}
                onChange={(e) => handleChange('row', e.target.value.toUpperCase())}
                placeholder="e.g. J"
              />
            </div>
            <div className="seat-modal__field">
              <label className="seat-modal__label" htmlFor="seat-number">Seat</label>
              <input
                id="seat-number"
                className="seat-modal__input"
                type="number"
                min="1"
                max="50"
                value={form.seat}
                onChange={(e) => handleChange('seat', e.target.value)}
                placeholder="e.g. 14"
              />
            </div>
          </div>

          <div className="seat-modal__row">
            <div className="seat-modal__field seat-modal__field--wide">
              <label className="seat-modal__label" htmlFor="seat-level">Level</label>
              <select
                id="seat-level"
                className="seat-modal__select"
                value={form.level}
                onChange={(e) => handleChange('level', e.target.value)}
              >
                {LEVELS.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="seat-modal__field">
              <label className="seat-modal__label" htmlFor="seat-gate">Gate</label>
              <select
                id="seat-gate"
                className="seat-modal__select"
                value={form.gate}
                onChange={(e) => handleChange('gate', e.target.value)}
              >
                {GATES.map(g => (
                  <option key={g} value={g}>Gate {g}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="seat-modal__actions">
          <button
            className="seat-modal__cancel-btn"
            onClick={closeSeatModal}
            id="seat-modal-cancel"
          >
            Cancel
          </button>
          <button
            className={`seat-modal__save-btn ${saved ? 'seat-modal__save-btn--saved' : ''}`}
            onClick={handleSave}
            disabled={!hasChanges && !saved}
            id="seat-modal-save"
          >
            {saved ? '✓ Saved!' : '💾 Save Seat'}
          </button>
        </div>
      </div>
    </div>
  );
}
