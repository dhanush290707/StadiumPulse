export default function ProgressRing({
  value = 0,
  max = 100,
  size = 48,
  strokeWidth = 4,
  color = 'var(--clr-primary)',
  showText = true,
  label = '',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  const offset = circumference * (1 - pct);

  return (
    <div className="progress-ring" style={{ width: size, height: size }} title={label}>
      <svg className="progress-ring__svg" width={size} height={size}>
        <circle
          className="progress-ring__bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="progress-ring__fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {showText && (
        <span className="progress-ring__text" style={{ color }}>
          {Math.round(pct * 100)}%
        </span>
      )}
    </div>
  );
}
