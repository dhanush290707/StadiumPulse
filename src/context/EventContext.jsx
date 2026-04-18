import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  EVENT_DATA,
  INITIAL_SCORES,
  INITIAL_TIMELINE,
  INITIAL_STATS,
  ALERTS,
  VENUE_ZONES,
  FOOD_VENDORS,
  AMENITIES,
  generateInitialDensities,
  randomWalk,
} from '../data/mockData';

const EventContext = createContext(null);

export function useEvent() {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error('useEvent must be used within EventProvider');
  return ctx;
}

// Pre-scripted score events that fire over time
const SCORE_EVENTS = [
  {
    delay: 25000,
    score: { home: 21, away: 13 },
    quarters: { home: [14, 7, 0, 0], away: [3, 10, 0, 0] },
    quarter: 2,
    clock: '3:15',
    timeline: { id: 't11', time: '5:32', type: 'score', title: 'TOUCHDOWN — Chiefs', desc: 'Mahomes to Rice, 52-yd bomb! XP Good. KC 21 - SF 13' },
    stat: [
      { label: 'Total Yards', home: 248, away: 175 },
      { label: 'Passing Yards', home: 198, away: 138 },
    ],
  },
  {
    delay: 50000,
    score: { home: 21, away: 20 },
    quarters: { home: [14, 7, 0, 0], away: [3, 17, 0, 0] },
    quarter: 2,
    clock: '0:45',
    timeline: { id: 't12', time: '5:40', type: 'score', title: 'TOUCHDOWN — 49ers', desc: 'McCaffrey, 8-yd rush. XP Good. KC 21 - SF 20' },
    stat: [
      { label: 'Total Yards', home: 260, away: 215 },
      { label: 'Rushing Yards', home: 52, away: 68 },
    ],
    alert: { id: 'al6', type: 'warning', title: 'Halftime Approaching', text: 'Halftime in ~1 minute. Restroom lines increasing.', icon: '⏱️' },
  },
  {
    delay: 70000,
    score: { home: 21, away: 20 },
    quarters: { home: [14, 7, 0, 0], away: [3, 17, 0, 0] },
    quarter: 3,
    clock: '15:00',
    timeline: { id: 't13', time: '5:55', type: 'break', title: 'Halftime', desc: 'KC leads 21-20. Enjoy the halftime show! 🎵' },
    alert: { id: 'al7', type: 'info', title: 'Halftime Show', text: 'The halftime show is now starting on the field!', icon: '🎤' },
  },
  {
    delay: 95000,
    score: { home: 24, away: 20 },
    quarters: { home: [14, 7, 3, 0], away: [3, 17, 0, 0] },
    quarter: 3,
    clock: '9:20',
    timeline: { id: 't14', time: '6:10', type: 'score', title: 'FIELD GOAL — Chiefs', desc: 'Butker, 38-yd FG. KC 24 - SF 20' },
    stat: [
      { label: 'Total Yards', home: 295, away: 225 },
      { label: 'First Downs', home: 14, away: 11 },
    ],
  },
  {
    delay: 120000,
    score: { home: 24, away: 27 },
    quarters: { home: [14, 7, 3, 0], away: [3, 17, 7, 0] },
    quarter: 3,
    clock: '4:10',
    timeline: { id: 't15', time: '6:20', type: 'score', title: 'TOUCHDOWN — 49ers', desc: 'Purdy to Kittle, 15-yd seam route. XP Good. SF takes the lead 27-24!' },
    stat: [
      { label: 'Total Yards', home: 310, away: 280 },
      { label: 'Passing Yards', home: 220, away: 195 },
    ],
  },
];

