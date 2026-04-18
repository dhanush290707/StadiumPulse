import { useEvent } from '../../context/EventContext';
import { formatPrice } from '../../data/mockData';

const STEPS = [
  { key: 'placed', label: 'Placed', icon: '📝' },
  { key: 'preparing', label: 'Preparing', icon: '👨‍🍳' },
  { key: 'ready', label: 'Ready', icon: '✅' },
];

export default function OrderTracker() {
  const { orders, dismissOrder } = useEvent();

  if (orders.length === 0) return null;

  return (
    <div className="stagger" id="order-tracker-section">
      {orders.map(order => {
        const currentIndex = STEPS.findIndex(s => s.key === order.status);

        return (
          <div key={order.id} className="order-tracker glass" id={`tracker-${order.id}`}>
            <div className="order-tracker__title">
              <span>{order.vendorEmoji}</span>
              <span>{order.vendorName}</span>
              {order.status === 'ready' && (
                <button
                  style={{
                    marginLeft: 'auto',
                    fontSize: 'var(--fs-xs)',
                    color: 'var(--clr-accent-light)',
                    fontWeight: 600,
                    padding: 'var(--sp-1) var(--sp-3)',
                    borderRadius: 'var(--radius-full)',
                    background: 'hsla(160, 84%, 39%, 0.15)',
                    border: '1px solid hsla(160, 84%, 39%, 0.2)',
                  }}
                  onClick={() => dismissOrder(order.id)}
                  id={`dismiss-${order.id}`}
                >
                  Picked Up ✓
                </button>
              )}
            </div>

            <div className="order-tracker__steps">
              {STEPS.map((step, idx) => {
                let dotClass = 'order-step__dot--pending';
                let labelClass = '';
                let connectorClass = '';

                if (idx < currentIndex) {
                  dotClass = 'order-step__dot--done';
                  labelClass = 'order-step__label--done';
                  connectorClass = 'order-step__connector--done';
                } else if (idx === currentIndex) {
                  dotClass = 'order-step__dot--active';
                  labelClass = 'order-step__label--active';
                  connectorClass = idx > 0 ? 'order-step__connector--active' : '';
                }

                return (
                  <div key={step.key} className="order-step">
                    <div className={`order-step__dot ${dotClass}`}>
                      {step.icon}
                    </div>
                    <span className={`order-step__label ${labelClass}`}>{step.label}</span>
                    {idx < STEPS.length - 1 && (
                      <div className={`order-step__connector ${idx < currentIndex ? 'order-step__connector--done' : idx === currentIndex ? 'order-step__connector--active' : ''}`} />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="order-tracker__details">
              <span className="order-tracker__order-id">{order.id}</span>
              <span className="order-tracker__eta">
                {order.status === 'ready' ? '🎉 Pick up now!' : `ETA: ~${order.eta} min`}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
