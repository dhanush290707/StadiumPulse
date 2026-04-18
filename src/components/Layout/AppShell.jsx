import Header from './Header';
import BottomNav from '../common/BottomNav';

export default function AppShell({ activeTab, onTabChange, showNotifications, onToggleNotifications, children }) {
  return (
    <div className="app-shell" id="app-shell">
      <Header showNotifications={showNotifications} onToggleNotifications={onToggleNotifications} />
      <main className="app-main" id="app-main">
        {children}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
