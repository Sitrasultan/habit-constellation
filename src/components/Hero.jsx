import { useEffect, useRef, useState } from 'react';
import ConstellationCanvas from './ConstellationCanvas.jsx';
import StatCard from './StatCard.jsx';

export default function Hero({
  greeting,
  userName,
  constellationName,
  habits,
  completedToday,
  bestStreak,
  onRename,
  onSave,
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(constellationName);
  const svgRef = useRef(null);

  useEffect(() => setDraft(constellationName), [constellationName]);

  const exportPNG = async () => {
    const svg = svgRef.current || document.getElementById('hero-constellation');
    if (!svg) return;

    const serialized = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([serialized], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 540;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, 540);
      gradient.addColorStop(0, '#141b3d');
      gradient.addColorStop(1, '#0b1230');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      const link = document.createElement('a');
      link.download = `${constellationName || 'constellation'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = url;
  };

  return (
    <section className="hero glass">
      <div className="hero-head">
        <div>
          <p className="eyebrow">{greeting},</p>
          <h2>{userName}</h2>
        </div>

        <div className="constellation-title">
          {editing ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                onRename(draft);
                setEditing(false);
              }}
            >
              <input
                autoFocus
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onBlur={() => {
                  onRename(draft);
                  setEditing(false);
                }}
                aria-label="Constellation name"
              />
            </form>
          ) : (
            <button className="name-edit" onClick={() => setEditing(true)}>
              {constellationName}
            </button>
          )}
          <span className="muted">Tap the name to rename</span>
        </div>
      </div>

      <div className="hero-canvas">
        <ConstellationCanvas habits={habits} />
      </div>

      <div className="hero-actions">
        <button className="ghost-button" onClick={onSave}>
          Save Snapshot
        </button>
        <button id="export-constellation" className="primary-button" onClick={exportPNG}>
          Export Constellation
        </button>
      </div>

      <div className="stat-row">
        <StatCard
          label="Today"
          value={`${completedToday}/${habits.length}`}
          sub="habits completed"
          accent="#60a5fa"
        />
        <StatCard
          label="Current streak"
          value={`${bestStreak} ${bestStreak === 1 ? 'day' : 'days'}`}
          sub="keep the sky lit"
          accent="#fbbf24"
        />
        <StatCard
          label="Active habits"
          value={habits.length}
          sub="stars in view"
          accent="#2dd4bf"
        />
      </div>
    </section>
  );
}