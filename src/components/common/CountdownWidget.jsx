import { useState, useEffect } from 'react';
import '../../styles/extras.css';

export default function CountdownWidget({ label = 'Halftime', targetMinutes = 12 }) {
  const [seconds, setSeconds] = useState(targetMinutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="countdown-widget glass" id="countdown-widget">
      <span style={{ fontSize: 'var(--fs-xl)' }}>⏱️</span>
      <span className="countdown-widget__label">{label} in</span>
      <div className="countdown-widget__time">
        <div className="countdown-widget__unit">
          <span className="countdown-widget__value">{String(mins).padStart(2, '0')}</span>
          <span className="countdown-widget__unit-label">min</span>
        </div>
        <span className="countdown-widget__separator">:</span>
        <div className="countdown-widget__unit">
          <span className="countdown-widget__value">{String(secs).padStart(2, '0')}</span>
          <span className="countdown-widget__unit-label">sec</span>
        </div>
      </div>
    </div>
  );
}
