import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const programs = [
  {
    tier: 'Foundation',
    level: 'Class 1 – 8',
    range: '1–8',
    subjects: 'All Subjects · Hindi Included',
    desc: 'Building rock-solid fundamentals that set students apart from the very beginning.',
    features: [
      'All subjects incl. Hindi',
      'Subject-specific special teaching',
      'Test-series-only track available',
    ],
    scarcity: null,
    cardBg: '#0a1020',
    visualBg: '#0d1528',
    numColor: 'rgba(255,255,255,0.06)',
    labelColor: '#2563EB',
  },
  {
    tier: 'Excellence',
    level: 'Class 9 – 10',
    range: '9–10',
    subjects: 'All Subjects · Hindi Included',
    desc: 'Systematic, board-exam preparation engineered for top results and consistent performance.',
    features: [
      'All subjects incl. Hindi',
      'Exam-oriented revision',
      'Govt. PYQs & sample paper sessions',
      'Weekly & monthly organised tests',
      'Weekly doubt-clearing sessions',
    ],
    scarcity: null,
    cardBg: '#0c1322',
    visualBg: '#101828',
    numColor: 'rgba(255,255,255,0.06)',
    labelColor: '#0ea5e9',
  },
  {
    tier: 'Elite',
    level: 'Class 11 – 12',
    range: '11–12',
    subjects: 'All Groups · Bio-Maths · CSE',
    desc: 'Deep conceptual mastery for students aiming at elite academic and competitive outcomes.',
    features: [
      'All groups incl. Bio-Maths & CSE',
      'Special coaching for Board Exams',
      'Secondary → Higher Secondary bridge',
    ],
    scarcity: 'Only 8 Seats',
    cardBg: '#0a1020',
    visualBg: '#0d1528',
    numColor: 'rgba(255,255,255,0.06)',
    labelColor: '#94a3b8',
  },
];

/* Tiny dot-grid pattern rendered as an SVG data URI */
const dotGrid = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(255,255,255,0.04)'/%3E%3C/svg%3E")`;

function ProgramCard({ program, index, reducedMotion }) {
  return (
    <motion.article
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="flex flex-col rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.14] transition-colors duration-500 group"
      style={{ background: program.cardBg }}
      role="listitem"
      aria-label={`${program.tier} — ${program.level}`}
    >

      {/* ── Visual top area ── */}
      <div
        className="relative flex items-center justify-center overflow-hidden h-[160px] md:h-[190px]"
        style={{
          background: program.visualBg,
          backgroundImage: dotGrid,
        }}
      >
        {/* Large class number — faint background anchor */}
        <span
          className="absolute font-heading font-black select-none pointer-events-none leading-none tracking-tighter"
          style={{
            fontSize: 'clamp(5rem, 14vw, 8rem)',
            color: program.numColor,
            bottom: '-0.1em',
            right: '0.1em',
          }}
          aria-hidden="true"
        >
          {program.range}
        </span>

        {/* Floating tier chip */}
        <div
          className="card-float relative z-10 flex items-center gap-2 rounded-full border border-white/[0.08] px-4 py-2"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(4px)',
            animationDelay: `${index * 1.2}s`,
          }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: program.labelColor }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: program.labelColor }}>
            {program.tier}
          </span>
        </div>

        {/* Scarcity badge */}
        {program.scarcity && (
          <span className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full border border-red-400/20 bg-red-400/[0.06] px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-red-400">
            <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
            {program.scarcity}
          </span>
        )}
      </div>

      {/* ── Text bottom area ── */}
      <div className="flex flex-col flex-1 px-6 py-6 gap-4">
        <h3 className="font-heading font-bold text-xl md:text-2xl text-text-main uppercase tracking-tight leading-tight">
          {program.level}
        </h3>
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted leading-relaxed">
          {program.desc}
        </p>

        {/* Feature list */}
        <ul className="flex-1">
          {program.features.map((feat) => (
            <li
              key={feat}
              className="flex items-start gap-2.5 py-2 border-b border-white/[0.05] last:border-0"
            >
              <svg
                className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                style={{ color: program.labelColor }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-[13px] text-white/70 leading-snug">{feat}</span>
            </li>
          ))}
        </ul>

        {/* Subjects tag */}
        <div className="pt-3 border-t border-white/[0.06]">
          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: program.labelColor }}>
            {program.subjects}
          </span>
        </div>
      </div>

    </motion.article>
  );
}

export default function OurPrograms() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reducedMotion = useReducedMotion();

  return (
    <section id="programs" className="py-20 md:py-40 relative" aria-labelledby="programs-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={ref}>

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12 mb-12 md:mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-text-muted mb-4 block"
            >
              03 // Programs
            </motion.span>
            <motion.h2
              id="programs-heading"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-8xl font-black font-heading tracking-tighter leading-[0.85] text-text-main uppercase"
            >
              Our
              <br />
              <span className="text-text-muted italic font-light">Programs</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-text-muted max-w-xs leading-loose"
          >
            From foundational learning to elite board mastery — every stage, covered.
          </motion.p>
        </div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
          role="list"
          aria-label="Class programs"
        >
          {programs.map((program, index) => (
            <ProgramCard key={program.tier} program={program} index={index} reducedMotion={reducedMotion} />
          ))}
        </div>

      </div>
    </section>
  );
}
