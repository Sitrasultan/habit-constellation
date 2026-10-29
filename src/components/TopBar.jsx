import { Bell } from 'lucide-react';

export default function TopBar({ userName }) {
  return (
    <header className="topbar">
      <div className="topbar-spacer" />

      <button type="button" className="icon-button" aria-label="Notifications">
        <Bell size={18} strokeWidth={2} aria-hidden="true" />
      </button>

      <div className="user">
        <div className="avatar" aria-hidden="true">
          {userName.slice(0, 1).toUpperCase()}
        </div>
        <span>{userName}</span>
      </div>
    </header>
  );
}