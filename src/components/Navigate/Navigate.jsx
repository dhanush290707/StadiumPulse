import SeatFinder from './SeatFinder';
import NearbyAmenities from './NearbyAmenities';
import EmergencySection from './EmergencySection';
import '../../styles/navigate.css';

export default function Navigate() {
  return (
    <div className="navigate" id="navigate-view">
      <div className="navigate__header">
        <h1 className="navigate__title">Navigate</h1>
        <p className="navigate__subtitle">Find your way around the venue</p>
      </div>

      <SeatFinder />
      <NearbyAmenities />
      <EmergencySection />
    </div>
  );
}
