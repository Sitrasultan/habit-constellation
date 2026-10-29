import HabitCard from './HabitCard.jsx';
import HabitForm from './HabitForm.jsx';
import { HABIT_COLORS } from '../state/appReducer.js';

export default function MyHabitsPage({ state, dispatch }) {
  const active = state.habits.filter((habit) => !habit.archived);
  const archived = state.habits.filter((habit) => habit.archived);

  return (
    <div className="page">
      <section className="section">
        <h1>My Habits</h1>
        <p className="muted">Track daily check-ins and manage your stars.</p>
      </section>

      <HabitForm onAdd={(payload) => dispatch({ type: 'addHabit', ...payload })} />

      <section className="section">
        <h2>Active</h2>
        {active.length === 0 ? (
          <p className="muted">No active habits yet.</p>
        ) : (
          <div className="habit-grid">
            {active.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={() => dispatch({ type: 'toggleHabit', id: habit.id })}
                onArchive={() => dispatch({ type: 'archiveHabit', id: habit.id })}
                onDelete={() => dispatch({ type: 'deleteHabit', id: habit.id })}
              />
            ))}
          </div>
        )}
      </section>

      {archived.length > 0 && (
        <section className="section">
          <h2>Archived</h2>
          <div className="habit-grid">
            {archived.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={() => dispatch({ type: 'toggleHabit', id: habit.id })}
                onArchive={() => dispatch({ type: 'archiveHabit', id: habit.id })}
                onDelete={() => dispatch({ type: 'deleteHabit', id: habit.id })}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}