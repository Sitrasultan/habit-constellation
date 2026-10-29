import ConstellationCanvas from './ConstellationCanvas.jsx';

export default function ConstellationList({
  constellations,
  habits,
  onViewAll,
  onSave,
}) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>Your Constellations</h2>
        <button className="link-button" onClick={onViewAll}>
          View All
        </button>
      </div>

      <div className="constellation-row">
        {constellations.length === 0 && (
          <article className="mini-card glass">
            <h3>No saved skies yet</h3>
            <p className="muted">
              Save a snapshot once today’s habits begin to shine.
            </p>
            <button className="ghost-button" onClick={onSave}>
              Save Current Sky
            </button>
          </article>
        )}

        {constellations.slice(0, 4).map((constellation) => {
          const selected = habits.filter((habit) =>
            constellation.habitIds.includes(habit.id)
          );
          const days = Math.max(
            1,
            Math.ceil(
              (Date.now() - new Date(constellation.createdAt)) / 86400000
            )
          );

          return (
            <article key={constellation.id} className="mini-card glass">
              <ConstellationCanvas
                habits={selected}
                compact
                id={`thumb-${constellation.id}`}
              />
              <h3>{constellation.name}</h3>
              <p className="muted">
                {selected.length} habits • {days} {days === 1 ? 'day' : 'days'}
              </p>
            </article>
          );
        })}

        <article className="mini-card export-card glass">
          <h3>Keep your sky</h3>
          <p className="muted">
            Download the current constellation as a shareable PNG.
          </p>
          <button
            className="primary-button"
            onClick={() =>
              document.getElementById('export-constellation')?.click()
            }
          >
            Export Constellation
          </button>
        </article>
      </div>
    </section>
  );
}