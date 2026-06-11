import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

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
    labelColor: '#3b82f6', // blue-500
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
    labelColor: '#0ea5e9', // sky-500
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
      'Practical lab guidance'
    ],
    scarcity: 'Only 8 Seats',
    cardBg: 'linear-gradient(145deg, #0e1116, #07090b)',
    visualBg: 'radial-gradient(circle at top left, #18202b, #090c10)',
    numColor: 'rgba(255,255,255,0.06)',
    labelColor: '#94a3b8', // slate-400
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
      'Time management strategies'
    ],
    scarcity: null,
    cardBg: 'linear-gradient(145deg, #110c14, #08060a)',
    visualBg: 'radial-gradient(circle at top left, #23162b, #0d0810)',
    numColor: 'rgba(255,255,255,0.06)',
    labelColor: '#a855f7', // purple-500
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
      'Board exam focus'
    ],
    scarcity: null,
    cardBg: 'linear-gradient(145deg, #0a1210, #050908)',
    visualBg: 'radial-gradient(circle at top left, #112822, #060e0c)',
    numColor: 'rgba(255,255,255,0.06)',
    labelColor: '#10b981', // emerald-500
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
      'Last-minute tips'
    ],
    scarcity: null,
    cardBg: 'linear-gradient(145deg, #120d0a, #090605)',
    visualBg: 'radial-gradient(circle at top left, #2b1d11, #0d0905)',
    numColor: 'rgba(255,255,255,0.06)',
    labelColor: '#f59e0b', // amber-500
  },
];

/* ── Course Card (shared between carousel & grid) ── */
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
        style={{
          background: course.visualBg,
          backgroundImage: dotGrid,
        }}
      >
        {/* Large class number — faint background anchor */}
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

        {/* Floating tier chip - Moved to top left and scaled up */}
        <div
          className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border border-white/[0.15] px-4 py-1.5 shadow-lg"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(12px)',
            animationDelay: `${index * 1.2}s`,
          }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: course.labelColor, boxShadow: `0 0 10px ${course.labelColor}` }}
          />
          <span className="font-mono text-xs uppercase tracking-[0.25em] font-bold" style={{ color: course.labelColor }}>
            {course.title}
          </span>
        </div>

        {/* Scarcity badge */}
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

        {/* Feature list */}
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

        {/* Subjects tag */}
        <div className="pt-3 border-t border-white/[0.08] mt-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: course.labelColor }}>
            {course.subjects}
          </span>
        </div>
      </div>

    </motion.article>
  );
}

export default function Courses() {
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  /* ── Track scroll position for dot indicators ── */
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.offsetWidth || 1;
    const gap = 16;
    const idx = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(idx, courses.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ── Arrow navigation ── */
  const scrollTo = useCallback((direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.offsetWidth || 280;
    const gap = 16;
    const next = direction === 'next'
      ? Math.min(activeIndex + 1, courses.length - 1)
      : Math.max(activeIndex - 1, 0);
    el.scrollTo({ left: next * (cardWidth + gap), behavior: 'smooth' });
    setActiveIndex(next);
  }, [activeIndex]);

  /* ── Dot click navigation ── */
  const scrollToIndex = useCallback((idx) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.offsetWidth || 280;
    const gap = 16;
    el.scrollTo({ left: idx * (cardWidth + gap), behavior: 'smooth' });
    setActiveIndex(idx);
  }, []);

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

          {/* ═══════ MOBILE: Swipeable Card Carousel ═══════ */}
          <div className="md:hidden" role="list" aria-label="Courses carousel">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-1 px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              {courses.map((course, index) => (
                <div
                  key={course.title}
                  className="snap-center flex-shrink-0"
                  style={{ width: 'calc(100vw - 64px)', maxWidth: '340px', minHeight: '260px' }}
                >
                  <CourseCard course={course} index={index} isInView={isInView} isCarousel />
                </div>
              ))}
            </div>

            {/* Navigation: Arrows + Dots */}
            <nav className="flex items-center justify-between mt-8 px-1" aria-label="Carousel navigation">
              {/* Left Arrow */}
              <button
                onClick={() => scrollTo('prev')}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  activeIndex === 0
                    ? 'border-border-custom/30 text-text-muted/30 cursor-default'
                    : 'border-border-custom text-text-muted hover:border-theme-dark hover:text-theme-dark'
                }`}
                disabled={activeIndex === 0}
                aria-label="Previous course"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center gap-2" role="tablist" aria-label="Course carousel pages">
                {courses.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToIndex(i)}
                    role="tab"
                    aria-selected={i === activeIndex}
                    aria-label={`Go to course ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? 'w-7 h-2.5 bg-text-main'
                        : 'w-2.5 h-2.5 bg-text-muted/30 hover:bg-text-muted/50'
                    }`}
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => scrollTo('next')}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  activeIndex === courses.length - 1
                    ? 'border-border-custom/30 text-text-muted/30 cursor-default'
                    : 'border-border-custom text-text-muted hover:border-theme-dark hover:text-theme-dark'
                }`}
                disabled={activeIndex === courses.length - 1}
                aria-label="Next course"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </nav>
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
