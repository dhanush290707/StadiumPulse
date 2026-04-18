import { useState, useCallback } from 'react';
import { useEvent } from '../../context/EventContext';
import { useUser } from '../../context/UserContext';
import { formatPrice, getWaitColor } from '../../data/mockData';

export default function MenuModal({ vendor, waitTime, onClose }) {
  const { placeOrder } = useEvent();
  const { preferences, toggleDelivery } = useUser();
  const [cart, setCart] = useState({});

  const addItem = useCallback((menuItem) => {
    setCart(prev => ({
      ...prev,
      [menuItem.id]: {
        ...menuItem,
        qty: (prev[menuItem.id]?.qty || 0) + 1,
      },
    }));
  }, []);

  const removeItem = useCallback((menuItemId) => {
    setCart(prev => {
      const next = { ...prev };
      if (next[menuItemId]) {
        next[menuItemId] = { ...next[menuItemId], qty: next[menuItemId].qty - 1 };
        if (next[menuItemId].qty <= 0) delete next[menuItemId];
      }
      return next;
    });
  }, []);

  const cartItems = Object.values(cart);
  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleOrder = () => {
    if (totalItems === 0) return;
    placeOrder(vendor.id, cartItems, preferences.deliverToSeat);
    onClose();
  };

  return (
    <div className="menu-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()} id="menu-modal-overlay">
      <div className="menu-modal glass-strong" id="menu-modal">
        <div className="menu-modal__handle" />

        <div className="menu-modal__header">
          <h2 className="menu-modal__vendor-name">{vendor.emoji} {vendor.name}</h2>
          <div className="menu-modal__vendor-meta">
            <span style={{ color: getWaitColor(waitTime) }}>⏱ ~{waitTime} min wait</span>
            <span>📍 {vendor.distance}</span>
            <span>⭐ {vendor.rating}</span>
          </div>
        </div>

        <div className="menu-modal__items">
          {vendor.menu.map(item => {
            const inCart = cart[item.id];
            return (
              <div key={item.id} className="menu-item" id={`menu-item-${item.id}`}>
                <div className="menu-item__info">
                  <div className="menu-item__name">{item.name}</div>
                  <div className="menu-item__desc">{item.desc}</div>
                </div>
                <span className="menu-item__price">{formatPrice(item.price)}</span>
                {!inCart ? (
                  <button
                    className="menu-item__add-btn"
                    onClick={() => addItem(item)}
                    aria-label={`Add ${item.name}`}
                  >
                    +
                  </button>
                ) : (
                  <div className="menu-item__qty-controls">
                    <button
                      className="menu-item__qty-btn"
                      onClick={() => removeItem(item.id)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="menu-item__qty">{inCart.qty}</span>
                    <button
                      className="menu-item__qty-btn"
                      onClick={() => addItem(item)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="menu-modal__footer">
          {vendor.deliveryAvailable && (
            <div className="menu-modal__delivery-toggle">
              <label className="menu-modal__delivery-label">
                <span>🪑</span>
                <span>Deliver to my seat</span>
              </label>
              <div
                className={`toggle-switch ${preferences.deliverToSeat ? 'toggle-switch--active' : ''}`}
                onClick={toggleDelivery}
                role="switch"
                aria-checked={preferences.deliverToSeat}
                id="delivery-toggle"
              >
                <div className="toggle-switch__thumb" />
              </div>
            </div>
          )}
          <button
            className="menu-modal__order-btn"
            onClick={handleOrder}
            disabled={totalItems === 0}
            id="place-order-btn"
          >
            {totalItems > 0 ? (
              <>
                Place Order ({totalItems} items)
                <span className="menu-modal__order-total">{formatPrice(totalPrice)}</span>
              </>
            ) : (
              'Add items to order'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
