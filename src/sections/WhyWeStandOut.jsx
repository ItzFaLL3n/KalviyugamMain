import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 10, suffix: '+', label: 'Years of Excellence', sub: 'Trusted since the beginning' },
  { value: 500, suffix: '+', label: 'Toppers Shaped', sub: 'Board & competitive ranks' },
  { value: 95, suffix: '%', label: 'Pass Rate', sub: 'Consistent exam results' },
  { value: 15, suffix: ':1', label: 'Student Ratio', sub: 'Intentionally small batches' },
];

const pillars = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Pre-KG to Class 12',
    desc: 'Complete academic lifecycle under one roof.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
    ),
    title: 'Concept-First Approach',
    desc: 'Deep understanding before speed or scores.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    title: 'Personalised Mentorship',
    desc: 'One-on-one guidance adapted to each student.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: 'Test-Driven Revision',
    desc: 'Weekly tests, analytics and targeted corrections.',
  },
];

/* Animated counter hook */
function useCounter(target, isInView, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return count;
}

function StatItem({ stat, index, isInView }) {
  const count = useCounter(stat.value, isInView, 1400 + index * 150);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
      className="flex flex-col items-center text-center px-4 md:px-8 py-8 md:py-12 relative"
    >
      {/* Vertical rule between items */}
      {index !== 0 && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-border-custom/50 hidden md:block" aria-hidden="true" />
      )}
      <div className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-none text-text-main mb-3">
        {count}{stat.suffix}
      </div>
      <div className="font-heading font-bold text-sm md:text-base text-text-main uppercase tracking-wider mb-1">
        {stat.label}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
        {stat.sub}
      </div>
    </motion.div>
  );
}

export default function WhyWeStandOut() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="stand-out" className="py-20 md:py-40 relative overflow-hidden" aria-labelledby="stand-out-heading">

      {/* Faint diagonal grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(135deg, #00D4FF 0px, #00D4FF 1px, transparent 1px, transparent 60px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={ref}>

        {/* Header */}
        <div className="mb-12 md:mb-20 max-w-3xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-text-muted mb-4 block"
          >
            04 // Our Edge
          </motion.span>
          <motion.h2
            id="stand-out-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-8xl font-black font-heading tracking-tighter leading-[0.85] text-text-main uppercase"
          >
            <span className="hover-glitch" data-text="WHY WE">WHY WE</span>
            <br />
            <span className="hover-glitch text-text-muted italic font-light" data-text="STAND OUT">STAND OUT</span>
          </motion.h2>
        </div>

        {/* ── Stat counter strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 border border-border-custom/50 rounded-2xl overflow-hidden mb-12 md:mb-16"
          style={{ background: 'linear-gradient(135deg, rgba(10,17,40,0.6) 0%, rgba(5,11,20,0.8) 100%)' }}
        >
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} isInView={isInView} />
          ))}
        </motion.div>

        {/* ── Pillars: horizontal scrollable on mobile, 4-col grid on desktop ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border-custom/30 rounded-2xl overflow-hidden border border-border-custom/30">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.08 }}
              className="group flex flex-col gap-4 p-6 md:p-8 bg-theme-main hover:bg-theme-light/40 transition-colors duration-500"
            >
              <div className="w-10 h-10 rounded-lg bg-theme-dark/10 border border-theme-dark/20 flex items-center justify-center text-theme-dark group-hover:bg-theme-dark/20 transition-colors duration-500">
                {pillar.icon}
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-text-main uppercase tracking-tight mb-1.5">
                  {pillar.title}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Philosophy banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 md:mt-14 relative overflow-hidden rounded-2xl border border-theme-dark/20 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12"
          style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(37,99,235,0.08) 100%)' }}
        >
          {/* Decorative quote mark */}
          <span className="absolute right-8 top-4 font-heading font-black text-[8rem] md:text-[12rem] leading-none text-theme-dark/5 pointer-events-none select-none" aria-hidden="true">"</span>

          <div className="relative z-10">
            <p className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-text-main leading-snug tracking-tight max-w-2xl">
              We don't just prepare students for exams —{' '}
              <span className="text-theme-dark">we prepare them for mastery.</span>
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted mt-4 block">
              — Our Philosophy · Kalviyugam Academy
            </span>
          </div>

          <a
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative z-10 flex-shrink-0 group/cta inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-theme-dark border border-theme-dark/30 px-6 py-3 rounded-full hover:bg-theme-dark hover:text-theme-main transition-all duration-300"
          >
            Join Academy
            <svg className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
