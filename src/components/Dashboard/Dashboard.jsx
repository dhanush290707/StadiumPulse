import EventHero from './EventHero';
import AlertBanner from './AlertBanner';
import QuickActions from './QuickActions';
import CountdownWidget from '../common/CountdownWidget';
import { useEvent } from '../../context/EventContext';
import { SMART_INSIGHTS } from '../../data/mockData';
import '../../styles/dashboard.css';

export default function Dashboard({ onNavigate }) {
  const { orders, scores } = useEvent();

  // Determine countdown label based on game quarter
  const countdownLabel = scores.quarter <= 2 ? 'Halftime' : 'End of Game';
  const countdownMins = scores.quarter <= 2 ? 12 : 20;

  return (
    <div className="dashboard" id="dashboard-view">
      <EventHero />
      <AlertBanner />
      <CountdownWidget label={countdownLabel} targetMinutes={countdownMins} />
      <QuickActions onNavigate={onNavigate} />

      {/* Active Orders */}
      {orders.length > 0 && (
        <section className="insights-section" style={{ animationDelay: '0.2s' }}>
          <h2 className="insights-section__title">Active Orders</h2>
          <div className="insights-grid">
            {orders.map(order => (
              <div
                key={order.id}
                className="insight-card glass"
                onClick={() => onNavigate('food')}
                id={`order-${order.id}`}
              >
                <div
                  className="insight-card__icon"
                  style={{
                    background: order.status === 'ready'
                      ? 'hsla(160, 84%, 39%, 0.15)'
                      : 'hsla(217, 91%, 60%, 0.15)'
                  }}
                >
                  {order.vendorEmoji}
                </div>
                <div className="insight-card__content">
                  <div className="insight-card__label">{order.vendorName}</div>
                  <div className="insight-card__value">
                    {order.status === 'placed' && '⏳ Order placed'}
                    {order.status === 'preparing' && '👨‍🍳 Being prepared'}
                    {order.status === 'ready' && '✅ Ready for pickup!'}
                  </div>
                </div>
                <span className="insight-card__arrow">→</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Smart Insights */}
      <section className="insights-section">
        <h2 className="insights-section__title">Smart Insights</h2>
        <div className="insights-grid stagger">
          {SMART_INSIGHTS.map((insight, i) => (
            <div
              key={i}
              className="insight-card glass"
              onClick={() => insight.action && onNavigate(insight.action)}
              id={`insight-${i}`}
              style={{ cursor: insight.action ? 'pointer' : 'default' }}
            >
              <div className="insight-card__icon" style={{ background: insight.iconBg }}>
                {insight.icon}
              </div>
              <div className="insight-card__content">
                <div className="insight-card__label">{insight.label}</div>
                <div className="insight-card__value">{insight.value}</div>
              </div>
              {insight.action && <span className="insight-card__arrow">→</span>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
