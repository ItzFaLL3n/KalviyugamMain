import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// ─── Image Data ──────────────────────────────────────────────────────────────
const ALL_IMAGES = [
  { id: 1, src: '/images/gallery/img-1.jpeg', label: 'Classroom Session', cat: 'Students', hasPeople: true },
  { id: 2, src: '/images/gallery/img-2.jpeg', label: 'Group Study Moments', cat: 'Students', hasPeople: true },
  { id: 3, src: '/images/gallery/img-3.jpeg', label: 'Learning Together', cat: 'Students', hasPeople: false },
  { id: 4, src: '/images/gallery/img-4.jpeg', label: 'Faculty Interaction', cat: 'Students', hasPeople: true },
  { id: 5, src: '/images/gallery/img-5.jpeg', label: 'One Year Of Learning', cat: 'Events', hasPeople: false },
  { id: 6, src: '/images/gallery/img-6.jpeg', label: 'Student Stories', cat: 'Students', hasPeople: true },
  { id: 7, src: '/images/gallery/img-7.jpeg', label: 'Cake Cutting', cat: 'Events', hasPeople: true },
  { id: 8, src: '/images/gallery/img-8.jpeg', label: 'Campus Moments', cat: 'Events', hasPeople: true },
  { id: 9, src: '/images/gallery/img-9.jpeg', label: 'Celebration Day', cat: 'Events', hasPeople: true },
  { id: 10, src: '/images/gallery/img-10.jpeg', label: 'Annual Gathering', cat: 'Events', hasPeople: true },
  { id: 11, src: '/images/gallery/img-11.jpeg', label: 'Student Excellence', cat: 'Students', hasPeople: true },
  //{ id: 12, src: '/images/gallery/img-12.jpeg', label: 'Toppers Circle',          cat: 'Students', hasPeople: true  },
  { id: 13, src: '/images/gallery/img-13.jpeg', label: 'Pongal Ritual', cat: 'Events', hasPeople: true },
  { id: 14, src: '/images/gallery/img-14.jpeg', label: 'Festival Ceremony', cat: 'Events', hasPeople: true },
  { id: 15, src: '/images/gallery/img-15.jpeg', label: 'Prize Distribution', cat: 'Events', hasPeople: true },
  { id: 16, src: '/images/gallery/img-16.jpeg', label: 'Achievement Ceremony', cat: 'Events', hasPeople: false },
  { id: 17, src: '/images/gallery/img-17.jpeg', label: 'Study Hall', cat: 'Students', hasPeople: true },
  { id: 18, src: '/images/gallery/img-18.jpeg', label: 'Mentoring Session', cat: 'Events', hasPeople: false },
  { id: 19, src: '/images/gallery/img-19.jpeg', label: 'Campus Life', cat: 'Events', hasPeople: true },
  // { id: 20, src: '/images/gallery/img-20.jpeg', label: 'Faculty Meet', cat: 'Events', hasPeople: true },
  //{ id: 21, src: '/images/gallery/img-21.jpeg', label: 'One-on-One Mentoring', cat: 'Students', hasPeople: true },
  { id: 22, src: '/images/gallery/img-22.jpeg', label: 'Batch Photo', cat: 'Students', hasPeople: true },
  { id: 23, src: '/images/gallery/img-23.jpeg', label: 'Award Ceremony', cat: 'Events', hasPeople: true },
  { id: 24, src: '/images/gallery/img-24.jpeg', label: "Teachers' Day Cake", cat: 'Info', hasPeople: false },
  //{ id: 25, src: '/images/gallery/img-25.jpeg', label: 'Achievement Day', cat: 'Events', hasPeople: true },
  //{ id: 26, src: '/images/gallery/img-26.jpeg', label: 'Result Celebration', cat: 'Events', hasPeople: true },
  // { id: 27, src: '/images/gallery/img-27.jpeg', label: 'Admission Open', cat: 'Info', hasPeople: false },
  //{ id: 28, src: '/images/gallery/img-28.jpeg', label: 'Toppers Group', cat: 'Students', hasPeople: true },
  //{ id: 29, src: '/images/gallery/img-29.jpeg', label: 'Star Students', cat: 'Students', hasPeople: true },
  { id: 30, src: '/images/gallery/img-30.jpeg', label: 'Result Highlights 2024', cat: 'Info', hasPeople: false },
  // { id: 31, src: '/images/gallery/img-31.jpeg', label: 'Academy Info', cat: 'Info', hasPeople: false },
  { id: 32, src: '/images/gallery/img-32.jpeg', label: 'Result Highlights 2025', cat: 'Info', hasPeople: false },
  { id: 33, src: '/images/gallery/img-33.jpeg', label: 'Festival Celebration', cat: 'Events', hasPeople: true },
  // { id: 34, src: '/images/gallery/img-34.jpeg', label: 'Special Gathering', cat: 'Events', hasPeople: true },
  { id: 35, src: '/images/gallery/img-35.jpeg', label: 'Class of 2026', cat: 'Events', hasPeople: false },
  { id: 36, src: '/images/gallery/img-36.jpeg', label: 'Kalviyugam Logo', cat: 'Info', hasPeople: false },
  { id: 37, src: '/images/gallery/img-37.jpeg', label: 'Year End Gathering', cat: 'Events', hasPeople: false },
  { id: 38, src: '/images/gallery/img-38.jpeg', label: 'Institute Highlights', cat: 'Events', hasPeople: false },
  { id: 39, src: '/images/gallery/img-39.jpeg', label: 'Memorable Moments', cat: 'Events', hasPeople: false },
];

