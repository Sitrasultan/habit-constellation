import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));

    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const notify = useCallback(
    ({ type = 'info', message, actionLabel, onAction, duration = 4200 }) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((current) => [...current, { id, type, message, actionLabel, onAction }]);

      timers.current.set(
        id,
        setTimeout(() => dismiss(id), duration)
      );

      return id;
    },
    [dismiss]
  );

  const value = useMemo(() => ({ notify, dismiss }), [notify, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="toast-region" role="region" aria-label="Notifications">
        <div aria-live="polite" aria-atomic="false">
          {toasts.map(({ id, type, message, actionLabel, onAction }) => {
            const Icon = ICONS[type] || Info;

            return (
              <div key={id} className={`toast ${type}`}>
                <Icon size={18} strokeWidth={2} aria-hidden="true" />
                <p className="toast-message">{message}</p>

                {actionLabel && (
                  <button
                    className="toast-action"
                    onClick={() => {
                      onAction?.();
                      dismiss(id);
                    }}
                  >
                    {actionLabel}
                  </button>
                )}

                <button
                  className="icon-button"
                  style={{ width: 32, height: 32 }}
                  onClick={() => dismiss(id)}
                  aria-label="Dismiss notification"
                >
                  <X size={16} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used inside a ToastProvider');
  }
  return context;
}