import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const dotGrid = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(255,255,255,0.04)'/%3E%3C/svg%3E")`;

const courses = [
  {
    title: 'Foundation',
    grades: 'Pre-KG to 8th',
    range: 'PK-8',
    subjects: 'All Subjects · Hindi Included',
    description: 'Building rock-solid fundamentals that set students apart from the very beginning.',
    features: [
      'All subjects incl. Hindi',
      'Subject-specific special teaching',
      'Test-series-only track available',
    ],
    scarcity: null,
    cardBg: 'linear-gradient(145deg, #0a1020, #030814)',
    visualBg: 'radial-gradient(circle at top left, #121d3a, #080d1a)',
    numColor: 'rgba(255,255,255,0.06)',
    labelColor: '#3b82f6',
  },
  {
    title: 'Excellence',
    grades: '9th & 10th',
    range: '9–10',
    subjects: 'All Subjects · Hindi Included',
    description: 'Systematic preparation engineered for top board exam performance.',
    features: [
      'All subjects incl. Hindi',
      'Exam-oriented revision',
      'Govt. PYQs & sample paper sessions',
      'Weekly & monthly organised tests',
      'Weekly doubt-clearing sessions',
    ],
    scarcity: null,
    cardBg: 'linear-gradient(145deg, #08121a, #04090d)',
    visualBg: 'radial-gradient(circle at top left, #102436, #060e15)',
    numColor: 'rgba(255,255,255,0.06)',
    labelColor: '#0ea5e9',
  },
  {
    title: 'Mastery',
    grades: '+1 & +2',
    range: '11–12',
    subjects: 'Science Stream',
    description: 'Deep conceptual mastery for students aiming at elite academic outcomes.',
    features: [
      'Deep conceptual learning',
      'Board Exam coaching',
      'Practical lab guidance',
    ],
    scarcity: 'Only 8 Seats',
    cardBg: 'linear-gradient(145deg, #0e1116, #07090b)',
    visualBg: 'radial-gradient(circle at top left, #18202b, #090c10)',
    numColor: 'rgba(255,255,255,0.06)',
    labelColor: '#94a3b8',
  },
  {
    title: 'Competitive',
    grades: 'NEET / JEE',
    range: 'NEET',
    subjects: 'Physics · Chemistry · Biology/Maths',
    description: "Battle-tested strategies and rigorous practice for India's toughest exams.",
    features: [
      'Rigorous mock tests',
      'Advanced problem solving',
      'PYQ analysis',
      'Time management strategies',
    ],
    scarcity: null,
    cardBg: 'linear-gradient(145deg, #110c14, #08060a)',
    visualBg: 'radial-gradient(circle at top left, #23162b, #0d0810)',
    numColor: 'rgba(255,255,255,0.06)',
    labelColor: '#a855f7',
  },
  {
    title: 'Commerce',
    grades: 'Commerce Stream',
    range: 'COM',
    subjects: 'Accountancy · Economics · Business',
    description: 'Clarity-driven coaching for Accountancy, Economics, and Business Studies.',
    features: [
      'Concept clarity',
      'Case study analysis',
      'Previous year papers',
      'Board exam focus',
    ],
    scarcity: null,
    cardBg: 'linear-gradient(145deg, #0a1210, #050908)',
    visualBg: 'radial-gradient(circle at top left, #112822, #060e0c)',
    numColor: 'rgba(255,255,255,0.06)',
    labelColor: '#10b981',
  },
  {
    title: 'Revision',
    grades: 'All Batches',
    range: 'TEST',
    subjects: 'All Subjects',
    description: 'Intensive mock tests and focused revision cycles to sharpen exam readiness.',
    features: [
      'Full-length mock exams',
      'Detailed performance analysis',
      'Doubt clearing sessions',
      'Last-minute tips',
    ],
    scarcity: null,
    cardBg: 'linear-gradient(145deg, #120d0a, #090605)',
    visualBg: 'radial-gradient(circle at top left, #2b1d11, #0d0905)',
    numColor: 'rgba(255,255,255,0.06)',
    labelColor: '#f59e0b',
  },
];

/* ── Slide direction variants ── */
const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 30 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
    },
  },
  exit: (dir) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
    scale: 0.94,
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.25 },
    },
  }),
};

