import { useEvent } from '../../context/EventContext';
import { VENUE_ZONES, getDensityLevel } from '../../data/mockData';

export default function VenueOverlay({ selectedZone, onSelectZone }) {
  const { zones } = useEvent();

  const getZoneClass = (zoneId) => {
    const density = zones[zoneId] || 50;
    const level = getDensityLevel(density);
    const selected = selectedZone === zoneId ? ' venue-zone--selected' : '';
    return `venue-zone venue-zone--${level}${selected}`;
  };

  return (
    <svg
      className="venue-svg"
      viewBox="0 0 500 390"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Stadium crowd density map"
    >
      {/* Stadium outline — oval shape */}
      <ellipse cx="250" cy="195" rx="220" ry="170" fill="none" stroke="hsla(220, 30%, 40%, 0.3)" strokeWidth="2" />
      <ellipse cx="250" cy="195" rx="215" ry="165" fill="hsla(222, 47%, 8%, 0.6)" stroke="none" />

      {/* Center field */}
      <rect x="175" y="150" width="150" height="90" rx="6" className="venue-center-field" />
      <text x="250" y="195" className="venue-center-label">🏈 FIELD</text>

      {/* Venue Zones */}
      {VENUE_ZONES.map(zone => (
        <g key={zone.id} onClick={() => onSelectZone(zone.id)} role="button" tabIndex={0}>
          <rect
            x={zone.x}
            y={zone.y}
            width={zone.width}
            height={zone.height}
            rx="4"
            className={getZoneClass(zone.id)}
          />
          <text
            x={zone.x + zone.width / 2}
            y={zone.y + zone.height / 2}
            className="venue-zone-label"
          >
            {zones[zone.id]}%
          </text>
        </g>
      ))}

      {/* Gate labels */}
      {VENUE_ZONES.filter(z => z.type === 'gate').map(gate => (
        <text
          key={`label-${gate.id}`}
          x={gate.x + gate.width / 2}
          y={gate.y < 100 ? gate.y - 6 : gate.y + gate.height + 14}
          className="venue-zone-label"
          style={{ fontSize: '8px', fill: 'var(--clr-text-muted)' }}
        >
          {gate.name}
        </text>
      ))}
    </svg>
  );
}
