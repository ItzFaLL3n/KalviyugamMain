/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          main: '#050B14', // Deep Midnight Blue
          mid: '#2563EB',  // Royal Blue Vignette/Glow
          dark: '#00D4FF', // Electric Cyan Accent
          light: '#0A1128', // Slightly Lighter Dark Blue for Cards
        },
        text: {
          main: '#FFFFFF',
          muted: '#94A3B8',
        },
        border: {
          custom: '#1E293B', // Subtle blue-gray borders
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
