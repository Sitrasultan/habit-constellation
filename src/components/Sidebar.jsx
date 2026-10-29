import { Home, ListChecks, Moon, BarChart3, Settings } from 'lucide-react';

const NAV = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'habits', label: 'My Habits', Icon: ListChecks },
  { id: 'constellations', label: 'Constellations', Icon: Moon },
  { id: 'statistics', label: 'Statistics', Icon: BarChart3 },
  { id: 'settings', label: 'Settings', Icon: Settings },
];

export default function Sidebar({ page, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">
          <Moon size={20} strokeWidth={2} />
        </div>
        <div>
          <h1>Habit Constellation</h1>
          <p>Small steps • Big dreams</p>
        </div>
      </div>

      <nav className="side-nav" aria-label="Primary">
        {NAV.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            className={page === id ? 'nav-item active' : 'nav-item'}
            onClick={() => onNavigate(id)}
            aria-current={page === id ? 'page' : undefined}
          >
            <Icon size={18} strokeWidth={2} aria-hidden="true" />
            <span className="nav-label">{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-art" aria-hidden="true">
        <svg viewBox="0 0 260 150">
          <defs>
            <linearGradient id="lake-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e2a55" />
              <stop offset="100%" stopColor="#0b1230" />
            </linearGradient>
            <linearGradient id="lake-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#31427a" />
              <stop offset="100%" stopColor="#101736" />
            </linearGradient>
          </defs>

          <rect width="260" height="150" fill="url(#lake-sky)" />
          <circle cx="205" cy="35" r="13" fill="#f8fafc" opacity="0.9" />
          <circle cx="45" cy="30" r="2" fill="#e2e8f0" />
          <circle cx="80" cy="55" r="1.5" fill="#e2e8f0" />
          <circle cx="140" cy="25" r="1.5" fill="#e2e8f0" />

          <path
            d="M0 100 L55 55 L95 90 L135 50 L185 95 L225 65 L260 95 V150 H0 Z"
            fill="#0d1533"
          />
          <rect y="103" width="260" height="47" fill="url(#lake-water)" />
          <path
            d="M35 118 H95 M140 130 H205"
            stroke="#93c5fd"
            strokeWidth="2"
            opacity="0.35"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <blockquote className="quote">
        “The night sky is a reminder that even small lights can guide us home.”
      </blockquote>
    </aside>
  );
}