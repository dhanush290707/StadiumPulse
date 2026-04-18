// ============================================================
// StadiumPulse — Mock Data Engine
// Comprehensive simulated data for a live NFL game experience
// ============================================================

// --- Event & Teams ---
export const EVENT_DATA = {
  id: 'nfl-2026-wk3-sf-kc',
  league: 'NFL',
  season: '2026',
  week: 3,
  venue: {
    name: 'Arrowhead Stadium',
    city: 'Kansas City, MO',
    capacity: 76416,
    gates: ['A', 'B', 'C', 'D', 'E', 'F'],
    levels: ['Field Level', 'Lower Bowl', 'Club Level', 'Upper Bowl', 'Suite Level'],
  },
  homeTeam: {
    id: 'kc',
    name: 'Chiefs',
    city: 'Kansas City',
    abbreviation: 'KC',
    color: 'hsl(0, 80%, 48%)',
    colorLight: 'hsl(0, 80%, 62%)',
    colorBg: 'hsla(0, 80%, 48%, 0.15)',
    record: '2-0',
    logo: '🏈',
  },
  awayTeam: {
    id: 'sf',
    name: '49ers',
    city: 'San Francisco',
    abbreviation: 'SF',
    color: 'hsl(14, 83%, 50%)',
    colorLight: 'hsl(14, 83%, 62%)',
    colorBg: 'hsla(14, 83%, 50%, 0.15)',
    record: '1-1',
    logo: '⚡',
  },
  date: '2026-09-27',
  kickoff: '4:25 PM ET',
};

// --- Venue Zones ---
export const VENUE_ZONES = [
  { id: 'gate-a', name: 'Gate A', type: 'gate', x: 250, y: 30, width: 60, height: 25 },
  { id: 'gate-b', name: 'Gate B', type: 'gate', x: 430, y: 100, width: 25, height: 55 },
  { id: 'gate-c', name: 'Gate C', type: 'gate', x: 430, y: 240, width: 25, height: 55 },
  { id: 'gate-d', name: 'Gate D', type: 'gate', x: 250, y: 340, width: 60, height: 25 },
  { id: 'gate-e', name: 'Gate E', type: 'gate', x: 50, y: 240, width: 25, height: 55 },
  { id: 'gate-f', name: 'Gate F', type: 'gate', x: 50, y: 100, width: 25, height: 55 },

  { id: 'sec-100', name: 'Section 100–110', type: 'lower', x: 115, y: 80, width: 100, height: 60 },
  { id: 'sec-111', name: 'Section 111–120', type: 'lower', x: 290, y: 80, width: 100, height: 60 },
  { id: 'sec-121', name: 'Section 121–130', type: 'lower', x: 290, y: 250, width: 100, height: 60 },
  { id: 'sec-131', name: 'Section 131–140', type: 'lower', x: 115, y: 250, width: 100, height: 60 },

  { id: 'club-east', name: 'Club East', type: 'club', x: 340, y: 160, width: 55, height: 70 },
  { id: 'club-west', name: 'Club West', type: 'club', x: 110, y: 160, width: 55, height: 70 },

  { id: 'upper-north', name: 'Upper North', type: 'upper', x: 180, y: 55, width: 145, height: 30 },
  { id: 'upper-south', name: 'Upper South', type: 'upper', x: 180, y: 310, width: 145, height: 30 },
  { id: 'upper-east', name: 'Upper East', type: 'upper', x: 390, y: 145, width: 30, height: 100 },
  { id: 'upper-west', name: 'Upper West', type: 'upper', x: 85, y: 145, width: 30, height: 100 },

  { id: 'concourse-n', name: 'Concourse North', type: 'concourse', x: 170, y: 38, width: 165, height: 18 },
  { id: 'concourse-s', name: 'Concourse South', type: 'concourse', x: 170, y: 338, width: 165, height: 18 },
  { id: 'concourse-e', name: 'Concourse East', type: 'concourse', x: 415, y: 130, width: 18, height: 130 },
  { id: 'concourse-w', name: 'Concourse West', type: 'concourse', x: 72, y: 130, width: 18, height: 130 },
];

