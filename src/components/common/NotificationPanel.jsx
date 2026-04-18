import { useState, useEffect } from 'react';
import { useEvent } from '../../context/EventContext';
import '../../styles/extras.css';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    icon: '🏈',
    iconBg: 'hsla(0, 80%, 48%, 0.15)',
    title: 'Game Started!',
    text: 'KC Chiefs vs SF 49ers is now LIVE. Enjoy the game!',
    time: '4:25 PM',
    unread: false,
  },
  {
    id: 'n2',
    icon: '🎟️',
    iconBg: 'hsla(217, 91%, 60%, 0.15)',
    title: 'Ticket Activated',
    text: 'Your digital ticket for Section 108, Row J, Seat 14 has been activated.',
    time: '3:45 PM',
    unread: false,
  },
  {
    id: 'n3',
    icon: '🅿️',
    iconBg: 'hsla(160, 84%, 39%, 0.15)',
    title: 'Parking Confirmed',
    text: 'Your parking spot in Lot C, Row 12 is reserved. Gate opens at 2:00 PM.',
    time: '2:00 PM',
    unread: false,
  },
  {
    id: 'n4',
    icon: '☀️',
    iconBg: 'hsla(38, 92%, 50%, 0.15)',
    title: 'Weather Update',
    text: 'Clear skies expected throughout the game. UV Index: Low. Stay hydrated!',
    time: '1:30 PM',
    unread: false,
  },
  {
    id: 'n5',
    icon: '🔒',
    iconBg: 'hsla(280, 67%, 55%, 0.15)',
    title: 'Bag Policy Reminder',
    text: 'Clear bags only (12"x6"x12" max). Small clutch bags allowed. No backpacks.',
    time: '12:00 PM',
    unread: false,
  },
];

export default function NotificationPanel({ isOpen, onClose }) {
  const { currentAlert, timeline } = useEvent();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Add new notifications when timeline events come in
  useEffect(() => {
    if (timeline.length > 10) {
      const latest = timeline[0];
      const exists = notifications.find(n => n.id === `game-${latest.id}`);
      if (!exists) {
        setNotifications(prev => [{
          id: `game-${latest.id}`,
          icon: latest.type === 'score' ? '🏈' : latest.type === 'penalty' ? '🟡' : 'ℹ️',
          iconBg: latest.type === 'score' ? 'hsla(160, 84%, 39%, 0.15)' : 'hsla(38, 92%, 50%, 0.15)',
          title: latest.title,
          text: latest.desc,
          time: latest.time,
          unread: true,
        }, ...prev]);
      }
    }
  }, [timeline]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <>
      <div className="notification-overlay" onClick={onClose} id="notification-overlay" />
      <div className="notification-panel glass-strong" id="notification-panel">
        <div className="notification-panel__header">
          <div>
            <h2 className="notification-panel__title">
              Notifications {unreadCount > 0 && <span style={{ color: 'var(--clr-primary-light)', fontSize: 'var(--fs-sm)' }}>({unreadCount} new)</span>}
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'center' }}>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                style={{
                  fontSize: 'var(--fs-xs)',
                  color: 'var(--clr-primary-light)',
                  fontWeight: 600,
                  padding: 'var(--sp-1) var(--sp-3)',
                  borderRadius: 'var(--radius-full)',
                  background: 'hsla(217, 91%, 60%, 0.1)',
                  border: '1px solid hsla(217, 91%, 60%, 0.15)',
                }}
              >
                Mark all read
              </button>
            )}
            <button className="notification-panel__close" onClick={onClose} aria-label="Close notifications">✕</button>
          </div>
        </div>

        <div className="notification-panel__list">
          {notifications.length === 0 ? (
            <div className="notification-panel__empty">
              <span className="notification-panel__empty-icon">🔔</span>
              <span>No notifications yet</span>
            </div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                className={`notification-item glass ${notif.unread ? 'notification-item--unread' : ''}`}
                id={`notif-${notif.id}`}
              >
                <div className="notification-item__icon" style={{ background: notif.iconBg }}>
                  {notif.icon}
                </div>
                <div className="notification-item__content">
                  <div className="notification-item__title">{notif.title}</div>
                  <div className="notification-item__text">{notif.text}</div>
                  <div className="notification-item__time">{notif.time}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
