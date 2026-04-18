import { useState, useEffect } from 'react';
import { useEvent } from '../../context/EventContext';
import { VENUE_ZONES, getDensityLevel } from '../../data/mockData';
import VenueOverlay from './VenueOverlay';
import ZoneDetail from './ZoneDetail';
import PulseIndicator from '../common/PulseIndicator';
import '../../styles/crowdmap.css';

export default function CrowdMap() {
  const { zones } = useEvent();
  const [selectedZone, setSelectedZone] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setLastUpdate(new Date()), 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectZone = (zoneId) => {
    setSelectedZone(prev => prev === zoneId ? null : zoneId);
  };

  // Sort zones by density (highest first)
  const sortedZones = [...VENUE_ZONES]
    .filter(z => z.type !== 'concourse')
    .sort((a, b) => (zones[b.id] || 0) - (zones[a.id] || 0));

  const colorMap = {
    low: 'var(--clr-accent)',
    medium: 'var(--clr-warning)',
    high: 'var(--clr-danger)',
  };

  return (
    <div className="crowd-map" id="crowd-map-view">
      <div className="crowd-map__header">
        <h1 className="crowd-map__title">Crowd Intelligence</h1>
        <p className="crowd-map__subtitle">Real-time density across all venue zones</p>
      </div>

      <div className="crowd-map__legend glass">
        <div className="crowd-map__legend-item">
          <span className="crowd-map__legend-dot crowd-map__legend-dot--low" />
          Low (&lt;45%)
        </div>
        <div className="crowd-map__legend-item">
          <span className="crowd-map__legend-dot crowd-map__legend-dot--medium" />
          Moderate
        </div>
        <div className="crowd-map__legend-item">
          <span className="crowd-map__legend-dot crowd-map__legend-dot--high" />
          High (&gt;75%)
        </div>
      </div>

      <div className="venue-map-container glass">
        <div className="venue-map-container__update">
          <PulseIndicator variant="active" />
          <span>Updated {lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        </div>
        <VenueOverlay selectedZone={selectedZone} onSelectZone={handleSelectZone} />
      </div>

      {selectedZone && (
        <ZoneDetail zoneId={selectedZone} onClose={() => setSelectedZone(null)} />
      )}

      <div className="zone-list">
        <h2 className="zone-list__title">All Zones</h2>
        {sortedZones.map(zone => {
          const density = zones[zone.id] || 50;
          const level = getDensityLevel(density);
          const prevDensity = density; // In real app, compare to previous
          const trendIcon = density > 70 ? '↑' : density < 35 ? '↓' : '→';

          return (
            <div
              key={zone.id}
              className="zone-list-item glass"
              onClick={() => handleSelectZone(zone.id)}
              id={`zone-item-${zone.id}`}
            >
              <span
                className="zone-list-item__indicator"
                style={{ background: colorMap[level], boxShadow: `0 0 6px ${colorMap[level]}` }}
              />
              <span className="zone-list-item__name">{zone.name}</span>
              <span className="zone-list-item__density" style={{ color: colorMap[level] }}>
                {density}%
              </span>
              <span className="zone-list-item__trend" style={{ color: colorMap[level] }}>
                {trendIcon}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
