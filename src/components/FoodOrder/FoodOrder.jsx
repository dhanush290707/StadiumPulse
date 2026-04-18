import { useState, useMemo } from 'react';
import { useEvent } from '../../context/EventContext';
import { FOOD_VENDORS } from '../../data/mockData';
import VendorCard from './VendorCard';
import MenuModal from './MenuModal';
import OrderTracker from './OrderTracker';
import '../../styles/foodorder.css';

const CATEGORIES = [
  { id: 'all', label: '🍽️ All' },
  { id: 'food', label: '🍖 Food' },
  { id: 'drinks', label: '🥤 Drinks' },
  { id: 'snacks', label: '🍿 Snacks' },
];

export default function FoodOrder() {
  const { vendorWaits } = useEvent();
  const [category, setCategory] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState(null);

  const filteredVendors = useMemo(() => {
    if (category === 'all') return FOOD_VENDORS;
    return FOOD_VENDORS.filter(v => v.category === category);
  }, [category]);

  // Sort: lowest wait time first
  const sortedVendors = useMemo(() => {
    return [...filteredVendors].sort((a, b) => (vendorWaits[a.id] || 0) - (vendorWaits[b.id] || 0));
  }, [filteredVendors, vendorWaits]);

  return (
    <div className="food-order" id="food-order-view">
      <div className="food-order__header">
        <h1 className="food-order__title">Food & Drinks</h1>
        <p className="food-order__subtitle">Order ahead — skip the lines</p>
      </div>

      <div className="food-categories">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`food-category-btn ${category === cat.id ? 'food-category-btn--active' : ''}`}
            onClick={() => setCategory(cat.id)}
            id={`food-cat-${cat.id}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="food-smart-tip">
        <span className="food-smart-tip__icon">💡</span>
        <span className="food-smart-tip__text">
          Order now! Wait times typically increase 40% during halftime. Vendors sorted by shortest wait.
        </span>
      </div>

      <OrderTracker />

      <div className="vendor-list stagger" id="vendor-list">
        {sortedVendors.map(vendor => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
            waitTime={vendorWaits[vendor.id] || vendor.baseWait}
            onClick={() => setSelectedVendor(vendor)}
          />
        ))}
      </div>

      {selectedVendor && (
        <MenuModal
          vendor={selectedVendor}
          waitTime={vendorWaits[selectedVendor.id] || selectedVendor.baseWait}
          onClose={() => setSelectedVendor(null)}
        />
      )}
    </div>
  );
}
