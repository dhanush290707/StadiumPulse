export default function PulseIndicator({ variant = 'live' }) {
  return (
    <span className={`pulse-indicator pulse-indicator--${variant}`}>
      <span className="pulse-indicator__ring" />
      <span className="pulse-indicator__dot" />
    </span>
  );
}
