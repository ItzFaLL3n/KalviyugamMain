import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const courses = [
  {
    title: 'Foundation Program',
    grades: 'Class 6–8',
    description: 'Building rock-solid fundamentals that set students apart from the very beginning.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: 'Board Excellence',
    grades: '9th & 10th',
    description: 'Systematic preparation engineered for top board exam performance.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 0 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.02 6.02 0 0 1-7.54 0" />
      </svg>
    ),
  },
  {
    title: 'Higher Secondary Mastery',
    grades: '+1 & +2',
    description: 'Deep conceptual mastery for students aiming at elite academic outcomes.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
      </svg>
    ),
  },
  {
    title: 'NEET / JEE Coaching',
    grades: 'Competitive',
    description: "Battle-tested strategies and rigorous practice for India's toughest exams.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: 'Commerce & Accounts',
    grades: 'Commerce Stream',
    description: 'Clarity-driven coaching for Accountancy, Economics, and Business Studies.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    title: 'Test Series & Revision',
    grades: 'All Batches',
    description: 'Intensive mock tests and focused revision cycles to sharpen exam readiness.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
  },
];

/* ── Course Card (shared between carousel & grid) ── */
function CourseCard({ course, index, isInView, isCarousel }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: isCarousel ? 0 : index * 0.1 }}
      className="group relative p-6 md:p-10 border border-border-custom/50 hover:border-theme-dark transition-colors duration-500 bg-theme-light/30 backdrop-blur-sm rounded-lg flex flex-col h-full"
      role="listitem"
      aria-label={`${course.title} — ${course.grades}`}
    >
      {/* Corner brackets decoration */}
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-border-custom/60 md:hidden" aria-hidden="true" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-border-custom/60 md:hidden" aria-hidden="true" />

      <div className="flex justify-between items-start mb-8 md:mb-12">
        <div className="text-text-muted group-hover:text-theme-dark transition-colors duration-500" aria-hidden="true">
          {course.icon}
        </div>
        <span className="inline-block bg-border-custom text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-sm">
          {course.grades}
        </span>
      </div>

      <div className="mt-auto">
        <h3 className="text-lg md:text-2xl font-bold md:font-light mb-3 md:mb-4 font-heading text-text-main tracking-wide uppercase">
          {course.title}
        </h3>
        <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-text-muted leading-relaxed md:leading-loose">
          {course.description}
        </p>
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
    <section id="courses" className="py-20 md:py-40 lg:py-56 relative overflow-hidden" aria-labelledby="courses-heading">
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
        <div className="relative border border-border-custom p-5 pb-8 md:p-16 rounded-xl shadow-[0_0_50px_rgba(37,99,235,0.1)] overflow-hidden">
          {/* Terminal Header Bar */}
          <div className="absolute top-0 left-0 w-full h-8 bg-border-custom/50 flex items-center px-4 gap-2" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-theme-dark/80"></div>
            <span className="ml-4 font-mono text-[10px] text-text-muted">programs_catalog.exe</span>
          </div>

          <div ref={ref} className="text-left mb-10 md:mb-24 pb-6 md:pb-8 mt-10 md:mt-12 border-b border-border-custom relative z-10">
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
              className="text-3xl sm:text-5xl lg:text-[7rem] font-bold font-heading tracking-tighter leading-[0.9] text-text-main uppercase"
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
                  style={{ width: 'calc(85vw - 64px)', minHeight: '260px' }}
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
