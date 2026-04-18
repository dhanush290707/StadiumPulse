import { useState, useCallback } from 'react';
import { EventProvider } from './context/EventContext';
import { UserProvider } from './context/UserContext';
import AppShell from './components/Layout/AppShell';
import Dashboard from './components/Dashboard/Dashboard';
import CrowdMap from './components/CrowdMap/CrowdMap';
import FoodOrder from './components/FoodOrder/FoodOrder';
import TicketPass from './components/Ticket/TicketPass';
import Navigate from './components/Navigate/Navigate';
import LiveFeed from './components/LiveFeed/LiveFeed';
import SeatModal from './components/common/SeatModal';
import './styles/index.css';
import './styles/components.css';
import './styles/extras.css';
import './styles/responsive.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNavigate = useCallback((tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggleNotifications = useCallback(() => {
    setShowNotifications(prev => !prev);
  }, []);

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'crowd':
        return <CrowdMap />;
      case 'food':
        return <FoodOrder />;
      case 'ticket':
        return <TicketPass />;
      case 'navigate':
        return <Navigate />;
      case 'live':
        return <LiveFeed />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <UserProvider>
      <EventProvider>
        <AppShell
          activeTab={activeTab}
          onTabChange={handleNavigate}
          showNotifications={showNotifications}
          onToggleNotifications={handleToggleNotifications}
        >
          {renderView()}
        </AppShell>
        <SeatModal />
      </EventProvider>
    </UserProvider>
  );
}
