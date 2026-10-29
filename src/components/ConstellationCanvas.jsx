import { useMemo } from 'react';
import { positionForIndex, starIntensity, isDoneToday, currentStreak } from '../lib/habits.js';

// Renders habit stars, labels, and glowing creation-order connections.
export default function ConstellationCanvas({ habits, id = 'hero-constellation', compact = false }) {
  const stars = useMemo(
    () =>
      habits.map((habit, index) => ({
        habit,
        ...positionForIndex(index),
        intensity: starIntensity(habit),
        streak: currentStreak(habit),
        done: isDoneToday(habit),
      })),
    [habits]
  );

  return (
    <svg
      id={id}
      className={compact ? 'constellation compact' : 'constellation'}
      viewBox="0 0 600 270"
      role="img"
      aria-label={`Constellation with ${habits.length} habit stars`}
    >
      <defs>
        <filter id="starBlur" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>

      {/* Faint background stars */}
      {Array.from({ length: 45 }).map((_, i) => (
        <circle
          key={i}
          cx={(i * 83) % 600}
          cy={(i * 47) % 270}
          r={i % 5 === 0 ? 1.5 : 0.9}
          fill="#dbeafe"
          className="twinkle"
          style={{ animationDelay: `${(i % 8) * 0.35}s` }}
        />
      ))}

      {/* Connections in creation order */}
      {stars.slice(0, -1).map((star, i) => {
        const next = stars[i + 1];
        const bothDone = star.done && next.done;
        return (
          <line
            key={`${star.habit.id}-${next.habit.id}`}
            x1={star.x}
            y1={star.y}
            x2={next.x}
            y2={next.y}
            stroke="url(#lineGlow)"
            strokeWidth={bothDone ? 2.4 : 1.1}
            opacity={bothDone ? 0.95 : 0.32}
            strokeLinecap="round"
          />
        );
      })}

      {stars.map(({ habit, x, y, intensity, done }) => {
        const radius = 6 + Math.min(intensity * 5, 8);
        return (
          <g key={habit.id} className="star-group">
            <circle cx={x} cy={y} r={radius * 2.1} fill={habit.color} opacity={0.22 * intensity} filter="url(#starBlur)" />
            <circle
              cx={x}
              cy={y}
              r={radius}
              fill={habit.color}
              className="twinkle"
              opacity={Math.min(1, intensity)}
            />
            <circle cx={x} cy={y} r={radius * 0.38} fill="#fff" opacity={done ? 0.95 : 0.35} />
            <text x={x} y={y + radius + 15} textAnchor="middle" className="star-label">
              {habit.name.length > 16 ? `${habit.name.slice(0, 15)}…` : habit.name}
            </text>
          </g>
        );
      })}

      {/* Mountain silhouette */}
      <path
        d="M0 250 L90 205 L155 240 L235 195 L320 245 L410 205 L500 245 L600 215 V270 H0 Z"
        fill="#0a1029"
        opacity=".9"
      />
    </svg>
  );
}