// --- Food Vendors ---
export const FOOD_VENDORS = [
  {
    id: 'v1',
    name: "KC BBQ Pit",
    emoji: '🍖',
    cuisine: 'BBQ',
    category: 'food',
    location: 'Section 105, Level 1',
    distance: '2 min walk',
    rating: 4.8,
    baseWait: 8,
    deliveryAvailable: true,
    menu: [
      { id: 'm1', name: 'Brisket Platter', desc: 'Slow-smoked 14hr brisket, pickles, coleslaw', price: 18.99 },
      { id: 'm2', name: 'Pulled Pork Sandwich', desc: 'Hand-pulled pork, tangy BBQ sauce, brioche bun', price: 14.99 },
      { id: 'm3', name: 'Burnt Ends', desc: 'Kansas City-style burnt ends, sweet glaze', price: 16.99 },
      { id: 'm4', name: 'BBQ Nachos', desc: 'Loaded nachos with pulled pork & queso', price: 12.99 },
      { id: 'm5', name: 'Cornbread', desc: 'Honey butter cornbread', price: 4.99 },
    ],
  },
  {
    id: 'v2',
    name: "Stadium Dogs",
    emoji: '🌭',
    cuisine: 'Classic',
    category: 'food',
    location: 'Section 118, Level 1',
    distance: '4 min walk',
    rating: 4.5,
    baseWait: 4,
    deliveryAvailable: true,
    menu: [
      { id: 'm6', name: 'All-American Dog', desc: 'Beef frank, mustard, ketchup, relish', price: 8.99 },
      { id: 'm7', name: 'KC Loaded Dog', desc: 'Topped with BBQ pulled pork & jalapeños', price: 12.99 },
      { id: 'm8', name: 'Pretzel Dog', desc: 'Frank wrapped in soft pretzel dough', price: 10.99 },
      { id: 'm9', name: 'Cheese Fries', desc: 'Crispy fries, melted cheddar, bacon bits', price: 9.99 },
      { id: 'm10', name: 'Onion Rings', desc: 'Beer-battered crispy onion rings', price: 7.99 },
    ],
  },
  {
    id: 'v3',
    name: "Taco Fiesta",
    emoji: '🌮',
    cuisine: 'Mexican',
    category: 'food',
    location: 'Section 132, Level 1',
    distance: '6 min walk',
    rating: 4.6,
    baseWait: 6,
    deliveryAvailable: false,
    menu: [
      { id: 'm11', name: 'Street Tacos (3)', desc: 'Carne asada, cilantro, onion, lime', price: 13.99 },
      { id: 'm12', name: 'Chicken Quesadilla', desc: 'Grilled chicken, peppers, melted cheese', price: 11.99 },
      { id: 'm13', name: 'Loaded Burrito', desc: 'Rice, beans, meat, guac, sour cream', price: 15.99 },
      { id: 'm14', name: 'Chips & Guac', desc: 'Fresh tortilla chips, house guacamole', price: 8.99 },
      { id: 'm15', name: 'Churros', desc: 'Cinnamon sugar churros with chocolate dip', price: 6.99 },
    ],
  },
  {
    id: 'v4',
    name: "Burger Blitz",
    emoji: '🍔',
    cuisine: 'Burgers',
    category: 'food',
    location: 'Club Level East',
    distance: '5 min walk',
    rating: 4.7,
    baseWait: 10,
    deliveryAvailable: true,
    menu: [
      { id: 'm16', name: 'Classic Smash Burger', desc: 'Double patty, American cheese, special sauce', price: 14.99 },
      { id: 'm17', name: 'Mushroom Swiss', desc: 'Angus beef, sautéed mushrooms, Swiss cheese', price: 16.99 },
      { id: 'm18', name: 'Spicy Jalapeño Burger', desc: 'Pepper jack, jalapeños, chipotle mayo', price: 15.99 },
      { id: 'm19', name: 'Chicken Tenders', desc: 'Hand-breaded tenders with honey mustard', price: 12.99 },
      { id: 'm20', name: 'Milkshake', desc: 'Vanilla, chocolate, or strawberry', price: 7.99 },
    ],
  },
  {
    id: 'v5',
    name: "Cold Ones Bar",
    emoji: '🍺',
    cuisine: 'Beverages',
    category: 'drinks',
    location: 'Section 112, Level 1',
    distance: '3 min walk',
    rating: 4.4,
    baseWait: 3,
    deliveryAvailable: true,
    menu: [
      { id: 'm21', name: 'Draft Beer (Domestic)', desc: 'Bud Light, Coors, Miller — 20oz', price: 12.99 },
      { id: 'm22', name: 'Craft Beer', desc: 'Local KC craft selection — 16oz', price: 14.99 },
      { id: 'm23', name: 'Hard Seltzer', desc: 'White Claw or High Noon', price: 13.99 },
      { id: 'm24', name: 'Soda', desc: 'Pepsi, Diet Pepsi, Mt Dew — 20oz', price: 5.99 },
      { id: 'm25', name: 'Bottled Water', desc: 'Dasani 20oz', price: 4.99 },
    ],
  },
  {
    id: 'v6',
    name: "Pizza Zone",
    emoji: '🍕',
    cuisine: 'Pizza',
    category: 'food',
    location: 'Section 125, Level 2',
    distance: '7 min walk',
    rating: 4.3,
    baseWait: 12,
    deliveryAvailable: false,
    menu: [
      { id: 'm26', name: 'Pepperoni Slice', desc: 'Classic New York style slice', price: 7.99 },
      { id: 'm27', name: 'Cheese Slice', desc: 'Three-cheese blend, marinara', price: 6.99 },
      { id: 'm28', name: 'Meat Lovers Slice', desc: 'Pepperoni, sausage, bacon, ham', price: 8.99 },
      { id: 'm29', name: 'Garlic Knots (4)', desc: 'Butter garlic knots with marinara', price: 5.99 },
      { id: 'm30', name: 'Cannoli', desc: 'Crispy shell, sweet ricotta filling', price: 6.99 },
    ],
  },
  {
    id: 'v7',
    name: "Sweet Spot",
    emoji: '🍦',
    cuisine: 'Desserts',
    category: 'snacks',
    location: 'Concourse North',
    distance: '4 min walk',
    rating: 4.9,
    baseWait: 2,
    deliveryAvailable: false,
    menu: [
      { id: 'm31', name: 'Soft Serve Cone', desc: 'Vanilla, chocolate, or twist', price: 5.99 },
      { id: 'm32', name: 'Funnel Cake', desc: 'Fried dough, powdered sugar, strawberries', price: 9.99 },
      { id: 'm33', name: 'Cotton Candy', desc: 'Stadium classic, pink or blue', price: 6.99 },
      { id: 'm34', name: 'Popcorn Bucket', desc: 'Fresh-popped buttery popcorn', price: 8.99 },
      { id: 'm35', name: 'Frozen Lemonade', desc: 'Fresh-squeezed icy lemonade', price: 6.99 },
    ],
  },
  {
    id: 'v8',
    name: "Chef's Table",
    emoji: '🥩',
    cuisine: 'Premium',
    category: 'food',
    location: 'Club Level West',
    distance: '8 min walk',
    rating: 4.9,
    baseWait: 15,
    deliveryAvailable: true,
    menu: [
      { id: 'm36', name: 'Wagyu Sliders (3)', desc: 'A5 wagyu beef, truffle aioli, brioche', price: 28.99 },
      { id: 'm37', name: 'Lobster Roll', desc: 'Maine lobster, lemon butter, toasted roll', price: 24.99 },
      { id: 'm38', name: 'Charcuterie Box', desc: 'Artisan meats, cheeses, olives, crackers', price: 22.99 },
      { id: 'm39', name: 'Craft Cocktail', desc: 'Old Fashioned, Mojito, or Margarita', price: 16.99 },
      { id: 'm40', name: 'Espresso', desc: 'Double shot Italian espresso', price: 5.99 },
    ],
  },
];

