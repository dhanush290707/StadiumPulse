import { useEvent } from '../../context/EventContext';

const ACTIONS = [
  { id: 'order-food', icon: '🍔', label: 'Order Food', tab: 'food', color: 'hsla(38, 92%, 50%, 0.15)', borderColor: 'hsla(38, 92%, 50%, 0.2)' },
  { id: 'find-seat', icon: '💺', label: 'Find Seat', tab: 'navigate', color: 'hsla(217, 91%, 60%, 0.15)', borderColor: 'hsla(217, 91%, 60%, 0.2)' },
  { id: 'crowd-map', icon: '📊', label: 'Crowd Map', tab: 'crowd', color: 'hsla(160, 84%, 39%, 0.15)', borderColor: 'hsla(160, 84%, 39%, 0.2)' },
  { id: 'restrooms', icon: '🚻', label: 'Restrooms', tab: 'navigate', color: 'hsla(280, 67%, 55%, 0.15)', borderColor: 'hsla(280, 67%, 55%, 0.2)' },
  { id: 'merch', icon: '🛍️', label: 'Merch Shop', tab: 'navigate', color: 'hsla(14, 83%, 50%, 0.15)', borderColor: 'hsla(14, 83%, 50%, 0.2)' },
  { id: 'live-feed', icon: '📺', label: 'Live Feed', tab: 'live', color: 'hsla(0, 84%, 60%, 0.15)', borderColor: 'hsla(0, 84%, 60%, 0.2)' },
];

export default function QuickActions({ onNavigate }) {
  const { orders } = useEvent();
  const activeOrderCount = orders.length;

  return (
    <section className="quick-actions" id="quick-actions">
      <h2 className="quick-actions__title">Quick Actions</h2>
      <div className="quick-actions__grid">
        {ACTIONS.map(action => (
          <button
            key={action.id}
            id={`quick-${action.id}`}
            className="quick-action-btn glass"
            onClick={() => onNavigate(action.tab)}
            style={{ '--action-bg': action.color }}
          >
            <div
              className="quick-action-btn__icon"
              style={{ background: action.color, border: `1px solid ${action.borderColor}` }}
            >
              {action.icon}
            </div>
            <span className="quick-action-btn__label">{action.label}</span>
            {action.id === 'order-food' && activeOrderCount > 0 && (
              <span className="quick-action-btn__badge">{activeOrderCount}</span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
