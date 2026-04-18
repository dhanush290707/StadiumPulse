import '../../styles/components.css';

const NAV_ITEMS = [
  { id: 'dashboard', icon: '🏠', label: 'Home' },
  { id: 'crowd', icon: '📊', label: 'Crowd' },
  { id: 'food', icon: '🍔', label: 'Order' },
  { id: 'ticket', icon: '🎟️', label: 'Ticket' },
  { id: 'navigate', icon: '🧭', label: 'Navigate' },
  { id: 'live', icon: '📺', label: 'Live' },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="bottom-nav glass-strong" role="navigation" aria-label="Main navigation" id="main-nav">
      <div className="bottom-nav__items">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            className={`bottom-nav__item ${activeTab === item.id ? 'bottom-nav__item--active' : ''}`}
            onClick={() => onTabChange(item.id)}
            aria-label={item.label}
            aria-current={activeTab === item.id ? 'page' : undefined}
          >
            <span className="bottom-nav__icon">{item.icon}</span>
            <span className="bottom-nav__label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
