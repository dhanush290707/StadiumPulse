import '../../styles/extras.css';

const EMERGENCY_ACTIONS = [
  {
    id: 'emergency-call',
    icon: '🚨',
    label: 'Emergency',
    desc: 'Call venue security',
    variant: 'danger',
    phone: '911',
  },
  {
    id: 'medical-help',
    icon: '🏥',
    label: 'Medical Help',
    desc: 'Request medical assistance',
    variant: 'danger',
    phone: null,
  },
  {
    id: 'report-issue',
    icon: '⚠️',
    label: 'Report Issue',
    desc: 'Spills, damage, or concerns',
    variant: 'warning',
    phone: null,
  },
  {
    id: 'lost-found',
    icon: '🔍',
    label: 'Lost & Found',
    desc: 'Report or claim lost items',
    variant: 'info',
    phone: null,
  },
  {
    id: 'guest-services',
    icon: '💬',
    label: 'Guest Services',
    desc: 'Questions or complaints',
    variant: 'info',
    phone: null,
  },
  {
    id: 'exit-guide',
    icon: '🚪',
    label: 'Exit Guide',
    desc: 'Nearest exit & evacuation',
    variant: 'warning',
    phone: null,
  },
];

export default function EmergencySection() {
  const handleAction = (action) => {
    if (action.phone) {
      // In a real app, this would initiate a phone call
      alert(`Dialing ${action.phone}...`);
    } else {
      alert(`${action.label}: A staff member will be notified and dispatched to your location (Sec 108, Row J, Seat 14).`);
    }
  };

  return (
    <section className="emergency-section" id="emergency-section">
      <h2 className="emergency-section__title">Help & Safety</h2>
      <div className="emergency-grid">
        {EMERGENCY_ACTIONS.map(action => (
          <div
            key={action.id}
            className={`emergency-card glass emergency-card--${action.variant}`}
            onClick={() => handleAction(action)}
            id={action.id}
          >
            <span className="emergency-card__icon">{action.icon}</span>
            <span className="emergency-card__label">{action.label}</span>
            <span className="emergency-card__desc">{action.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
