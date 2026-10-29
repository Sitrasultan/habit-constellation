import { useMemo } from 'react';
import { currentStreak, isDoneToday, longestStreak } from '../lib/habits.js';
import { lastNDays } from '../lib/dates.js';

export default function StatisticsPage({ habits }) {
  const days = useMemo(() => lastNDays(7), []);
  const weekly = days.map((day) => ({
    ...day,
    count: habits.filter((habit) => habit.completions.includes(day.key)).length,
  }));
  const max = Math.max(1, habits.length);
  const bestStreak = habits.reduce((max, h) => Math.max(max, longestStreak(h)), 0);

  return (
    <div className="page">
      <section className="section">
        <h1>Statistics</h1>
        <p className="muted">A simple view of your last seven days.</p>
      </section>

      <section className="glass chart-card">
        <h2>Weekly completions</h2>
        <div className="bars">
          {weekly.map((day) => (
            <div key={day.key} className="bar-column">
              <div
                className="bar"
                style={{ height: `${(day.count / max) * 100}%` }}
                title={`${day.count} completed`}
              />
              <small>{day.label}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="stat-row">
        <article className="stat-card glass">
          <p className="stat-label">Best streak</p>
          <strong className="stat-value">{bestStreak}</strong>
        </article>
        <article className="stat-card glass">
          <p className="stat-label">Completed today</p>
          <strong className="stat-value">{habits.filter(isDoneToday).length}</strong>
        </article>
        <article className="stat-card glass">
          <p className="stat-label">Strongest current streak</p>
          <strong className="stat-value">
            {habits.reduce((max, h) => Math.max(max, currentStreak(h)), 0)}
          </strong>
        </article>
      </section>
    </div>
  );
}