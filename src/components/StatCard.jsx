export default function StatCard({ label, value, sub, accent = '#a78bfa' }) {
  return (
    <article className="stat-card" style={{ '--accent': accent }}>
      <p className="stat-label">{label}</p>
      <strong className="stat-value">{value}</strong>
      {sub && <span className="stat-sub">{sub}</span>}
    </article>
  );
}