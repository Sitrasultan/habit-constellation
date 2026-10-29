import ConstellationCanvas from './ConstellationCanvas.jsx';

export default function ConstellationsPage({ state, dispatch }) {
  return (
    <div className="page">
      <section className="section">
        <h1>Constellations</h1>
        <p className="muted">Saved snapshots of your habit skies.</p>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Current sky</h2>
          <button
            className="primary-button"
            onClick={() => dispatch({ type: 'saveConstellation' })}
          >
            Save Snapshot
          </button>
        </div>
        <ConstellationCanvas
          habits={state.habits.filter((habit) => !habit.archived)}
          id="current-sky"
        />
      </section>

      <section className="section">
        <h2>Saved</h2>
        {state.constellations.length === 0 ? (
          <p className="muted">No constellations saved yet.</p>
        ) : (
          <div className="constellation-row">
            {state.constellations.map((constellation) => {
              const selected = state.habits.filter((habit) =>
                constellation.habitIds.includes(habit.id)
              );
              return (
                <article key={constellation.id} className="mini-card glass">
                  <ConstellationCanvas habits={selected} compact id={`page-${constellation.id}`} />
                  <h3>{constellation.name}</h3>
                  <p className="muted">
                    {selected.length} habits •{' '}
                    {new Date(constellation.createdAt).toLocaleDateString()}
                  </p>
                  <button
                    className="danger-link"
                    onClick={() => dispatch({ type: 'deleteConstellation', id: constellation.id })}
                  >
                    Delete
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}