// --- Nearby Amenities ---
export const AMENITIES = [
  { id: 'a1', type: 'restroom', name: 'Restroom A', location: 'Section 103, Level 1', distance: '1 min', icon: '🚻', accessible: true, baseWait: 3 },
  { id: 'a2', type: 'restroom', name: 'Restroom B', location: 'Section 115, Level 1', distance: '3 min', icon: '🚻', accessible: true, baseWait: 5 },
  { id: 'a3', type: 'restroom', name: 'Restroom C', location: 'Section 128, Level 1', distance: '5 min', icon: '🚻', accessible: false, baseWait: 2 },
  { id: 'a4', type: 'restroom', name: 'Restroom D', location: 'Club Level East', distance: '6 min', icon: '🚻', accessible: true, baseWait: 1 },
  { id: 'a5', type: 'restroom', name: 'Family Restroom', location: 'Section 110, Level 1', distance: '2 min', icon: '👶', accessible: true, baseWait: 4 },
  { id: 'a6', type: 'firstaid', name: 'First Aid Station', location: 'Section 108, Level 1', distance: '3 min', icon: '🏥', accessible: true, baseWait: 0 },
  { id: 'a7', type: 'firstaid', name: 'Medical Center', location: 'Gate A Entrance', distance: '5 min', icon: '🏥', accessible: true, baseWait: 0 },
  { id: 'a8', type: 'atm', name: 'ATM — Chase', location: 'Concourse North', distance: '4 min', icon: '🏧', accessible: true, baseWait: 0 },
  { id: 'a9', type: 'atm', name: 'ATM — BoA', location: 'Concourse South', distance: '7 min', icon: '🏧', accessible: true, baseWait: 0 },
  { id: 'a10', type: 'merchandise', name: 'Team Store', location: 'Gate A Plaza', distance: '5 min', icon: '🛍️', accessible: true, baseWait: 8 },
  { id: 'a11', type: 'merchandise', name: 'Pop-up Shop', location: 'Section 120, Level 2', distance: '4 min', icon: '🛍️', accessible: false, baseWait: 3 },
  { id: 'a12', type: 'exit', name: 'Exit — Gate A', location: 'North', distance: '3 min', icon: '🚪', accessible: true, baseWait: 0 },
  { id: 'a13', type: 'exit', name: 'Exit — Gate D', location: 'South', distance: '6 min', icon: '🚪', accessible: true, baseWait: 0 },
  { id: 'a14', type: 'exit', name: 'Exit — Gate B', location: 'East', distance: '4 min', icon: '🚪', accessible: true, baseWait: 0 },
  { id: 'a15', type: 'exit', name: 'Exit — Gate E', location: 'West', distance: '5 min', icon: '🚪', accessible: true, baseWait: 0 },
  { id: 'a16', type: 'info', name: 'Info Desk', location: 'Gate A Entrance', distance: '3 min', icon: 'ℹ️', accessible: true, baseWait: 2 },
  { id: 'a17', type: 'charging', name: 'Charging Station', location: 'Section 112, Level 1', distance: '3 min', icon: '🔋', accessible: true, baseWait: 0 },
  { id: 'a18', type: 'charging', name: 'Charging Lounge', location: 'Club Level West', distance: '7 min', icon: '🔋', accessible: true, baseWait: 0 },
];

