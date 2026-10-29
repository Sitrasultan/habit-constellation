export default function Skeleton({ width = '100%', height = 16, radius = 'var(--radius-sm)' }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  );
}