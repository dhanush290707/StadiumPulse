# StadiumPulse

StadiumPulse is a modern, responsive smart venue platform designed to optimize the sporting and live event experience. Featuring a premium glassmorphism aesthetic, StadiumPulse provides fans with real-time tools to navigate the stadium, avoid lines, order food, and manage their experience seamlessly.

## Features

- **Interactive Dashboard**: A central hub for all event information, quick links, and active notifications.
- **Dynamic Seat Management**: Easily manage and update your seat assignment (section, row, seat, level, gate) via a sleek modal interface.
- **Crowd Map**: Real-time tracking of venue foot traffic to help you find the quickest paths and avoid congested areas.
- **Food & Concessions**: Browse menus, place mobile orders, and skip the line at stadium concession stands.
- **Digital Ticket Pass**: Secure digital ticketing with quick access for venue entry and seat verification.
- **Live Feed**: Stay updated with real-time event updates, instant replays, and social feeds inside the venue.
- **Venue Navigation**: Wayfinding tools to easily locate amenities, restrooms, and your specific seating section.

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Vanilla CSS with comprehensive CSS Variables, dynamic theming, and a full Glassmorphism design system.
- **State Management:** React Context API (`UserContext`, `EventContext`)

## Getting Started

Follow these steps to run the StadiumPulse platform locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd StadiumPulse
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

## Deployment

StadiumPulse is configured for containerized deployment on GCP Cloud Run using a multi-stage Docker build and Nginx.

### Deploying to GCP Cloud Run

1. **Authenticate with Google Cloud:**
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

2. **Build and Deploy:**
   Use the `gcloud run deploy` command to build the Docker image using Cloud Build and deploy it to Cloud Run in one step:
   ```bash
   gcloud run deploy stadiumpulse \
     --source . \
     --port 8080 \
     --allow-unauthenticated \
     --region us-central1
   ```
   *Note: Replace `us-central1` with your preferred GCP region.*

## Project Structure

The codebase is organized modularly for scalability:

- `src/components/`: Reusable React components organized by feature module (Dashboard, CrowdMap, FoodOrder, TicketPass, etc.).
- `src/context/`: Global state management providers for handling application-wide data.
- `src/styles/`: Global CSS stylesheets (`index.css`, `components.css`, `responsive.css`) containing the glassmorphism parameters, responsiveness mixins, and core visual identity.
- `src/data/`: Mock data and static configurations used across the frontend.

## Design Aesthetic & Responsiveness

StadiumPulse has been fully optimized to provide a first-class experience on any device size. The UI strictly leverages a **Glassmorphism** design pattern—utilizing semi-transparent backgrounds, background blurring, structural micro-animations, and vibrant, immersive underlying color schemes to deliver a stadium-like, energetic, and premium user experience.