/* ── Course Card ── */
function CourseCard({ course, index, isCarousel }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.6, delay: isCarousel ? 0 : index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="flex flex-col rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.14] transition-colors duration-500 group h-full"
      style={{ background: course.cardBg }}
      role="listitem"
      aria-label={`${course.title} — ${course.grades}`}
    >
      {/* ── Visual top area ── */}
      <div
        className="relative flex items-center justify-center overflow-hidden h-[130px] md:h-[150px] shrink-0"
        style={{ background: course.visualBg, backgroundImage: dotGrid }}
      >
        <span
          className="absolute font-heading font-black select-none pointer-events-none leading-none tracking-tighter"
          style={{
            fontSize: 'clamp(4.5rem, 12vw, 6.5rem)',
            color: course.numColor,
            bottom: '-0.15em',
            right: '-0.05em',
          }}
          aria-hidden="true"
        >
          {course.range}
        </span>

        <div
          className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border border-white/[0.15] px-4 py-1.5 shadow-lg"
          style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: course.labelColor, boxShadow: `0 0 10px ${course.labelColor}` }}
          />
          <span className="font-mono text-xs uppercase tracking-[0.25em] font-bold" style={{ color: course.labelColor }}>
            {course.title}
          </span>
        </div>

        {course.scarcity && (
          <span className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-full border border-red-400/30 bg-red-400/[0.1] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-red-400 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            {course.scarcity}
          </span>
        )}
      </div>

      {/* ── Text bottom area ── */}
      <div className="flex flex-col flex-1 px-5 md:px-6 py-5 md:py-6 gap-3.5">
        <h3 className="font-heading font-bold text-xl md:text-2xl text-text-main uppercase tracking-tight leading-tight">
          {course.grades}
        </h3>
        <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted leading-relaxed">
          {course.description}
        </p>

        <ul className="flex-1 mt-1.5 space-y-0.5">
          {course.features.map((feat) => (
            <li
              key={feat}
              className="flex items-start gap-2.5 py-1 border-b border-white/[0.05] last:border-0"
            >
              <svg
                className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                style={{ color: course.labelColor }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-[13px] text-white/80 leading-snug">{feat}</span>
            </li>
          ))}
        </ul>

        <div className="pt-3 border-t border-white/[0.08] mt-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: course.labelColor }}>
            {course.subjects}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ══════════════════════════════════════════════════════
   Mobile Scroll-Driven Card Sequencer
   ══════════════════════════════════════════════════════ */
function MobileScrollSequencer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);

  /* ── Stable refs so event listeners never go stale ── */
  const activeIndexRef = useRef(0);
  const animatingRef   = useRef(false);
  useEffect(() => { activeIndexRef.current = activeIndex; }, [activeIndex]);
  useEffect(() => { animatingRef.current   = animating;   }, [animating]);

  /* ── Advance one card in the given direction ── */
  const advance = useCallback((dir) => {
    if (animatingRef.current) return;
    const next = activeIndexRef.current + dir;
    if (next < 0 || next >= courses.length) return;
    setDirection(dir);
    setAnimating(true);
    setActiveIndex(next);
  }, []);

  /* ── Wheel: intercept only mid-sequence, pass through at boundaries ── */
  const wheelAccumRef = useRef(0);
  const wheelTimerRef = useRef(null);
  const WHEEL_THRESHOLD = 55;

  const handleWheel = useCallback((e) => {
    const idx  = activeIndexRef.current;
    const down = e.deltaY > 0;

    /* At the boundary → let page scroll through naturally */
    if (down  && idx >= courses.length - 1) { wheelAccumRef.current = 0; return; }
    if (!down && idx <= 0)                  { wheelAccumRef.current = 0; return; }

    /* Mid-sequence → absorb the scroll event */
    e.preventDefault();
    if (animatingRef.current) return;

    wheelAccumRef.current += e.deltaY;
    clearTimeout(wheelTimerRef.current);
    wheelTimerRef.current = setTimeout(() => { wheelAccumRef.current = 0; }, 220);

    if (wheelAccumRef.current >= WHEEL_THRESHOLD) {
      wheelAccumRef.current = 0;
      advance(1);
    } else if (wheelAccumRef.current <= -WHEEL_THRESHOLD) {
      wheelAccumRef.current = 0;
      advance(-1);
    }
  }, [advance]);

  /* ══════════════════════════════════════════════════════
     Touch: locks into one of two modes after 10px of move:
       'sequencer'   → swallow touch, flip card on touchend
       'passthrough' → manually relay to window.scrollBy
         (required because touchAction:'none' means the
         browser will NEVER scroll on its own — we must)
     ══════════════════════════════════════════════════════ */
  const touchStartY  = useRef(null);
  const touchLastY   = useRef(null);
  const touchMode    = useRef(null); // null | 'sequencer' | 'passthrough'
  const TOUCH_THRESHOLD = 42;

  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
    touchLastY.current  = e.touches[0].clientY;
    touchMode.current   = null;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (touchStartY.current === null) return;

    const currentY   = e.touches[0].clientY;
    const moveDelta  = touchLastY.current - currentY;  // +ve = finger up = scroll down
    const totalDelta = touchStartY.current - currentY;
    touchLastY.current = currentY;

    /* Decide gesture mode once direction is clear (> 10 px) */
    if (touchMode.current === null && Math.abs(totalDelta) > 10) {
      const idx  = activeIndexRef.current;
      const down = totalDelta > 0;
      const canAdvance = (down && idx < courses.length - 1) || (!down && idx > 0);
      touchMode.current = canAdvance ? 'sequencer' : 'passthrough';
    }

    if (touchMode.current === 'sequencer') {
      /* Swallow touch — card flip happens on touchend */
      e.preventDefault();
    } else if (touchMode.current === 'passthrough') {
      /*
       * touchAction:'none' stops the browser from scrolling automatically.
       * We manually relay the finger movement to the window so the page
       * continues scrolling past this section at both ends.
       */
      window.scrollBy({ top: moveDelta, behavior: 'instant' });
    }
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartY.current === null) return;
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    const mode  = touchMode.current;
    touchStartY.current = null;
    touchLastY.current  = null;
    touchMode.current   = null;

    if (mode !== 'sequencer' || animatingRef.current) return;
    if (delta >  TOUCH_THRESHOLD) advance(1);
    if (delta < -TOUCH_THRESHOLD) advance(-1);
  }, [advance]);

  /* ── Attach listeners once ── */
  const wrapperRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    el.addEventListener('wheel',      handleWheel,      { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true  });
    /* non-passive: we call preventDefault() in sequencer mode */
    el.addEventListener('touchmove',  handleTouchMove,  { passive: false });
    el.addEventListener('touchend',   handleTouchEnd,   { passive: true  });
    return () => {
      el.removeEventListener('wheel',      handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove',  handleTouchMove);
      el.removeEventListener('touchend',   handleTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  const course = courses[activeIndex];

  return (
    <div ref={wrapperRef} className="relative select-none" style={{ touchAction: 'none' }}>
      {/* ── Card area with AnimatePresence ── */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ minHeight: '420px' }}
      >
        <AnimatePresence
          custom={direction}
          initial={false}
          onExitComplete={() => setAnimating(false)}
        >
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <CourseCard course={course} index={activeIndex} isCarousel />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Progress indicator bar ── */}
      <div className="mt-5 flex items-center gap-3 px-1">
        {/* Prev button */}
        <button
          onClick={() => !animating && advance(-1)}
          disabled={activeIndex === 0}
          aria-label="Previous course"
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
            activeIndex === 0
              ? 'border-white/10 text-white/20 cursor-default'
              : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white active:scale-95'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Dot pills */}
        <div className="flex-1 flex items-center justify-center gap-1.5" role="tablist" aria-label="Course pages">
          {courses.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to course ${i + 1}`}
              onClick={() => {
                if (animating || i === activeIndex) return;
                setDirection(i > activeIndex ? 1 : -1);
                setAnimating(true);
                setActiveIndex(i);
              }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? '28px' : '8px',
                height: '8px',
                background: i === activeIndex
                  ? course.labelColor
                  : 'rgba(255,255,255,0.18)',
                boxShadow: i === activeIndex ? `0 0 10px ${course.labelColor}88` : 'none',
              }}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => !animating && advance(1)}
          disabled={activeIndex === courses.length - 1}
          aria-label="Next course"
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
            activeIndex === courses.length - 1
              ? 'border-white/10 text-white/20 cursor-default'
              : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white active:scale-95'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* ── Counter label ── */}
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
        {String(activeIndex + 1).padStart(2, '0')} / {String(courses.length).padStart(2, '0')}
      </p>

      {/* ── Scroll hint (only on first card) ── */}
      {activeIndex === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-4 flex flex-col items-center gap-1.5"
          aria-hidden="true"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/25">Swipe or scroll</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-4 h-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   Main Section
   ══════════════════════════════════════════════════════ */
export default function Courses() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="courses" className="py-16 md:py-24 lg:py-32 relative overflow-hidden" aria-labelledby="courses-heading">
      {/* Faint diagonal grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(135deg, #00D4FF 0px, #00D4FF 1px, transparent 1px, transparent 60px)',
        }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Terminal Window Container */}
        <div className="relative border border-border-custom p-5 pb-8 md:p-10 lg:p-12 rounded-xl shadow-[0_0_50px_rgba(37,99,235,0.1)] overflow-hidden">
          {/* Terminal Header Bar */}
          <div className="absolute top-0 left-0 w-full h-8 bg-border-custom/50 flex items-center px-4 gap-2" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-theme-dark/80"></div>
            <span className="ml-4 font-mono text-[10px] text-text-muted">programs_catalog.exe</span>
          </div>

          <div ref={ref} className="text-left mb-8 md:mb-14 pb-5 md:pb-6 mt-8 md:mt-10 border-b border-border-custom relative z-10">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-text-muted mb-6 md:mb-8 block"
            >
              02 // Programs
            </motion.span>
            <motion.h2
              id="courses-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-[5.5rem] font-bold font-heading tracking-tighter leading-[0.9] text-text-main uppercase"
            >
              <span className="hover-glitch" data-text="COURSES">COURSES</span>{' '}
              <span className="text-text-muted italic font-light block hover-glitch" data-text="FOR EXCELLENCE">FOR EXCELLENCE</span>
            </motion.h2>
          </div>

          {/* ═══════ MOBILE: Scroll-Driven Sequencer ═══════ */}
          <div className="md:hidden" aria-label="Courses sequencer">
            <MobileScrollSequencer />
          </div>

          {/* ═══════ DESKTOP: Grid Layout ═══════ */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="All courses">
            {courses.map((course, index) => (
              <CourseCard key={course.title} course={course} index={index} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
