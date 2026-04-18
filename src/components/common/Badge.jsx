export default function Badge({ level, children }) {
  return (
    <span className={`badge badge--${level}`}>
      {children}
    </span>
  );
}
