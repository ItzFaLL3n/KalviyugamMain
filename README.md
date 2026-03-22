# Kalviyugam Academy - Web Platform

A premium, highly interactive, and visually stunning web platform for **Kalviyugam Academy**, an educational tuition center focused on shaping top-performing students.

This project features a modern "tech-education" aesthetic with a deep midnight blue dark theme, neon accents, WebGL fluid simulations, and complex scroll-linked animations.

## ✨ Key Features

- **Premium Dark Aesthetic:** A bespoke dark mode design featuring Deep Midnight Blue (`#050B14`), Neon Royal Blue (`#2563EB`) edge glows, and striking Neon Lime Green (`#CCFF00`) accents.
- **Dynamic Typography:** Utilizes the bold, modern **Outfit** sans-serif font for maximum legibility and impact, paired with **Space Mono** for specialized technical and HUD elements.
- **Advanced Animations:** Includes GSAP-driven scroll animations, horizontal infinite ticker bands, and a stylized "Terminal Window" reveal effect for core content cards.
- **WebGL Fluid Backgrounds:** A custom interactive GLSL shader background powered by Three.js and React Three Fiber that reacts to mouse movement.
- **Buttery Smooth Scrolling:** Integrated with `@studio-freight/lenis` for a seamless, frictionless scrolling experience.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing with native app-like interactions on smaller viewports.
- **Functional Contact Pipeline:** Integrated Firebase Firestore backend for seamless contact form submissions.

## 🛠 Tech Stack

- **Framework:** React 18 + Vite
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS + Vanilla CSS Variables
- **Animations:** Framer Motion + GSAP (ScrollTrigger)
- **Smooth Scrolling:** Lenis
- **3D / WebGL:** Three.js + React Three Fiber (@react-three/fiber, @react-three/drei)
- **Database/Backend:** Firebase (Firestore)

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18+ recommended) and `npm` installed on your local machine.

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone <repository-url>
   cd "web 1"
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your Firebase configuration details:
   \`\`\`env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   \`\`\`

4. **Run the Development Server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   The application will be available at `http://localhost:5173` (or the port specified by Vite).

## 📂 Project Structure

\`\`\`text
src/
├── assets/        # Static assets (images, fonts)
├── components/    # Reusable UI components (Navbar, Footer, TickerBand, SmoothScroll)
│   └── webgl/     # Three.js / React Three Fiber shader components
├── config/        # Configuration files (Firebase setup)
├── pages/         # Top-level route components (Home, Gallery, etc.)
├── sections/      # Major page sections (Hero, Courses, WhyChooseUs, Contact)
├── index.css      # Global styles, Tailwind directives, CSS Variables
└── main.jsx       # Application entry point
\`\`\`

## 🎨 Design System

- **Colors:**
  - Background (Midnight): `#050B14`
  - Accent (Royal Blue): `#2563EB`
  - Highlight (Neon Green): `#CCFF00`
  - Cards (Dark Blue): `#0A1128`
- **Fonts:**
  - Primary (Headings & Body): `Outfit`
  - Secondary (Monospace UI): `Space Mono`

## 📄 License

This project is proprietary and intended for Kalviyugam Academy.
