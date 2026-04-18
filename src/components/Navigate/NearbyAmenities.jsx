import { useState, useMemo } from 'react';
import { useEvent } from '../../context/EventContext';
import { AMENITIES, getWaitLevel, getWaitColor } from '../../data/mockData';

const FILTERS = [
  { id: 'all', label: 'All', icon: '📍' },
  { id: 'restroom', label: 'Restrooms', icon: '🚻' },
  { id: 'firstaid', label: 'First Aid', icon: '🏥' },
  { id: 'exit', label: 'Exits', icon: '🚪' },
  { id: 'merchandise', label: 'Merch', icon: '🛍️' },
  { id: 'atm', label: 'ATM', icon: '🏧' },
  { id: 'charging', label: 'Charging', icon: '🔋' },
  { id: 'info', label: 'Info', icon: 'ℹ️' },
];

export default function NearbyAmenities() {
  const { amenityWaits } = useEvent();
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    const list = filter === 'all' ? AMENITIES : AMENITIES.filter(a => a.type === filter);
    return list;
  }, [filter]);

  return (
    <section className="nearby-amenities" id="nearby-amenities">
      <h2 className="nearby-amenities__title">Nearby Amenities</h2>

      <div className="amenity-filters">
        {FILTERS.map(f => (
          <button
            key={f.id}
            className={`amenity-filter-btn ${filter === f.id ? 'amenity-filter-btn--active' : ''}`}
            onClick={() => setFilter(f.id)}
            id={`amenity-filter-${f.id}`}
          >
            <span>{f.icon}</span>
            {f.label}
          </button>
        ))}
      </div>

      <div className="amenity-list stagger">
        {filtered.map(amenity => {
          const wait = amenityWaits[amenity.id] || 0;
          const waitLevel = wait > 0 ? getWaitLevel(wait) : null;
          const waitColor = wait > 0 ? getWaitColor(wait) : null;

          return (
            <div key={amenity.id} className="amenity-card glass" id={`amenity-${amenity.id}`}>
              <div className="amenity-card__icon">{amenity.icon}</div>
              <div className="amenity-card__info">
                <div className="amenity-card__name">{amenity.name}</div>
                <div className="amenity-card__location">{amenity.location}</div>
                {amenity.accessible && (
                  <span className="amenity-card__accessible">♿ Accessible</span>
                )}
              </div>
              <div className="amenity-card__right">
                <div className="amenity-card__distance">{amenity.distance}</div>
                {wait > 0 && (
                  <div className="amenity-card__wait" style={{ color: waitColor }}>
                    ~{wait} min wait
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
