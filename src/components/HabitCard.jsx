import { useState } from 'react';
import { MoreHorizontal, Archive, Trash2, Check } from 'lucide-react';
import ConfirmModal from './ui/ConfirmModal.jsx';
import { currentStreak, isDoneToday } from '../lib/habits.js';
import { currentWeek } from '../lib/dates.js';

export default function HabitCard({ habit, onToggle, onArchive, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const done = isDoneToday(habit);
  const streak = currentStreak(habit);
  const week = currentWeek();

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <article
        className="habit-card glass"
        style={{ '--habit-color': habit.color }}
        aria-label={`${habit.name}, ${streak} day streak`}
      >
        <div className="habit-top">
          <div
            className="habit-icon"
            style={{
              background: `${habit.color}22`,
              color: habit.color,
            }}
            aria-hidden="true"
          >
            <span>{habit.icon}</span>
          </div>

          <div className="habit-title">
            <h3>{habit.name}</h3>
            <span className="muted">{streak}-day streak</span>
          </div>

          <div className="habit-menu">
            <button
              type="button"
              className="icon-button"
              aria-label={`Options for ${habit.name}`}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <MoreHorizontal size={18} strokeWidth={2} aria-hidden="true" />
            </button>

            {menuOpen && (
              <div className="menu" role="menu" aria-label={`${habit.name} options`}>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onArchive();
                    closeMenu();
                  }}
                >
                  <Archive size={16} strokeWidth={2} aria-hidden="true" />
                  {habit.archived ? 'Restore' : 'Archive'}
                </button>

                <button
                  type="button"
                  role="menuitem"
                  className="danger"
                  onClick={() => {
                    setConfirmAction('delete');
                    closeMenu();
                  }}
                >
                  <Trash2 size={16} strokeWidth={2} aria-hidden="true" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className={done ? 'toggle done' : 'toggle'}
          onClick={onToggle}
          aria-pressed={done}
        >
          <span className="toggle-circle" aria-hidden="true">
            {done ? <Check size={14} strokeWidth={3} /> : ''}
          </span>
          {done ? 'Completed today' : 'Mark complete'}
        </button>

        <div className="week" aria-label="Current week completion">
          {week.map((day) => {
            const lit = habit.completions.includes(day.key);

            return (
              <div key={day.key} className="day">
                <span
                  className={lit ? 'dot lit' : 'dot'}
                  role="img"
                  aria-label={
                    lit ? `${day.label}: completed` : `${day.label}: not completed`
                  }
                />
                <small className={day.isToday ? 'today' : ''}>{day.label}</small>
              </div>
            );
          })}
        </div>
      </article>

      <ConfirmModal
        open={confirmAction === 'delete'}
        destructive
        title={`Delete “${habit.name}”?`}
        description="This permanently removes the habit and its completion history. This cannot be undone."
        confirmLabel="Delete habit"
        onCancel={() => setConfirmAction(null)}
        onConfirm={() => {
          onDelete();
          setConfirmAction(null);
        }}
      />
    </>
  );
}