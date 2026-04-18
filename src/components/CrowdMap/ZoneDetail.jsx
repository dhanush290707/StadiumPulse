import { useEvent } from '../../context/EventContext';
import { VENUE_ZONES, getDensityLevel } from '../../data/mockData';
import ProgressRing from '../common/ProgressRing';

export default function ZoneDetail({ zoneId, onClose }) {
  const { zones } = useEvent();
  const zone = VENUE_ZONES.find(z => z.id === zoneId);
  if (!zone) return null;

  const density = zones[zoneId] || 50;
  const level = getDensityLevel(density);
  const trend = density > 65 ? '📈 Increasing' : density < 40 ? '📉 Decreasing' : '➡️ Stable';

  const colorMap = {
    low: 'var(--clr-accent)',
    medium: 'var(--clr-warning)',
    high: 'var(--clr-danger)',
  };

  // Find nearest low-density zone for recommendation
  const lowZones = VENUE_ZONES.filter(z => z.id !== zoneId && getDensityLevel(zones[z.id] || 50) === 'low');
  const recommendation = lowZones.length > 0
    ? `Consider ${lowZones[0].name} — currently at ${zones[lowZones[0].id]}% capacity`
    : 'All zones are moderately busy right now';

  return (
    <div className="zone-detail glass" id="zone-detail-panel">
      <div className="zone-detail__header">
        <h3 className="zone-detail__name">{zone.name}</h3>
        <button className="zone-detail__close" onClick={onClose} aria-label="Close zone detail">✕</button>
      </div>

      <div className="zone-detail__stats">
        <div className="zone-detail__stat">
          <ProgressRing value={density} max={100} size={52} strokeWidth={4} color={colorMap[level]} />
          <div className="zone-detail__stat-label" style={{ marginTop: '6px' }}>Capacity</div>
        </div>
        <div className="zone-detail__stat">
          <div className="zone-detail__stat-value" style={{ color: colorMap[level] }}>{level.toUpperCase()}</div>
          <div className="zone-detail__stat-label">Density</div>
        </div>
        <div className="zone-detail__stat">
          <div className="zone-detail__stat-value">{trend.split(' ')[0]}</div>
          <div className="zone-detail__stat-label">{trend.split(' ')[1]}</div>
        </div>
      </div>

      <div className="zone-detail__recommendation">
        <span className="zone-detail__recommendation-icon">💡</span>
        <span>{recommendation}</span>
      </div>
    </div>
  );
}
