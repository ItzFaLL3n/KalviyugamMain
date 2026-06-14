import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Hash, GraduationCap, Users } from 'lucide-react';
import { SmokeBackground } from '../components/ui/spooky-smoke-animation';

const testimonials = [
  {
    name: 'Mithun',
    type: 'parent',
    result: 'Visible Academic Growth',
    quote: 'My child is learning a lot and getting better marks compared to previous year marks. The teachers are very kind and helpful.',
    tags: ['Better Marks', 'Kind Teachers']
  },
  {
    name: 'Shakthivel',
    type: 'student',
    result: 'Improved Maths Score',
    quote: 'The study environment is calm and comfortable, making it easier to focus on studies. Regular tests and practice sessions help improve knowledge and build confidence. Thank you Raagul sir for helping me get better marks in maths!',
    tags: ['Regular Tests', 'Maths']
  },
  {
    name: 'Tharun',
    type: 'parent',
    result: 'Better Discipline & Studies',
    quote: 'My kid is hyperactive. We changed many tuitions because of his naughtiness, but here the teachers take care of him politely and shaped him better. I\'m very happy that he is improving in studies as well as in discipline.',
    tags: ['Discipline', 'Personal Care']
  },
  {
    name: 'Shruthi',
    type: 'parent',
    result: '470 / 500 in Revision Exams',
    quote: 'My daughter is studying 10th standard and I\'m very happy to say that she has scored 470 out of 500 in her revision exams. I\'m deeply thankful to Kalviyugam for making this achievement possible.',
    tags: ['10th Standard', 'Top Score']
  },
  {
    name: 'Thirumurugan',
    type: 'student',
    result: 'Concepts Made Crystal Clear',
    quote: 'The teachers use simple, relatable examples to explain concepts. This makes learning more interesting and effective. Thank you teachers for your constant support and guidance.',
    tags: ['Concept Clarity', 'Supportive Faculty']
  },
  {
    name: 'Guna',
    type: 'parent',
    result: 'Visibly Better Marks',
    quote: 'Honestly, this tuition is 100 out of 100 — not just for the sake of a review, I\'m saying this from the bottom of my heart. After joining my son in Kalviyugam I can visibly see the difference in his marks. I\'m feeling proud and happy for him.',
    tags: ['Highly Recommended', 'Proud Moment']
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
                {/* Avatar & Name Row */}
                <div className="flex items-center gap-4 mb-6">
                  {/* Initials Circle */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xl"
                    style={{ background: t.type === 'parent'
                      ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                      : 'linear-gradient(135deg, #00D4FF, #0ea5e9)' }}
                  >
                    {t.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-text-main font-bold text-lg leading-tight">{t.name}</h4>
                      {/* Role Badge */}
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                        style={t.type === 'parent'
                          ? { background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }
                          : { background: 'rgba(0,212,255,0.12)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.25)' }}
                      >
                        {t.type === 'parent'
                          ? <><Users className="w-2.5 h-2.5" /> Parent</>
                          : <><GraduationCap className="w-2.5 h-2.5" /> Student</>}
                      </span>
                    </div>
                    <p className="text-text-muted text-xs font-mono uppercase tracking-wider mt-1">{t.result}</p>
                  </div>
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
