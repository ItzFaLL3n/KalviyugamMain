import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TickerBand from '../components/TickerBand';
import { SmokeBackground } from '../components/ui/spooky-smoke-animation';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => { }, heroRef);
    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-theme-main"
      id="hero"
    >
      {/* Isolated Smoke Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-50">
          <SmokeBackground smokeColor="#2563EB" />
        </div>
        {/* Contrast overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-theme-main/60 to-theme-main" />
      </div>
      {/* Sutera-style HUD Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none flex flex-col justify-between">
        <div className="w-full h-px border-b border-border-custom mt-24" />
        <div className="w-full h-px border-b border-border-custom mb-32" />
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:flex justify-between">
        <div className="w-px h-full border-r border-border-custom ml-4 md:ml-8 lg:ml-24" />
        <div className="w-px h-full border-l border-border-custom mr-4 md:mr-8 lg:mr-24" />
      </div>

      {/* Crosshairs (+) at HUD Intersections */}
      <div className="hidden md:block absolute top-24 left-4 md:left-8 lg:left-24 -translate-x-1/2 -translate-y-1/2 text-text-muted text-xs z-10 pointer-events-none">+</div>
      <div className="hidden md:block absolute top-24 right-4 md:right-8 lg:right-24 translate-x-1/2 -translate-y-1/2 text-text-muted text-xs z-10 pointer-events-none">+</div>
      <div className="hidden md:block absolute bottom-32 left-4 md:left-8 lg:left-24 -translate-x-1/2 translate-y-1/2 text-text-muted text-xs z-10 pointer-events-none">+</div>
      <div className="hidden md:block absolute bottom-32 right-4 md:right-8 lg:right-24 translate-x-1/2 translate-y-1/2 text-text-muted text-xs z-10 pointer-events-none">+</div>

      {/* Corner-Pinned Metadata */}
      <div className="hidden md:block absolute top-8 right-4 md:right-8 lg:right-12 font-mono text-[10px] text-text-muted tracking-widest uppercase z-10 text-right">
        LOCAL TIME // {new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false, hour: '2-digit', minute: '2-digit' })} IST
      </div>
      <div className="hidden md:block absolute bottom-12 left-4 md:left-8 lg:left-12 font-mono text-[10px] text-text-muted tracking-widest uppercase z-10">
        <div className="flex flex-col gap-1">
          <span>LAT // 11.0168° N</span>
          <span>LNG // 76.9558° E</span>
        </div>
      </div>
      <div className="hidden md:block absolute bottom-12 right-4 md:right-8 lg:right-12 font-mono text-[10px] text-text-muted tracking-widest uppercase z-10 text-right">
        VERSION // 2.0.4.ALPHA
      </div>

      <div className="relative z-10 max-w-full px-6 md:px-12 lg:px-32 pt-40 lg:pt-56 pb-24 lg:pb-40 w-full flex flex-col justify-between min-h-screen">
        <div className="w-full mx-auto relative flex-1 flex flex-col justify-center">
          {/* Text */}
          {/* Text Content */}
          <div className="flex flex-col items-center text-center w-full relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center gap-4 mb-4 md:mb-8"
            >
              <span className="hidden md:inline-block font-mono text-text-muted tracking-tighter opacity-50">
                //////////
              </span>
              <span className="inline-block font-mono text-[10px] md:text-sm uppercase tracking-[0.4em] text-text-main border border-border-custom px-6 py-2 bg-theme-light/80 backdrop-blur-sm shadow-[0_0_20px_rgba(37,99,235,0.1)]">
                KALVIYUGAM ACADEMY
              </span>
              <span className="hidden md:inline-block font-mono text-text-muted tracking-tighter opacity-50">
                //////////
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-6xl sm:text-7xl lg:text-9xl xl:text-[10rem] font-bold leading-[0.85] tracking-tighter mb-8 font-body text-text-main uppercase w-full flex flex-col items-center"
            >
              <div className="overflow-hidden">
                <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                  <span className="hover-glitch" data-text="SHAPING">SHAPING</span>
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
                  <span className="hover-glitch" data-text="TOPPERS.">TOPPERS.</span>
                </motion.div>
              </div>
            </motion.h1>

            {/* Central Button & Descriptions */}
            <div className="flex flex-col items-center gap-6 md:gap-10 w-full max-w-3xl mt-4 md:mt-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-sm md:text-lg font-body text-text-muted leading-relaxed text-center"
              >
                Every day is an opportunity to learn and grow; embrace challenges, ask questions, be curious, and believe in your ability to achieve your goals.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center justify-center mt-2 relative z-50"
              >
                <button onClick={scrollToContact} className="magnetic-btn font-mono text-[10px] md:text-sm uppercase tracking-[0.3em] text-white bg-gradient-to-r from-theme-mid to-theme-dark px-10 py-5 rounded-full hover:shadow-[0_0_40px_rgba(37,99,235,0.7)] hover:-translate-y-1 transition-all duration-300">
                  JOIN ACADEMY
                </button>
              </motion.div>
            </div>

            {/* Secondary Metadata Block */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 text-right z-20 pointer-events-none"
            >
              {[
                { value: '10+', label: 'Years Runtime' },
                { value: '2000+', label: 'Mentored Units' },
              ].map((stat, i) => (
                <div key={stat.label} className="relative group pr-8">
                  {/* Callout Line */}
                  <div className="absolute right-full top-1/2 w-16 h-px bg-border-custom -translate-y-1/2 group-hover:bg-theme-dark transition-colors duration-500" />
                  <div className="absolute right-full top-1/2 w-2 h-2 bg-theme-light border border-border-custom -translate-y-1/2 -translate-x-[4rem] group-hover:border-theme-dark transition-colors duration-500" />

                  <p className="font-body text-3xl font-light text-text-main tracking-tighter">
                    {stat.value}
                  </p>
                  <p className="font-mono text-[8px] text-text-muted uppercase tracking-[0.3em] mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator & Ticker Bands */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden flex flex-col justify-end z-30 pointer-events-none pb-4">
        <TickerBand text="KALVIYUGAM ACADEMY //" color="bg-theme-mid" rotate="-2deg" direction={1} />
        <div className="-mt-8">
          <TickerBand text="MASTER THE EXAM //" color="bg-theme-dark" rotate="2deg" direction={-1} />
        </div>
      </div>
    </section>
  );
}
