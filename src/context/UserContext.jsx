import { createContext, useContext, useState, useCallback } from 'react';
import { USER_SEAT } from '../data/mockData';

const UserContext = createContext(null);

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}

export function UserProvider({ children }) {
  const [seat, setSeatState] = useState(USER_SEAT);
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    deliverToSeat: true,
    notifications: true,
    favoriteVendors: ['v1', 'v5'],
  });

  const toggleDelivery = useCallback(() => {
    setPreferences(prev => ({ ...prev, deliverToSeat: !prev.deliverToSeat }));
  }, []);

  const toggleFavoriteVendor = useCallback((vendorId) => {
    setPreferences(prev => {
      const favs = prev.favoriteVendors.includes(vendorId)
        ? prev.favoriteVendors.filter(id => id !== vendorId)
        : [...prev.favoriteVendors, vendorId];
      return { ...prev, favoriteVendors: favs };
    });
  }, []);

  const updateSeat = useCallback((newSeat) => {
    setSeatState(prev => ({ ...prev, ...newSeat }));
  }, []);

  const openSeatModal = useCallback(() => setIsSeatModalOpen(true), []);
  const closeSeatModal = useCallback(() => setIsSeatModalOpen(false), []);

  const value = {
    seat,
    updateSeat,
    isSeatModalOpen,
    openSeatModal,
    closeSeatModal,
    preferences,
    toggleDelivery,
    toggleFavoriteVendor,
    userName: 'Alex M.',
    userInitials: 'AM',
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