// Hero slider: people first (Students), then Events
// Slider: people only — strictly filter hasPeople, Students first then Events
const HERO_IMAGES = ALL_IMAGES.filter(i => i.hasPeople);

// ─── Hero Slider — exactly 3 cards visible ───────────────────────────────────
// Layout: [Left (dimmed)] [Center (featured, AnimatePresence)] [Right (dimmed)]
// Center swaps with direction-aware spring animation.
// Left/right images crossfade when they change.
// Auto-advance progress bar fills in 5s.

function HeroSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [dir, setDir] = useState(1);   // +1 forward, -1 back
  const total = HERO_IMAGES.length;
  const timerRef = useRef(null);

  // Circular wrap
  const wrap = useCallback((n) => ((n % total) + total) % total, [total]);

  const go = useCallback((d, targetIdx) => {
    setDir(d);
    setActiveIdx(i => targetIdx !== undefined ? targetIdx : wrap(i + d));
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDir(1);
      setActiveIdx(i => wrap(i + 1));
    }, 5000);
  }, [wrap]);

  // Start auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDir(1);
      setActiveIdx(i => wrap(i + 1));
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [wrap]);

  // Keyboard
  useEffect(() => {
    const k = (e) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [go]);

  // Swipe drag
  const onDragEnd = (_e, info) => {
    if (info.offset.x < -55) go(1);
    else if (info.offset.x > 55) go(-1);
  };

  const leftIdx = wrap(activeIdx - 1);
  const rightIdx = wrap(activeIdx + 1);

  // Center card: direction-aware slide + fade + subtle blur
  const centerV = {
    enter: (d) => ({
      x: d > 0 ? '5%' : '-5%',
      opacity: 0,
      scale: 0.97,
      filter: 'blur(6px)',
    }),
    center: {
      x: 0, opacity: 1, scale: 1, filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 260, damping: 28, mass: 0.85 },
    },
    exit: (d) => ({
      x: d > 0 ? '-5%' : '5%',
      opacity: 0, scale: 0.97, filter: 'blur(6px)',
      transition: { duration: 0.18, ease: 'easeIn' },
    }),
  };

  return (
    <section style={{ marginBottom: '5rem' }}>

      {/* ── Auto-advance progress bar ── */}
      <div style={{
        height: '1.5px',
        background: 'rgba(255,255,255,0.07)',
        borderRadius: '1px',
        overflow: 'hidden',
        marginBottom: '14px',
      }}>
        <motion.div
          key={activeIdx}                       // remounts = resets bar
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #00D4FF, #2563EB)',
          }}
        />
      </div>

      {/* ── 3-card row ── */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.06}
        onDragEnd={onDragEnd}
        style={{ touchAction: 'pan-y', cursor: 'grab' }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(8px, 1.5vw, 16px)',
          height: 'clamp(220px, 52vw, 580px)',
        }}>

          {/* Left card — dimmed, click to go back */}
          <motion.div
            onClick={() => go(-1)}
            whileHover={{ opacity: 0.62 }}
            style={{
              flex: '0.65', height: '100%',
              cursor: 'pointer', opacity: 0.38,
              overflow: 'hidden',
              borderRadius: 'clamp(8px, 1.5vw, 14px)',
              flexShrink: 0,
              transition: 'opacity 0.2s ease',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={HERO_IMAGES[leftIdx].id}
                src={HERO_IMAGES[leftIdx].src}
                alt={HERO_IMAGES[leftIdx].label}
                draggable={false}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', userSelect: 'none' }}
              />
            </AnimatePresence>
          </motion.div>

          {/* Center card — featured, AnimatePresence direction-aware */}
          <div style={{
            flex: '4', height: '100%',
            position: 'relative', overflow: 'hidden',
            borderRadius: 'clamp(12px, 2vw, 20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.72), 0 0 0 1px rgba(0,212,255,0.13)',
            flexShrink: 0,
          }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={HERO_IMAGES[activeIdx].id}
                custom={dir}
                variants={centerV}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ position: 'absolute', inset: 0 }}
              >
                <img
                  src={HERO_IMAGES[activeIdx].src}
                  alt={HERO_IMAGES[activeIdx].label}
                  draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', userSelect: 'none' }}
                />

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(5,11,20,0.9) 0%, rgba(5,11,20,0.1) 48%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                {/* Cyan accent line */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
                  background: 'linear-gradient(90deg, transparent 0%, #00D4FF 35%, #2563EB 70%, transparent 100%)',
                }} />

                {/* Caption */}
                <div style={{
                  position: 'absolute',
                  bottom: 'clamp(12px, 2.2vw, 22px)',
                  left: 'clamp(12px, 2.2vw, 22px)',
                  right: 'clamp(12px, 2.2vw, 22px)',
                }}>
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 'clamp(7px, 0.9vw, 10px)',
                    letterSpacing: '0.28em', textTransform: 'uppercase',
                    color: '#00D4FF', display: 'block', marginBottom: '5px',
                  }}>
                    {HERO_IMAGES[activeIdx].cat}
                  </span>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif", fontWeight: 700,
                    fontSize: 'clamp(0.85rem, 2vw, 1.5rem)',
                    color: '#fff', lineHeight: 1.15,
                  }}>
                    {HERO_IMAGES[activeIdx].label}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right card — dimmed, click to advance */}
          <motion.div
            onClick={() => go(1)}
            whileHover={{ opacity: 0.62 }}
            style={{
              flex: '0.65', height: '100%',
              cursor: 'pointer', opacity: 0.38,
              overflow: 'hidden',
              borderRadius: 'clamp(8px, 1.5vw, 14px)',
              flexShrink: 0,
              transition: 'opacity 0.2s ease',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={HERO_IMAGES[rightIdx].id}
                src={HERO_IMAGES[rightIdx].src}
                alt={HERO_IMAGES[rightIdx].label}
                draggable={false}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', userSelect: 'none' }}
              />
            </AnimatePresence>
          </motion.div>

        </div>
      </motion.div>

      {/* ── Footer: counter left, dots right ── */}
      <div style={{
        marginTop: '14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2px',
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px', color: 'rgba(255,255,255,0.28)',
          letterSpacing: '0.12em',
        }}>
          {String(activeIdx + 1).padStart(2, '0')} — {String(total).padStart(2, '0')}
        </span>

        <div style={{ display: 'flex', gap: '5px' }}>
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i > activeIdx ? 1 : -1, i)}
              style={{
                width: i === activeIdx ? '18px' : '5px',
                height: '5px', borderRadius: '2.5px',
                background: i === activeIdx ? '#00D4FF' : 'rgba(255,255,255,0.18)',
                border: 'none', padding: 0, cursor: 'pointer',
                transition: 'width 0.3s cubic-bezier(0.22,1,0.36,1), background 0.25s ease',
              }}
            />
          ))}
        </div>
      </div>

    </section>
  );
}


