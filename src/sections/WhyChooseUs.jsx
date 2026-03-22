import { useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

/* ═══════ Bento Card with cursor-tracking radial glow ═══════ */
function BentoCard({ children, className = '', delay = 0, isInView, variant = 'default' }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  // Theme configurations based on variant
  let bgClass = "bg-theme-light/50"; // Default dark glass
  let borderClass = "border-border-custom/60 hover:border-theme-dark/50";
  let cursorGlow = "rgba(0, 212, 255, 0.12)";
  let cursorBorderGlow = "rgba(0, 212, 255, 0.08)";

  if (variant === 'blue') {
    bgClass = "bg-gradient-to-br from-[#0c2a63] to-[#050B14]";
    borderClass = "border-[#2563EB]/40 hover:border-[#3B82F6]/60";
    cursorGlow = "rgba(59, 130, 246, 0.25)";
    cursorBorderGlow = "rgba(59, 130, 246, 0.35)";
  } else if (variant === 'accent') {
    bgClass = "bg-gradient-to-b from-[#1e3a8a] to-[#050B14]";
    borderClass = "border-[#3B82F6]/30 hover:border-[#60A5FA]/60";
    cursorGlow = "rgba(96, 165, 250, 0.2)";
    cursorBorderGlow = "rgba(96, 165, 250, 0.3)";
  } else if (variant === 'subtle-blue') {
    bgClass = "bg-gradient-to-tr from-[#050B14] to-[#0c1f4a]";
    borderClass = "border-[#1e40af]/40 hover:border-[#3b82f6]/50";
    cursorGlow = "rgba(37, 99, 235, 0.15)";
    cursorBorderGlow = "rgba(37, 99, 235, 0.25)";
  } else if (variant === 'inverse') {
    bgClass = "bg-white overflow-visible shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:shadow-[0_0_80px_rgba(255,255,255,0.15)]";
    borderClass = "border-white hover:border-[#3B82F6]";
    cursorGlow = "rgba(0, 0, 0, 0.05)";
    cursorBorderGlow = "rgba(59, 130, 246, 0.2)";
  } else if (variant === 'neon') {
    bgClass = "bg-gradient-to-b from-[#1e3a8a] via-[#0f214a] to-[#050B14]";
    borderClass = "border-[#3B82F6]/40 hover:border-[#00D4FF]/70 shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_40px_rgba(0,212,255,0.25)]";
    cursorGlow = "rgba(0, 212, 255, 0.25)";
    cursorBorderGlow = "rgba(0, 212, 255, 0.45)";
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      className={`bento-card relative overflow-hidden rounded-3xl border ${borderClass} ${bgClass} backdrop-blur-sm p-5 md:p-8 transition-all duration-500 group ${className}`}
    >
      {/* Dynamic Ambient Background Elements — CSS-only for performance */}
      {variant === 'blue' && (
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#3B82F6] blur-[70px] pointer-events-none bento-blob-pulse" />
      )}
      {variant === 'accent' && (
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#3B82F6]/30 to-transparent pointer-events-none bento-blob-float" />
      )}
      {variant === 'subtle-blue' && (
        <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#60A5FA] blur-[60px] pointer-events-none bento-blob-drift" />
      )}

      {/* Cursor glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${cursorGlow}, transparent 60%)`,
        }}
        aria-hidden="true"
      />
      {/* Border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${cursorBorderGlow}, transparent 50%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="why-us"
      className="py-20 md:py-32 lg:py-40 relative"
      aria-labelledby="why-us-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={sectionRef}>
        {/* Header */}
        <div className="mb-12 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-text-muted mb-4 md:mb-6 block"
          >
            01 // Our Edge
          </motion.span>
          <motion.h2
            id="why-us-heading"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-black font-heading tracking-tighter leading-[0.85] text-text-main uppercase"
          >
            <span className="hover-glitch" data-text="WHY">WHY</span>{' '}
            <span className="text-text-muted italic font-light hover-glitch" data-text="CHOOSE US">
              CHOOSE US
            </span>
          </motion.h2>
        </div>

        {/* ═══════ Bento Grid ═══════ */}
        <div className="bento-grid" role="list" aria-label="Why choose us features">

          {/* ── Card 1: Hero stat – spans 2 cols ── */}
          <BentoCard className="bento-hero" delay={0.1} isInView={isInView}>
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-theme-dark block mb-4">
                  Small Batch Focus
                </span>
                <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black font-heading text-text-main leading-none tracking-tighter">
                  15<span className="text-theme-dark">:</span>1
                </div>
              </div>
              <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-text-muted mt-4 md:mt-8 leading-relaxed">
                Student-to-teacher ratio. Intentionally limited class sizes ensure
                every student gets the attention they deserve.
              </p>
            </div>
          </BentoCard>

          {/* ── Card 2: Personal Mentorship ── */}
          <BentoCard className="bento-mentorship" delay={0.15} isInView={isInView} variant="blue">
            <div className="flex flex-col h-full">
              <div className="w-14 h-14 rounded-xl bg-theme-dark/10 border border-theme-dark/20 flex items-center justify-center text-theme-dark mb-6 group-hover:bg-theme-dark/20 transition-colors duration-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-heading text-text-main uppercase tracking-tight mb-2 md:mb-3">
                Personal Mentorship
              </h3>
              <p className="text-xs md:text-sm text-text-muted leading-relaxed mt-auto">
                One-on-one guidance that adapts to each student's strengths.
              </p>
            </div>
          </BentoCard>

          {/* ── Card 3: Quote (accent) – spans 1 col, tall ── */}
          <BentoCard className="bento-quote" delay={0.2} isInView={isInView} variant="inverse">
            <div className="flex flex-col justify-between h-full rounded-xl">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-theme-main/80 mb-3 md:mb-4 drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
              <p className="text-lg md:text-xl font-heading font-black text-theme-main leading-snug drop-shadow-sm tracking-tight text-balance">
                We don't just prepare students for exams — we prepare them for mastery.
              </p>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#3B82F6] mt-4 block">
                — Our Philosophy
              </span>
            </div>
          </BentoCard>

          {/* ── Card 4: Exam-Oriented stat ── */}
          <BentoCard className="bento-exam" delay={0.25} isInView={isInView} variant="accent">
            <div className="flex flex-col h-full">
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-theme-dark block mb-2 md:mb-3">
                Exam-Oriented
              </span>
              <div className="text-5xl md:text-6xl lg:text-7xl font-black font-heading text-text-main leading-none tracking-tighter">
                95<span className="text-theme-dark">%</span>
              </div>
              
              <div className="mt-auto pt-4 md:pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#00D4FF]/20 flex items-center justify-center">
                    <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#00D4FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-[#00D4FF] uppercase tracking-wider">Top 1% Results</span>
                </div>
                <p className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-text-muted leading-relaxed">
                  Pass rate. Every lesson is reverse-engineered directly from exam patterns to guarantee success.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* ── Card 5: Performance Tracking ── */}
          <BentoCard className="bento-tracking" delay={0.3} isInView={isInView} variant="subtle-blue">
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-theme-dark/10 border border-theme-dark/20 flex items-center justify-center text-theme-dark">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-theme-dark">
                    24/7 Insights
                  </span>
                </div>
                <h3 className="text-lg md:text-2xl font-bold font-heading text-text-main uppercase tracking-tight mb-2">
                  Performance Tracking
                </h3>
              </div>
              <div className="mt-auto">
                {/* Mini bar chart visualization */}
                <div className="flex items-end gap-1.5 h-10 md:h-16 mt-2 md:mt-4" aria-hidden="true">
                  {[40, 55, 35, 70, 50, 85, 65, 90, 75, 95, 80, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-theme-dark/20 group-hover:bg-theme-dark/40 transition-all duration-500"
                      style={{
                        height: `${h}%`,
                        transitionDelay: `${i * 40}ms`,
                      }}
                    />
                  ))}
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-text-muted mt-3 leading-relaxed">
                  Regular assessments with detailed analytics — always know where you stand.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* ── Card 6: Concept Clarity ── */}
          <BentoCard className="bento-clarity" delay={0.35} isInView={isInView}>
            <div className="flex flex-col gap-6 h-full justify-between">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-theme-dark/10 border border-theme-dark/20 flex items-center justify-center text-theme-dark group-hover:bg-theme-dark/20 transition-colors duration-500">
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="text-lg md:text-2xl font-bold font-heading text-text-main uppercase tracking-tight mb-2">
                  Concept Clarity First
                </h3>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed line-clamp-3 md:line-clamp-none">
                  We build deep understanding before speed.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* ── Card 7: Small accent – dashed border ── */}
          <BentoCard className="bento-team" delay={0.4} isInView={isInView}>
            <div className="flex items-center justify-center h-full">
              <div className="border-2 border-dashed border-theme-dark/40 rounded-xl p-4 w-full md:p-6 text-center group-hover:border-theme-dark transition-colors duration-500">
                <span className="text-xl md:text-2xl font-bold font-heading text-text-main block">
                  Expert Faculty
                </span>
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-text-muted mt-2 block">
                  10+ Years Experience
                </span>
              </div>
            </div>
          </BentoCard>

          {/* ── Card 8: Accent CTA ── */}
          <BentoCard className="bento-cta" delay={0.45} isInView={isInView} variant="neon">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector('#contact');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, '', '#contact');
                }
              }}
              className="flex-1 flex flex-col justify-center items-center h-full w-full group/cta"
            >
              <span className="absolute inset-[-1.75rem] md:inset-[-2rem] z-0"></span>
              
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#00D4FF] block mb-2 md:mb-4 opacity-80 relative z-10 transition-transform duration-300 group-hover/cta:-translate-y-1">
                Join Academy
              </span>
              
              <span className="relative z-10 text-2xl sm:text-4xl md:text-5xl font-black font-heading text-white uppercase tracking-tighter text-center group-hover/cta:scale-105 transition-transform duration-300 drop-shadow-md">
                Get <span className="text-[#00D4FF]">Started</span>
              </span>
              
              <svg className="relative z-10 w-8 h-8 text-[#00D4FF] mt-6 group-hover/cta:translate-y-3 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(0,212,255,0.6)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
              </svg>
            </a>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
