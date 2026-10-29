// All dates are stored as local YYYY-MM-DD strings.
export const toKey = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const todayKey = () => toKey(new Date());

export const addDays = (date, days) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

// Current week, always Monday through Sunday.
export const currentWeek = () => {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(monday, i);
    return {
      key: toKey(date),
      label: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      isToday: toKey(date) === todayKey(),
      isFuture: date > now,
    };
  });
};

export const lastNDays = (n) => {
  const now = new Date();
  return Array.from({ length: n }, (_, i) => {
    const date = addDays(now, -(n - 1 - i));
    return { key: toKey(date), label: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()] };
  });
};