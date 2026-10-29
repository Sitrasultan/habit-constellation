export default function EmptyState({ title, description, action }) {
  return (
    <div className="empty-state">
      <svg viewBox="0 0 240 150" className="empty-art" aria-hidden="true">
        <defs>
          <radialGradient id="empty-glow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="240" height="150" fill="url(#empty-glow)" />

        <circle cx="120" cy="62" r="18" fill="#c4b5fd" opacity="0.9" />
        <circle cx="120" cy="62" r="30" fill="none" stroke="#a78bfa" strokeOpacity="0.35" />

        <path
          d="M48 112 Q120 78 192 112"
          stroke="#93c5fd"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        <circle cx="48" cy="112" r="4" fill="#93c5fd" />
        <circle cx="192" cy="112" r="4" fill="#fbbf24" />

        <circle cx="35" cy="35" r="1.6" fill="#e0e7ff" />
        <circle cx="205" cy="45" r="1.4" fill="#e0e7ff" />
        <circle cx="170" cy="22" r="1.2" fill="#e0e7ff" />
      </svg>

      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  );
}