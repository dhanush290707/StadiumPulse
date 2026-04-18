import { useUser } from '../../context/UserContext';
import NotificationPanel from '../common/NotificationPanel';

export default function Header({ showNotifications, onToggleNotifications }) {
  const { userInitials, seat, openSeatModal } = useUser();

  return (
    <>
      <header className="app-header glass-strong" id="app-header">
        <div className="app-header__brand">
          <div className="app-header__logo">SP</div>
          <div className="app-header__name">
            Stadium<span>Pulse</span>
          </div>
        </div>
        <div className="app-header__right">
          <button
            className="app-header__seat-badge"
            onClick={openSeatModal}
            title="Edit seat"
            id="header-seat-btn"
          >
            🎟️ {seat.section}-{seat.row}{seat.seat}
          </button>
          <button
            className="app-header__notification"
            id="notification-btn"
            aria-label="Notifications"
            onClick={onToggleNotifications}
          >
            🔔
            <span className="app-header__notification-badge" />
          </button>
          <div className="app-header__avatar" title="Profile">
            {userInitials}
          </div>
        </div>
      </header>
      <NotificationPanel isOpen={showNotifications} onClose={onToggleNotifications} />
    </>
  );
}
