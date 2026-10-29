import { todayKey } from '../lib/dates.js';

const uid = () =>
  (crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`).toString();

export const HABIT_COLORS = [
  { name: 'Purple', value: '#a78bfa' },
  { name: 'Blue', value: '#60a5fa' },
  { name: 'Teal', value: '#2dd4bf' },
  { name: 'Amber', value: '#fbbf24' },
  { name: 'Coral', value: '#fb7185' },
  { name: 'Pink', value: '#f472b6' },
];

export const HABIT_ICONS = ['✦', '☾', '☀', '❋', '◆', '✧', '❍', '✺'];

export function createInitialState() {
  return {
    habits: [],
    constellations: [],
    settings: {
      userName: 'Stargazer',
      currentConstellationName: 'My First Sky',
    },
  };
}

export function appReducer(state, action) {
  switch (action.type) {
    case 'hydrate':
      return action.state;

    case 'addHabit': {
      const name = action.name.trim();
      if (!name) return state;

      const habit = {
        id: uid(),
        name,
        icon: HABIT_ICONS[state.habits.length % HABIT_ICONS.length],
        color: action.color,
        createdAt: new Date().toISOString(),
        archived: false,
        completions: [],
      };
      return { ...state, habits: [...state.habits, habit] };
    }

    case 'toggleHabit': {
      const key = todayKey();
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.id
            ? {
                ...habit,
                completions: habit.completions.includes(key)
                  ? habit.completions.filter((d) => d !== key)
                  : [...habit.completions, key],
              }
            : habit
        ),
      };
    }

    case 'deleteHabit':
      return {
        ...state,
        habits: state.habits.filter((habit) => habit.id !== action.id),
      };

    case 'archiveHabit':
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.id ? { ...habit, archived: !habit.archived } : habit
        ),
      };

    case 'renameConstellation':
      return {
        ...state,
        settings: {
          ...state.settings,
          currentConstellationName: action.name.trim() || 'Untitled Sky',
        },
      };

    case 'saveConstellation': {
      const activeIds = state.habits.filter((h) => !h.archived).map((h) => h.id);
      if (!activeIds.length) return state;

      return {
        ...state,
        constellations: [
          {
            id: uid(),
            name: state.settings.currentConstellationName,
            habitIds: activeIds,
            createdAt: new Date().toISOString(),
          },
          ...state.constellations,
        ],
      };
    }

    case 'deleteConstellation':
      return {
        ...state,
        constellations: state.constellations.filter((c) => c.id !== action.id),
      };

    case 'updateSettings':
      return { ...state, settings: { ...state.settings, ...action.patch } };

    case 'resetData':
      return createInitialState();

    default:
      return state;
  }
}