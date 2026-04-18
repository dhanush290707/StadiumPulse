import { useState, useEffect } from 'react';
import { useEvent } from '../../context/EventContext';

export default function AlertBanner() {
  const { currentAlert } = useEvent();
  const [visible, setVisible] = useState(true);
  const [displayAlert, setDisplayAlert] = useState(currentAlert);

  useEffect(() => {
    // Animate out then in when alert changes
    setVisible(false);
    const timer = setTimeout(() => {
      setDisplayAlert(currentAlert);
      setVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentAlert]);

  if (!displayAlert) return null;

  return (
    <div
      className={`alert-banner alert-banner--${displayAlert.type}`}
      id="alert-banner"
      role="alert"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-8px)',
        transition: 'all 0.3s ease',
      }}
    >
      <span className="alert-banner__icon">{displayAlert.icon}</span>
      <div className="alert-banner__content">
        <div className="alert-banner__title">{displayAlert.title}</div>
        <div className="alert-banner__text">{displayAlert.text}</div>
      </div>
    </div>
  );
}
