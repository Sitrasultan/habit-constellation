const KEY = 'habit-constellation-v1';

export const defaultState = {
  habits: [],
  constellations: [],
  settings: {
    userName: 'Stargazer',
    currentConstellationName: 'My First Sky',
  },
};

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return {
      ...defaultState,
      ...parsed,
      settings: { ...defaultState.settings, ...(parsed.settings || {}) },
    };
  } catch {
    return defaultState;
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}