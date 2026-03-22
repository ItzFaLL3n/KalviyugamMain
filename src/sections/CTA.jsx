import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-32 md:py-56 relative flex flex-col items-center justify-center min-h-[70vh]">

      <div className="relative z-10 max-w-full px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl text-center sm:text-6xl lg:text-[10rem] font-bold font-heading tracking-tighter leading-[0.85] text-text-main uppercase text-center"
        >
          <span className="hover-glitch" data-text="START">START</span> <span className="block text-text-muted italic font-light hover-glitch" data-text="NOW">NOW</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-text-muted mb-16 max-w-2xl mx-auto"
        >
          Initialize your academic transformation sequence here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <button onClick={scrollToContact} className="border border-border-custom px-16 py-8 text-text-main font-mono text-xs uppercase tracking-[0.5em] hover:bg-theme-dark text-soft-white hover:text-white transition-all duration-500">
            [ EXECUTE ]
          </button>
        </motion.div>
      </div>
    </section>
  );
}