// --- User Seat Info ---
export const USER_SEAT = {
  section: 108,
  row: 'J',
  seat: 14,
  level: 'Lower Bowl',
  gate: 'A',
  directions: [
    'Enter through Gate A (North entrance)',
    'Follow the main concourse to the right',
    'Pass Sections 103–107 on your left',
    'Take the stairs down at Section 108 entrance',
    'Row J is 10 rows down — Seat 14 is near the center',
  ],
};

// --- Game Timeline Events ---
export const INITIAL_TIMELINE = [
  { id: 't1', time: '4:25', type: 'info', title: 'Kickoff', desc: 'KC receives the opening kick' },
  { id: 't2', time: '4:31', type: 'score', title: 'TOUCHDOWN — Chiefs', desc: 'Mahomes to Kelce, 34-yd pass. XP Good. KC 7 - SF 0' },
  { id: 't3', time: '4:38', type: 'info', title: 'SF Drive', desc: '49ers moving the ball, crossing midfield' },
  { id: 't4', time: '4:44', type: 'score', title: 'FIELD GOAL — 49ers', desc: 'Moody, 42-yd FG is good. KC 7 - SF 3' },
  { id: 't5', time: '4:52', type: 'penalty', title: 'Penalty — Holding', desc: 'Holding on KC #71, offense. 10-yd penalty' },
  { id: 't6', time: '4:58', type: 'score', title: 'TOUCHDOWN — Chiefs', desc: 'Pacheco, 12-yd rush. XP Good. KC 14 - SF 3' },
  { id: 't7', time: '5:05', type: 'break', title: 'End of Q1', desc: 'Chiefs lead 14-3 heading into the second quarter' },
  { id: 't8', time: '5:12', type: 'score', title: 'TOUCHDOWN — 49ers', desc: 'Purdy to Aiyuk, 28-yd TD. XP Good. KC 14 - SF 10' },
  { id: 't9', time: '5:20', type: 'penalty', title: 'Turnover — Interception', desc: 'Mahomes intercepted by SF #5 at the KC 35' },
  { id: 't10', time: '5:24', type: 'score', title: 'FIELD GOAL — 49ers', desc: 'Moody, 28-yd FG. KC 14 - SF 13' },
];