const CATS = ['Students', 'Events', 'Info'];

// ─── Grid Card ───────────────────────────────────────────────────────────────
function Card({ img, onClick }) {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(img)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', borderRadius: '10px',
        overflow: 'hidden', cursor: 'pointer',
        aspectRatio: '1/1', background: '#0a1128',
        border: '1px solid',
        borderColor: hov ? 'rgba(0,212,255,0.22)' : 'rgba(255,255,255,0.05)',
        transition: 'border-color 0.3s ease',
      }}
    >
      <img
        src={img.src} alt={img.label} loading="lazy"
        style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transform: hov ? 'scale(1.07)' : 'scale(1)',
          filter: hov ? 'brightness(0.92)' : 'brightness(0.75)',
          transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(5,11,20,0.85) 0%, transparent 55%)',
        opacity: hov ? 1 : 0.65, transition: 'opacity 0.3s ease',
      }} />
      {/* Cyan left accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px',
        background: 'linear-gradient(to bottom, #00D4FF, #2563EB)',
        transform: hov ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'top',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: 'clamp(8px, 1.5vw, 13px)',
        transform: hov ? 'translateY(0)' : 'translateY(4px)',
        transition: 'transform 0.35s ease',
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '8px', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: '#00D4FF',
          display: 'block', marginBottom: '3px',
        }}>{img.cat}</span>
        <p style={{
          fontFamily: "'Outfit', sans-serif", fontWeight: 600,
          fontSize: 'clamp(11px, 1.3vw, 13px)',
          color: '#fff', lineHeight: 1.3,
          overflow: 'hidden', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>{img.label}</p>
      </div>
    </motion.article>
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ item, items, onClose }) {
  const [cur, setCur] = useState(item);
  const [dir, setDir] = useState(1);
  const curIdx = items.findIndex(i => i.id === cur.id);

  const nav = useCallback((d) => {
    const n = curIdx + d;
    if (n < 0 || n >= items.length) return;
    setDir(d); setCur(items[n]);
  }, [curIdx, items]);

  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nav(1);
      if (e.key === 'ArrowLeft') nav(-1);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [nav, onClose]);

  const v = {
    enter: (d) => ({ x: d > 0 ? '80%' : '-80%', opacity: 0, scale: 0.94 }),
    center: ({ x: 0, opacity: 1, scale: 1 }),
    exit: (d) => ({ x: d > 0 ? '-50%' : '50%', opacity: 0, scale: 0.96 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(5,11,20,0.97)', backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(12px, 3vw, 32px)',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 16, right: 16,
          width: 36, height: 36, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'rgba(255,255,255,0.05)',
          color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>

      <div
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '860px', display: 'flex', flexDirection: 'column', gap: '14px' }}
      >
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
          <AnimatePresence custom={dir} mode="popLayout" initial={false}>
            <motion.img
              key={cur.id} custom={dir} variants={v}
              initial="enter" animate="center" exit="exit"
              transition={{ type: 'spring', stiffness: 360, damping: 36 }}
              src={cur.src} alt={cur.label}
              style={{
                width: '100%', maxHeight: '72vh',
                objectFit: 'contain', display: 'block',
                borderRadius: '12px', boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
              }}
            />
          </AnimatePresence>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '9px', letterSpacing: '0.25em',
              textTransform: 'uppercase', color: '#00D4FF',
              display: 'block', marginBottom: '4px',
            }}>{cur.cat}</span>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(13px, 2vw, 16px)', fontWeight: 600, color: '#fff',
            }}>{cur.label}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {[
              { fn: () => nav(-1), d: 'M15 19l-7-7 7-7', dis: curIdx === 0 },
              { fn: () => nav(1), d: 'M9 5l7 7-7 7', dis: curIdx === items.length - 1 },
            ].map(({ fn, d, dis }, i) => (
              <button key={i} onClick={fn} disabled={dis} style={{
                width: 34, height: 34, borderRadius: '50%', border: '1px solid',
                borderColor: dis ? 'rgba(255,255,255,0.08)' : 'rgba(0,212,255,0.35)',
                background: 'transparent',
                color: dis ? 'rgba(255,255,255,0.18)' : '#00D4FF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: dis ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={d} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px', color: 'rgba(255,255,255,0.3)',
            }}>{curIdx + 1}/{items.length}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Gallery() {
  const [cat, setCat] = useState('Students');
  const [lightbox, setLightbox] = useState(null);
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });
  const filtered = ALL_IMAGES.filter(i => i.cat === cat);

  return (
    <div style={{ background: '#050B14', minHeight: '100vh', paddingTop: '120px', overflowX: 'hidden' }}>

      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 80% 40% at 50% -5%, rgba(37,99,235,0.09) 0%, transparent 65%)',
      }} />

      <div className="relative z-10" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>

        {/* Header */}
        <header ref={headerRef} style={{ marginBottom: 'clamp(28px, 4vw, 48px)' }}>
          <motion.span
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 'clamp(8px, 1.1vw, 10px)', letterSpacing: '0.4em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
              display: 'block', marginBottom: '10px',
            }}
          >
            05 // Visual Records
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 800,
              fontSize: 'clamp(2.2rem, 7vw, 6rem)',
              letterSpacing: '-0.03em', lineHeight: 0.92,
              textTransform: 'uppercase', color: '#fff',
            }}
          >
            <span className="hover-glitch" data-text="MOMENTS AT">MOMENTS AT</span>
            {' '}
            <span className="hover-glitch" data-text="KALVIYUGAM"
              style={{ color: 'rgba(255,255,255,0.22)', fontWeight: 300, fontStyle: 'italic', display: 'block' }}
            >KALVIYUGAM</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: '1px', marginTop: '22px',
              background: 'linear-gradient(90deg, rgba(0,212,255,0.4), rgba(37,99,235,0.2), transparent)',
              transformOrigin: 'left',
            }}
          />
        </header>

        {/* Hero Slider */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroSlider />
        </motion.div>

        {/* Browse Grid */}
        <section>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '12px', marginBottom: 'clamp(16px, 2.5vw, 28px)',
          }}>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 700,
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              letterSpacing: '-0.02em', color: '#fff',
            }}>Browse Gallery</h2>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {CATS.map(c => {
                const active = c === cat;
                return (
                  <button key={c} onClick={() => setCat(c)} style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 'clamp(8px, 1vw, 10px)', letterSpacing: '0.2em',
                    textTransform: 'uppercase', padding: '7px 14px',
                    border: '1px solid',
                    borderColor: active ? '#00D4FF' : 'rgba(255,255,255,0.1)',
                    color: active ? '#050B14' : 'rgba(255,255,255,0.42)',
                    background: active ? '#00D4FF' : 'transparent',
                    cursor: 'pointer', borderRadius: '3px', transition: 'all 0.22s ease',
                  }}>{c}</button>
                );
              })}
            </div>
          </div>

          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(130px, 20vw, 240px), 1fr))',
              gap: 'clamp(6px, 1.2vw, 12px)',
              paddingBottom: 'clamp(60px, 8vw, 100px)',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(img => (
                <motion.div
                  key={img.id} layout
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Card img={img} onClick={setLightbox} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox item={lightbox} items={filtered} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
