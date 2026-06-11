import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home',         href: '/',             isRoute: true,  sectionId: null        },
  { label: 'Courses',      href: '/#courses',      isRoute: false, sectionId: 'courses'   },
  { label: 'Results',      href: '/#results',      isRoute: false, sectionId: 'results'   },
  { label: 'Why',          href: '/#stand-out',    isRoute: false, sectionId: 'stand-out' },
  { label: 'Testimonials', href: '/#testimonials', isRoute: false, sectionId: 'testimonials' },
  { label: 'Gallery',      href: '/gallery',        isRoute: true,  sectionId: null        },
  { label: 'Contact',      href: '/#contact',      isRoute: false, sectionId: 'contact'   },
];

function getActiveIndex(pathname, hash) {
  if (pathname === '/gallery') return 5;
  if (hash === '#contact')      return 6;
  if (hash === '#testimonials') return 4;
  if (hash === '#stand-out')    return 3;
  if (hash === '#results')      return 2;
  if (hash === '#courses')      return 1;
  return 0;
}

const menuVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};


export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const navigate  = useNavigate();

  /* scroll shadow */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* sync active state */
  useEffect(() => {
    const sync = () => {
      setMobileOpen(false);
      setActiveIndex(getActiveIndex(location.pathname, window.location.hash));
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, [location.pathname, location.hash]);

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* click handler — scroll if on home, otherwise let router navigate */
  const handleClick = (e, link, index) => {
    setActiveIndex(index);
    setMobileOpen(false);
    if (!link.isRoute && link.sectionId) {
      e.preventDefault();
      if (location.pathname === '/') {
        // Already on home — just smooth scroll
        document.getElementById(link.sectionId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // On another page — pass target via router state, NOT sessionStorage
        navigate('/', { state: { scrollTo: link.sectionId } });
      }
    }
  };

  const handleHomeClick = (e) => {
    setActiveIndex(0);
    setMobileOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ${
          scrolled
            ? 'py-3 bg-[#050B14]/90 backdrop-blur-xl border-b border-white/[0.06]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link to="/" onClick={handleHomeClick} className="flex-shrink-0">
            <span className="text-xl md:text-2xl font-black font-heading tracking-wide text-theme-dark">
              KALVIYUGAM
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => {
              const isActive = index === activeIndex;
              return link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={(e) => link.href === '/' ? handleHomeClick(e) : handleClick(e, link, index)}
                  className={`px-4 py-2 text-[11px] font-mono uppercase tracking-[0.18em] rounded-md transition-colors duration-150 whitespace-nowrap ${
                    isActive
                      ? 'text-theme-dark bg-theme-dark/10'
                      : 'text-white/45 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleClick(e, link, index)}
                  className={`px-4 py-2 text-[11px] font-mono uppercase tracking-[0.18em] rounded-md transition-colors duration-150 whitespace-nowrap ${
                    isActive
                      ? 'text-theme-dark bg-theme-dark/10'
                      : 'text-white/45 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:block flex-shrink-0">
            <a
              href="/#contact"
              onClick={(e) => handleClick(e, { href: '/#contact', isRoute: false, sectionId: 'contact' }, 6)}
              className="magnetic-btn text-[11px] font-mono tracking-[0.25em] uppercase px-6 py-3 bg-gradient-to-r from-theme-mid to-theme-dark text-white rounded-full transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(0,212,255,0.35)]"
            >
              Enroll Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 z-[120]"
            aria-label="Toggle menu"
          >
            <motion.span animate={mobileOpen ? { rotate: 45, y: 6.5 }    : { rotate: 0, y: 0 }}    transition={{ duration: 0.2 }} className="block w-6 h-[1.5px] bg-white origin-center" />
            <motion.span animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.15 }} className="block w-6 h-[1.5px] bg-white" />
            <motion.span animate={mobileOpen ? { rotate: -45, y: -6.5 }  : { rotate: 0, y: 0 }}   transition={{ duration: 0.2 }} className="block w-6 h-[1.5px] bg-white origin-center" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[110] bg-[#050B14]/40 backdrop-blur-3xl backdrop-saturate-[1.9] flex flex-col items-center justify-start pt-28 pb-12 overflow-y-auto lg:hidden"
          >
            {/* Liquid Glass Menu Panel */}
            <div className="w-[90%] max-w-sm bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6 flex flex-col gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl relative overflow-hidden shrink-0">
              {/* Subtle glass reflection glow */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-theme-dark/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-theme-mid/10 rounded-full blur-2xl pointer-events-none" />

              {navLinks.map((link, i) => {
                const isActive = i === activeIndex;
                return (
                  <motion.div key={link.label} variants={itemVariants} className="w-full flex justify-center">
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        onClick={(e) => link.href === '/' ? handleHomeClick(e) : handleClick(e, link, i)}
                        className={`w-full text-center py-3.5 font-mono text-sm uppercase tracking-[0.2em] rounded-2xl transition-all duration-200 border ${
                          isActive 
                            ? 'text-theme-dark bg-theme-dark/15 border-theme-dark/40 shadow-[0_0_20px_rgba(0,212,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)] font-semibold' 
                            : 'text-white/70 hover:text-white bg-transparent border-transparent hover:bg-white/[0.03]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleClick(e, link, i)}
                        className={`w-full text-center py-3.5 font-mono text-sm uppercase tracking-[0.2em] rounded-2xl transition-all duration-200 border ${
                          isActive 
                            ? 'text-theme-dark bg-theme-dark/15 border-theme-dark/40 shadow-[0_0_20px_rgba(0,212,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)] font-semibold' 
                            : 'text-white/70 hover:text-white bg-transparent border-transparent hover:bg-white/[0.03]'
                        }`}
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.div>
                );
              })}

              <motion.div variants={itemVariants} className="w-full flex justify-center mt-2">
                <a
                  href="/#contact"
                  onClick={(e) => handleClick(e, { href: '/#contact', isRoute: false, sectionId: 'contact' }, 6)}
                  className="w-full text-center font-mono text-sm tracking-[0.25em] uppercase px-8 py-4 rounded-2xl bg-gradient-to-r from-theme-mid to-theme-dark text-white shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_30px_rgba(37,99,235,0.5)] transition-all duration-300 transform active:scale-[0.98]"
                >
                  Enroll Now
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