// --- Initial Scores ---
export const INITIAL_SCORES = {
  home: 14,
  away: 13,
  quarter: 2,
  clock: '8:42',
  possession: 'home',
  quarters: {
    home: [14, 0, 0, 0],
    away: [3, 10, 0, 0],
  },
};

// --- Game Stats ---
export const INITIAL_STATS = [
  { label: 'Total Yards', home: 187, away: 162 },
  { label: 'Passing Yards', home: 142, away: 128 },
  { label: 'Rushing Yards', home: 45, away: 34 },
  { label: 'First Downs', home: 9, away: 7 },
  { label: 'Turnovers', home: 1, away: 0 },
  { label: 'Time of Possession', home: 16.5, away: 13.5 },
];

// --- Alert Messages ---
export const ALERTS = [
  { id: 'al1', type: 'info', title: 'Gate A Update', text: 'All gates are open. Gate A has the shortest entry line.', icon: '🚪' },
  { id: 'al2', type: 'warning', title: 'Concession Rush', text: 'Food lines expected to increase at halftime. Order now to save time!', icon: '⚠️' },
  { id: 'al3', type: 'success', title: 'Weather Clear', text: 'Perfect football weather — 72°F, partly cloudy, 5 mph wind.', icon: '☀️' },
  { id: 'al4', type: 'info', title: 'Halftime Show', text: 'Special halftime performance starting in the 2nd quarter break.', icon: '🎵' },
  { id: 'al5', type: 'danger', title: 'Concourse Alert', text: 'South concourse temporarily congested. Use east/west alternatives.', icon: '🚨' },
];

// --- Smart Insights ---
export const SMART_INSIGHTS = [
  {
    icon: '🍔',
    iconBg: 'hsla(38, 92%, 50%, 0.15)',
    label: 'Best Time to Order',
    value: 'Order now — wait times increase 40% at halftime',
    action: 'food',
  },
  {
    icon: '🚻',
    iconBg: 'hsla(217, 91%, 60%, 0.15)',
    label: 'Nearest Restroom',
    value: 'Restroom A — 1 min walk, ~3 min wait',
    action: 'navigate',
  },
  {
    icon: '👥',
    iconBg: 'hsla(160, 84%, 39%, 0.15)',
    label: 'Your Section Density',
    value: 'Section 108 — Moderate (72% capacity)',
    action: 'crowd',
  },
  {
    icon: '⏱️',
    iconBg: 'hsla(280, 67%, 55%, 0.15)',
    label: 'Next Break',
    value: 'Halftime in ~12 minutes',
    action: null,
  },
];

// --- Utility: Random Walk ---
export function randomWalk(value, min, max, step = 3) {
  const delta = (Math.random() - 0.5) * 2 * step;
  return Math.min(max, Math.max(min, Math.round(value + delta)));
}

// --- Utility: Get density level ---
export function getDensityLevel(pct) {
  if (pct < 45) return 'low';
  if (pct < 75) return 'medium';
  return 'high';
}

// --- Utility: Get wait color ---
export function getWaitColor(minutes) {
  if (minutes <= 5) return 'var(--clr-accent)';
  if (minutes <= 10) return 'var(--clr-warning)';
  return 'var(--clr-danger)';
}

// --- Utility: Get wait level ---
export function getWaitLevel(minutes) {
  if (minutes <= 5) return 'low';
  if (minutes <= 10) return 'medium';
  return 'high';
}

// --- Utility: Format price ---
export function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

// --- Generate initial zone densities ---
export function generateInitialDensities() {
  const densities = {};
  VENUE_ZONES.forEach(zone => {
    let base;
    switch (zone.type) {
      case 'gate': base = 30 + Math.random() * 25; break;
      case 'lower': base = 55 + Math.random() * 25; break;
      case 'club': base = 40 + Math.random() * 20; break;
      case 'upper': base = 50 + Math.random() * 30; break;
      case 'concourse': base = 35 + Math.random() * 30; break;
      default: base = 50;
    }
    densities[zone.id] = Math.round(base);
  });
  return densities;
}
