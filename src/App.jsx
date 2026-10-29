import { useEffect, useMemo, useReducer, useState } from 'react';
import { Home, ListChecks, Moon, BarChart3, Settings } from 'lucide-react';

import { appReducer, createInitialState } from './state/appReducer.js';
import { loadState, saveState } from './lib/storage.js';
import { currentStreak, isDoneToday } from './lib/habits.js';

import Sidebar from './components/Sidebar.jsx';
import TopBar from './components/TopBar.jsx';
import Hero from './components/Hero.jsx';
import HabitForm from './components/HabitForm.jsx';
import ProgressCard from './components/ProgressCard.jsx';
import HabitCard from './components/HabitCard.jsx';
import ConstellationList from './components/ConstellationList.jsx';
import MyHabitsPage from './components/MyHabitsPage.jsx';
import ConstellationsPage from './components/ConstellationsPage.jsx';
import StatisticsPage from './components/StatisticsPage.jsx';
import SettingsPage from './components/SettingsPage.jsx';

import { ToastProvider, useToast } from './components/ui/ToastProvider.jsx';
import ConfirmModal from './components/ui/ConfirmModal.jsx';
import EmptyState from './components/ui/EmptyState.jsx';

const MOBILE_NAV = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'habits', label: 'Habits', Icon: ListChecks },
  { id: 'constellations', label: 'Skies', Icon: Moon },
  { id: 'statistics', label: 'Stats', Icon: BarChart3 },
  { id: 'settings', label: 'Settings', Icon: Settings },
];

function AppContent() {
  const [state, dispatch] = useReducer(appReducer, createInitialState());
  const [page, setPage] = useState('home');
  const [resetOpen, setResetOpen] = useState(false);
  const { notify } = useToast();

  useEffect(() => {
    dispatch({ type: 'hydrate', state: loadState() });
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const activeHabits = useMemo(
    () => state.habits.filter((habit) => !habit.archived),
    [state.habits]
  );

  const completedToday = useMemo(
    () => activeHabits.filter(isDoneToday).length,
    [activeHabits]
  );

  const bestCurrentStreak = useMemo(
    () => activeHabits.reduce((max, habit) => Math.max(max, currentStreak(habit)), 0),
    [activeHabits]
  );

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  })();

  const handleAddHabit = (payload) => {
    const duplicate = state.habits.some(
      (habit) =>
        habit.name.trim().toLowerCase() === payload.name.trim().toLowerCase()
    );

    if (duplicate) {
      notify({
        type: 'error',
        message: 'A habit with that name already exists.',
      });
      return;
    }

    dispatch({ type: 'addHabit', ...payload });
    notify({
      type: 'success',
      message: `“${payload.name.trim()}” added to your sky.`,
    });
  };

  const handleToggle = (habit) => {
    const wasDone = isDoneToday(habit);
    dispatch({ type: 'toggleHabit', id: habit.id });

    notify({
      type: wasDone ? 'info' : 'success',
      message: wasDone
        ? `Unchecked “${habit.name}”.`
        : `“${habit.name}” completed today.`,
      actionLabel: 'Undo',
      onAction: () => dispatch({ type: 'toggleHabit', id: habit.id }),
    });
  };

  return (
    <div className="app">
      <Sidebar page={page} onNavigate={setPage} />

      <main className="main">
        <TopBar userName={state.settings.userName} />

        {page === 'home' && (
          <div className="page">
            <Hero
              greeting={greeting}
              userName={state.settings.userName}
              constellationName={state.settings.currentConstellationName}
              habits={activeHabits}
              completedToday={completedToday}
              bestStreak={bestCurrentStreak}
              onRename={(name) => dispatch({ type: 'renameConstellation', name })}
              onSave={() => {
                dispatch({ type: 'saveConstellation' });
                notify({
                  type: 'success',
                  message: 'Constellation snapshot saved.',
                });
              }}
            />

            <section className="grid-two">
              <HabitForm onAdd={handleAddHabit} />

              <ProgressCard
                completed={completedToday}
                total={activeHabits.length}
                date={new Date()}
              />
            </section>

            <section className="section">
              <div className="section-head">
                <h2>My Habits</h2>
                <span className="muted">{activeHabits.length} active</span>
              </div>

              {activeHabits.length === 0 ? (
                <EmptyState
                  title="Add your first star"
                  description="Every habit you track becomes a star in your personal night sky."
                  action={
                    <button
                      type="button"
                      className="primary-button"
                      onClick={() => setPage('habits')}
                    >
                      Create a habit
                    </button>
                  }
                />
              ) : (
                <div className="habit-grid">
                  {activeHabits.map((habit) => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      onToggle={() => handleToggle(habit)}
                      onArchive={() => {
                        dispatch({ type: 'archiveHabit', id: habit.id });
                        notify({
                          type: 'info',
                          message: `“${habit.name}” archived.`,
                          actionLabel: 'Undo',
                          onAction: () =>
                            dispatch({ type: 'archiveHabit', id: habit.id }),
                        });
                      }}
                      onDelete={() => {
                        dispatch({ type: 'deleteHabit', id: habit.id });
                        notify({
                          type: 'success',
                          message: `“${habit.name}” deleted.`,
                        });
                      }}
                    />
                  ))}
                </div>
              )}
            </section>

            <ConstellationList
              constellations={state.constellations}
              habits={state.habits}
              onViewAll={() => setPage('constellations')}
              onSave={() => {
                dispatch({ type: 'saveConstellation' });
                notify({
                  type: 'success',
                  message: 'Constellation snapshot saved.',
                });
              }}
            />
          </div>
        )}

        {page === 'habits' && <MyHabitsPage state={state} dispatch={dispatch} />}
        {page === 'constellations' && (
          <ConstellationsPage state={state} dispatch={dispatch} />
        )}
        {page === 'statistics' && <StatisticsPage habits={activeHabits} />}
        {page === 'settings' && (
          <SettingsPage
            settings={state.settings}
            dispatch={dispatch}
            onRequestReset={() => setResetOpen(true)}
          />
        )}
      </main>

      <nav className="mobile-nav" aria-label="Primary">
        {MOBILE_NAV.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            className={page === id ? 'mobile-link active' : 'mobile-link'}
            onClick={() => setPage(id)}
            aria-current={page === id ? 'page' : undefined}
          >
            <Icon size={20} strokeWidth={2} aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>

      <ConfirmModal
        open={resetOpen}
        destructive
        title="Reset all data?"
        description="This permanently deletes every habit, constellation, and setting stored in this browser."
        confirmLabel="Reset data"
        cancelLabel="Keep my data"
        onCancel={() => setResetOpen(false)}
        onConfirm={() => {
          dispatch({ type: 'resetData' });
          setResetOpen(false);
          notify({
            type: 'success',
            message: 'All data has been reset.',
          });
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}