export function EventProvider({ children }) {
  const [scores, setScores] = useState(INITIAL_SCORES);
  const [timeline, setTimeline] = useState(INITIAL_TIMELINE);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [zones, setZones] = useState(() => generateInitialDensities());
  const [currentAlert, setCurrentAlert] = useState(ALERTS[0]);
  const [vendorWaits, setVendorWaits] = useState(() => {
    const waits = {};
    FOOD_VENDORS.forEach(v => {
      waits[v.id] = v.baseWait + Math.round((Math.random() - 0.5) * 4);
    });
    return waits;
  });
  const [amenityWaits, setAmenityWaits] = useState(() => {
    const waits = {};
    AMENITIES.forEach(a => {
      waits[a.id] = a.baseWait + Math.round(Math.random() * 2);
    });
    return waits;
  });
  const [orders, setOrders] = useState([]);
  const [sentiment, setSentiment] = useState(72);
  const alertIndexRef = useRef(1);
  const scoreEventsFiredRef = useRef(new Set());

  // --- Real-time zone density updates every 4s ---
  useEffect(() => {
    const interval = setInterval(() => {
      setZones(prev => {
        const next = { ...prev };
        VENUE_ZONES.forEach(zone => {
          next[zone.id] = randomWalk(prev[zone.id], 10, 98, 4);
        });
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // --- Vendor wait time updates every 6s ---
  useEffect(() => {
    const interval = setInterval(() => {
      setVendorWaits(prev => {
        const next = { ...prev };
        FOOD_VENDORS.forEach(v => {
          next[v.id] = randomWalk(prev[v.id], 1, v.baseWait + 12, 2);
        });
        return next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // --- Amenity wait updates every 8s ---
  useEffect(() => {
    const interval = setInterval(() => {
      setAmenityWaits(prev => {
        const next = { ...prev };
        AMENITIES.forEach(a => {
          if (a.baseWait > 0) {
            next[a.id] = randomWalk(prev[a.id], 0, a.baseWait + 6, 1);
          }
        });
        return next;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // --- Alert rotation every 12s ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlert(ALERTS[alertIndexRef.current % ALERTS.length]);
      alertIndexRef.current += 1;
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // --- Sentiment fluctuation every 5s ---
  useEffect(() => {
    const interval = setInterval(() => {
      setSentiment(prev => randomWalk(prev, 30, 98, 5));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // --- Pre-scripted score events ---
  useEffect(() => {
    const timers = SCORE_EVENTS.map((event, idx) => {
      return setTimeout(() => {
        if (scoreEventsFiredRef.current.has(idx)) return;
        scoreEventsFiredRef.current.add(idx);

        setScores(prev => ({
          ...prev,
          home: event.score.home,
          away: event.score.away,
          quarter: event.quarter,
          clock: event.clock,
          quarters: event.quarters,
        }));

        setTimeline(prev => [event.timeline, ...prev]);

        if (event.stat) {
          setStats(prev => {
            const next = [...prev];
            event.stat.forEach(s => {
              const idx = next.findIndex(n => n.label === s.label);
              if (idx !== -1) next[idx] = s;
            });
            return next;
          });
        }

        if (event.alert) {
          setCurrentAlert(event.alert);
        }

        // Bump sentiment on TDs
        if (event.timeline.type === 'score') {
          setSentiment(prev => Math.min(98, prev + 15));
        }
      }, event.delay);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // --- Order tracking progression ---
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prev =>
        prev.map(order => {
          if (order.status === 'placed') return { ...order, status: 'preparing', eta: order.eta - 2 };
          if (order.status === 'preparing') return { ...order, status: 'ready', eta: 0 };
          return order;
        }).filter(o => o.status !== 'pickedup')
      );
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const placeOrder = useCallback((vendorId, items, deliverToSeat) => {
    const vendor = FOOD_VENDORS.find(v => v.id === vendorId);
    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    const newOrder = {
      id: orderId,
      vendorId,
      vendorName: vendor?.name || 'Unknown',
      vendorEmoji: vendor?.emoji || '🍽️',
      items,
      total,
      deliverToSeat,
      status: 'placed',
      eta: (vendorWaits[vendorId] || 8) + (deliverToSeat ? 5 : 0),
      createdAt: Date.now(),
    };
    setOrders(prev => [newOrder, ...prev]);
    return orderId;
  }, [vendorWaits]);

  const dismissOrder = useCallback((orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  }, []);

  const value = {
    event: EVENT_DATA,
    scores,
    timeline,
    stats,
    zones,
    vendorWaits,
    amenityWaits,
    currentAlert,
    orders,
    sentiment,
    placeOrder,
    dismissOrder,
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
}

export default EventContext;
