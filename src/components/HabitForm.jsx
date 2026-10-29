import { useState } from 'react';
import { HABIT_COLORS } from '../state/appReducer.js';

export default function HabitForm({ onAdd }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(HABIT_COLORS[0].value);

  const submit = (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    onAdd({ name, color });
    setName('');
  };

  return (
    <section className="habit-form glass">
      <h2>Create New Habit</h2>
      <p className="muted">Name a small daily action and choose its star color.</p>

      <form onSubmit={submit}>
        <label className="field">
          <span>Habit name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Read 10 pages"
            maxLength={40}
          />
        </label>

        <div className="swatches" role="radiogroup" aria-label="Star color">
          {HABIT_COLORS.map((option) => (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={color === option.value}
              aria-label={option.name}
              className={color === option.value ? 'swatch selected' : 'swatch'}
              style={{ background: option.value }}
              onClick={() => setColor(option.value)}
            />
          ))}
        </div>

        <button type="submit" className="primary-button full">
          Add Habit
        </button>
      </form>
    </section>
  );
}