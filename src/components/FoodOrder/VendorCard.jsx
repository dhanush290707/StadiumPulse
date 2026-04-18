import { getWaitColor, getWaitLevel } from '../../data/mockData';
import Badge from '../common/Badge';

export default function VendorCard({ vendor, waitTime, onClick }) {
  const waitColor = getWaitColor(waitTime);
  const waitLevel = getWaitLevel(waitTime);

  return (
    <div className="vendor-card glass" onClick={onClick} id={`vendor-${vendor.id}`}>
      <div className="vendor-card__image">
        {vendor.emoji}
      </div>
      <div className="vendor-card__info">
        <div className="vendor-card__top">
          <div>
            <div className="vendor-card__name">{vendor.name}</div>
            <div className="vendor-card__cuisine">{vendor.cuisine} · {vendor.location}</div>
          </div>
        </div>
        <div className="vendor-card__meta">
          <span className="vendor-card__wait">
            <span className="vendor-card__wait-dot" style={{ background: waitColor, boxShadow: `0 0 6px ${waitColor}` }} />
            ~{waitTime} min
          </span>
          <span className="vendor-card__distance">📍 {vendor.distance}</span>
          <span className="vendor-card__rating">
            ⭐ {vendor.rating}
          </span>
        </div>
      </div>
    </div>
  );
}
