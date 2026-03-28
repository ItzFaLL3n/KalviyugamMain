import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Hash } from 'lucide-react';
import { SmokeBackground } from '../components/ui/spooky-smoke-animation';

const testimonials = [
  {
    name: 'Karthikeyan Subramani',
    course: 'NEET Repeater Batch',
    result: 'Scored 685/720 in NEET',
    quote: 'I missed the cutoff in my first attempt, but Kalviyugam Academy changed my entire approach. The intensive daily mock tests and personalized doubt-clearing sessions gave me the confidence to succeed. Their biology faculty is truly outstanding.',
    avatar: '/images/avatars/karthikeyan.png',
    tags: ['NEET', 'Repeater', 'Mock Exams']
  },
  {
    name: 'Aishwarya Lakshmi',
    course: 'Higher Secondary (+2) & JEE',
    result: 'State Top 10 & Cleared JEE',
    quote: 'The teachers at Kalviyugam didn\'t just force me to memorize physics formulas; they made me visualize the concepts. That foundational clarity is exactly why I could tackle the toughest JEE problems without panicking.',
    avatar: '/images/avatars/aishwarya.png',
    tags: ['JEE Mains', 'State Rank', 'Concept Focus']
  },
  {
    name: 'Surya Narayanan',
    course: '10th Board Excellence',
    result: 'Perfect 500/500 Marks',
    quote: 'The transition to 10th grade was intimidating, but the small batch sizes here meant I received incredible individual attention. They mapped out an exact study schedule that was completely stress-free yet highly effective.',
    avatar: '/images/avatars/surya.png',
    tags: ['10th Board', 'Mentorship', 'Small Batch']
  },
  {
    name: 'Sanjay Krishnan',
    course: 'NEET Foundation (11th & 12th)',
    result: '1st Attempt Medical Seat',
    quote: 'Balancing state board exams and NEET prep seemed impossible until I joined here. Their integrated curriculum perfectly aligns the state syllabus with competitive exam patterns. It saved me countless hours of duplicate studying.',
    avatar: '/images/avatars/sanjay.png',
    tags: ['Foundation', 'Time Management', 'NEET']
  },
  {
    name: 'Divya Bharathi',
    course: 'Intensive Crash Course',
    result: 'Top Tier Engineering Admission',
    quote: 'I attended their 3-month intensive crash course. The analytics dashboard they provided to track my weak spots was a literal game changer. I knew exactly which specific chapters to revise instead of blindly reading every textbook.',
    avatar: '/images/avatars/divya.png',
    tags: ['Crash Course', 'Analytics', 'Targeted Prep']
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play loop
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isInView]);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-10 md:py-40 relative overflow-hidden bg-theme-main">
      {/* Isolated Smoke Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-40">
          <SmokeBackground smokeColor="#00D4FF" />
        </div>
        {/* Contrast overlay for legibility */}
        <div className="absolute inset-0 bg-theme-main/70" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">

        {/* Header Section */}
        <div ref={ref} className="text-center mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-border-custom bg-white/5 mb-8"
          >
            <span className="font-mono text-[10px] md:text-sm uppercase tracking-widest text-text-muted">
              Student Stories
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold font-heading tracking-tight leading-[1] text-text-main mb-6"
          >
            Voices of Success
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-text-muted text-base md:text-lg max-w-2xl mx-auto"
          >
            Real learners share how they crushed dead-end strategies and boosted their ranks with our game-changing educational solutions.
          </motion.p>
        </div>

        {/* Avatars Row Removed */}

        {/* Carousel Area */}
        <div className="relative w-full h-[550px] md:h-[480px] flex justify-center items-center">
          {testimonials.map((t, index) => {
            const diff = index - activeIndex;
            const offset = diff * (isMobile ? 105 : 110);
            const isActive = diff === 0;
            const isVisible = Math.abs(diff) <= 1;

            return (
              <motion.div
                key={t.name}
                initial={false}
                animate={{
                  x: `${offset}%`,
                  scale: isActive ? 1 : 0.85,
                  opacity: isActive ? 1 : isVisible ? 0.3 : 0,
                  zIndex: isActive ? 10 : 5 - Math.abs(diff)
                }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className={`absolute top-0 bottom-0 m-auto h-fit w-[90vw] md:w-[500px] p-8 md:p-10 rounded-[1.5rem] border transition-colors duration-500
                  ${isActive
                    ? 'border-theme-dark/40 bg-theme-light shadow-[0_0_50px_rgba(0,212,255,0.1)]'
                    : 'border-border-custom bg-[#080d1a]'} glass`}
                style={{
                  pointerEvents: isActive ? 'auto' : 'none' // Only active card is interactive
                }}
              >
                {/* Top Left Tag */}
                <div className="flex items-center gap-2 mb-8">
                  <Hash className="w-4 h-4 text-theme-dark/70" />
                  <span className="text-sm text-text-muted font-mono">{t.course}</span>
                </div>

                {/* Avatar & Name */}
                <div className="flex items-center gap-4 mb-8">
                  <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full border border-border-custom object-cover" />
                  <div>
                    <h4 className="text-text-main font-bold text-lg leading-tight">{t.name}</h4>
                    <p className="text-text-muted text-xs font-mono uppercase tracking-wider mt-1">{t.result}</p>
                  </div>
                </div>

                {/* Stars Component */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                  <span className="ml-2 text-text-main font-bold font-mono">5.0</span>
                </div>

                {/* Quote */}
                <p className="text-text-main font-light leading-relaxed mb-10 text-base md:text-lg">
                  "{t.quote}"
                </p>

                {/* Bottom Tags */}
                <div className="flex flex-wrap gap-2">
                  {t.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 bg-[#050B14]/50 border border-white/10 rounded-md text-xs text-text-muted font-mono uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Navigation */}
        <div className="flex gap-4 mt-8 md:mt-12">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-xl bg-white/5 border border-border-custom flex items-center justify-center text-text-main hover:bg-white/10 hover:border-theme-dark/50 hover:text-theme-dark transition-all group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-xl bg-white/5 border border-border-custom flex items-center justify-center text-text-main hover:bg-white/10 hover:border-theme-dark/50 hover:text-theme-dark transition-all group"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
