export default function ProgressCard({ completed, total, date }) {
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const dateLabel = date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="progress-card glass">
      <div className="section-head">
        <h2>Today’s Progress</h2>
        <span className="muted">{dateLabel}</span>
      </div>

      <p className="progress-count">
        <strong>{completed}</strong> of {total} habits
      </p>

      <div
        className="progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={completed}
        aria-label="Today's completion"
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>

      <p className="muted">{percent}% of today’s constellation is glowing.</p>
    </section>
  );
}