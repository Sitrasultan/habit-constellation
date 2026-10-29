import { todayKey, toKey, addDays } from './dates.js';

// A streak counts consecutive completed days ending today,
// or ending yesterday if today has not been checked yet.
export function currentStreak(habit) {
  const done = new Set(habit.completions);
  let date = new Date();

  if (!done.has(toKey(date))) {
    date = addDays(date, -1);
    if (!done.has(toKey(date))) return 0;
  }

  let streak = 0;
  while (done.has(toKey(date))) {
    streak += 1;
    date = addDays(date, -1);
  }
  return streak;
}

export function longestStreak(habit) {
  const sorted = [...habit.completions].sort();
  let best = 0;
  let run = 0;
  let previous = null;

  for (const key of sorted) {
    const date = new Date(`${key}T00:00:00`);
    const isNextDay = previous && toKey(addDays(previous, 1)) === key;
    run = isNextDay ? run + 1 : 1;
    best = Math.max(best, run);
    previous = date;
  }
  return best;
}

export const isDoneToday = (habit) => habit.completions.includes(todayKey());

// Brightness falls off after missed days, but never below a visible minimum.
export function starIntensity(habit) {
  const streak = currentStreak(habit);
  const doneToday = isDoneToday(habit);
  const base = doneToday ? 1 : 0.58;
  const streakBoost = Math.min(streak / 10, 1) * 0.35;
  return Math.min(1.25, base + streakBoost);
}

export const STAR_POSITIONS = [
  { x: 120, y: 95 },
  { x: 235, y: 55 },
  { x: 330, y: 125 },
  { x: 190, y: 175 },
  { x: 400, y: 70 },
  { x: 450, y: 170 },
  { x: 80, y: 190 },
  { x: 285, y: 225 },
  { x: 520, y: 115 },
  { x: 560, y: 210 },
  { x: 35, y: 115 },
  { x: 500, y: 35 },
];

export const positionForIndex = (i) =>
  STAR_POSITIONS[i % STAR_POSITIONS.length];