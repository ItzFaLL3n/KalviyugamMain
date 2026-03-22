# Findings

## Research & Discoveries

### Tech Stack
- **Framework:** Vite + React (fast dev server, optimized builds)
- **Styling:** Tailwind CSS v3 (user-requested)
- **Animations:** Framer Motion (declarative React), GSAP + ScrollTrigger (scroll-driven), Lenis (smooth scroll)
- **Routing:** React Router v6
- **Backend:** Firebase v9 modular SDK — Firestore for contact form storage
- **Fonts:** Playfair Display (serif headings), Inter (sans body) via Google Fonts

### Design Tokens
| Token | Value |
|-------|-------|
| Background | `#0A0A0A` (deep black) |
| Accent | `#C5A46D` (muted gold) |
| Text Primary | `#F5F5F5` (soft white) |
| Text Secondary | `#A0A0A0` (warm gray) |

### Key Decisions
- Single-page app with React Router for Home + Gallery pages
- Contact form uses Firestore `addDoc` — no Cloud Functions needed
- Gallery will use placeholder images (user will replace with real photos)
- No pricing shown on course cards (per brief)
- WhatsApp button links to `https://wa.me/919443809262`

## Constraints
- User explicitly requested Tailwind CSS — using v3 (stable, broad ecosystem support)
- No unnecessary libraries
- Must be fully responsive, mobile-first
- Must feel premium, NOT like a local tuition poster
