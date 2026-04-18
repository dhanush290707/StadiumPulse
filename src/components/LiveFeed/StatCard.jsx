export default function StatCard({ stat }) {
  const total = stat.home + stat.away;
  const homePercent = total > 0 ? (stat.home / total) * 100 : 50;
  const awayPercent = 100 - homePercent;

  const isTime = stat.label.includes('Time');
  const formatValue = (val) => isTime ? `${val.toFixed(0)}:${((val % 1) * 60).toFixed(0).padStart(2, '0')}` : val;

  return (
    <div className="stat-card glass" id={`stat-${stat.label.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="stat-card__label">{stat.label}</div>
      <div className="stat-card__values">
        <span className="stat-card__value" style={{ color: 'var(--clr-primary-light)' }}>
          {formatValue(stat.home)}
        </span>
        <span className="stat-card__value" style={{ color: 'var(--clr-danger-light)' }}>
          {formatValue(stat.away)}
        </span>
      </div>
      <div className="stat-card__bar">
        <div
          className="stat-card__bar-fill stat-card__bar-fill--home"
          style={{ width: `${homePercent}%` }}
        />
        <div
          className="stat-card__bar-fill stat-card__bar-fill--away"
          style={{ width: `${awayPercent}%` }}
        />
      </div>
    </div>
  );
}
