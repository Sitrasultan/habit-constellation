export default function SettingsPage({ settings, dispatch, onRequestReset }) {
  return (
    <div className="page">
      <section className="section">
        <h1>Settings</h1>
        <p className="muted">Personalize your constellation experience.</p>
      </section>

      <section className="glass settings-card">
        <label className="field">
          <span>Your name</span>
          <input
            value={settings.userName}
            onChange={(event) =>
              dispatch({
                type: 'updateSettings',
                patch: { userName: event.target.value },
              })
            }
          />
        </label>

        <label className="field">
          <span>Current constellation name</span>
          <input
            value={settings.currentConstellationName}
            onChange={(event) =>
              dispatch({
                type: 'updateSettings',
                patch: { currentConstellationName: event.target.value },
              })
            }
          />
        </label>

        <button
  type="button"
  className="danger-button"
  onClick={onRequestReset}
>
  Reset all data
</button>
      </section>
    </div>
  );
}