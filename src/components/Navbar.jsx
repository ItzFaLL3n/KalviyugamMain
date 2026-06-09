import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/', isRoute: true },
  { label: 'Courses', href: '/#courses', isRoute: false },
  { label: 'Programs', href: '/#programs', isRoute: false },
  { label: 'Why Us', href: '/#why-us', isRoute: false },
  { label: 'Testimonials', href: '/#testimonials', isRoute: false },
  { label: 'Gallery', href: '/gallery', isRoute: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sync active state with route
  useEffect(() => {
    const syncNav = () => {
      setMobileOpen(false);
      const hash = window.location.hash;
      const path = location.pathname;
      
      if (path === '/' && (!hash || hash === '#hero')) setActiveIndex(0);
      else if (hash === '#courses') setActiveIndex(1);
      else if (hash === '#programs') setActiveIndex(2);
      else if (hash === '#why-us') setActiveIndex(3);
      else if (hash === '#testimonials') setActiveIndex(4);
      else if (path === '/gallery') setActiveIndex(5);
    };

    syncNav();
    window.addEventListener('popstate', syncNav);
    return () => window.removeEventListener('popstate', syncNav);
  }, [location.pathname, window.location.hash]);

  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveIndex(0);
    setMobileOpen(false);
  };

  const handleNavClick = (e, link, index) => {
    setActiveIndex(index);
    if (!link.isRoute && link.href.startsWith('/#')) {
      if (location.pathname === '/') {
        e.preventDefault();
        const id = link.href.replace('/#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileOpen(false);
  };

  return (
    <>
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'py-4 backdrop-blur-md bg-theme-light/80 border-b border-white/5 shadow-2xl' : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 relative z-10" onClick={handleHomeClick}>
          <span className="text-2xl font-bold tracking-wide font-heading">
            <span className="text-theme-dark">KALVIYUGAM</span>
          </span>
        </Link>

        {/* Desktop Interactive Pill Links */}
        <div className="hidden lg:flex items-center bg-white/5 backdrop-blur-2xl rounded-full p-1 border border-border-custom relative">
          {navLinks.map((link, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={link.label} className="relative group">
                {/* Active Indicators */}
                {isActive && (
                  <>
                    <motion.div
                      layoutId="nav-glow"
                      className="absolute inset-0 bg-gradient-to-r from-theme-mid/50 to-theme-dark/50 rounded-full blur-xl -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                    <motion.div
                      layoutId="nav-bg"
                      className="absolute inset-0 bg-white/10 border border-white/20 rounded-full -z-10 shadow-lg"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  </>
                )}
                
                {/* Link Content */}
                {link.isRoute ? (
                  <Link
                    to={link.href}
                    onClick={(e) => link.href === '/' ? handleHomeClick(e) : setActiveIndex(index)}
                    className={`relative z-10 block px-5 py-2.5 text-xs font-mono uppercase tracking-[0.15em] transition-colors duration-300 whitespace-nowrap ${
                      isActive ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "text-text-muted hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link, index)}
                    className={`relative z-10 block px-5 py-2.5 text-xs font-mono uppercase tracking-[0.15em] transition-colors duration-300 whitespace-nowrap ${
                      isActive ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "text-text-muted hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block relative z-10">
          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, { href: '/#contact', isRoute: false }, -1)}
            className="magnetic-btn text-xs font-mono tracking-[0.3em] px-8 py-4 bg-gradient-to-r from-theme-mid to-theme-dark text-white hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-3 sm:p-4 z-50 -mr-2 relative"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-theme-dark"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-theme-dark"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-theme-dark"
          />
        </button>
      </div>

      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-theme-main z-[110] flex flex-col items-center justify-center gap-6 lg:hidden"
          >
            {/* Top Close Button for mobile menu */}
            <div className="absolute top-6 right-6">
              <button 
                onClick={() => setMobileOpen(false)}
                className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-[2.5rem] p-3 w-[85%] max-w-sm">
              {navLinks.map((link, i) => {
                const isActive = i === activeIndex;
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="relative group w-full mb-1 last:mb-0"
                  >
                    {isActive && (
                      <>
                        <motion.div
                          layoutId="mobile-nav-glow"
                          className="absolute inset-0 bg-gradient-to-r from-theme-mid/50 to-theme-dark/50 rounded-full blur-xl -z-10"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                        <motion.div
                          layoutId="mobile-nav-bg"
                          className="absolute inset-0 bg-white/10 border border-white/20 rounded-full -z-10 shadow-lg"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      </>
                    )}
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        className={`relative z-10 block w-full text-center py-4 font-mono text-base uppercase tracking-[0.2em] transition-colors duration-300 ${
                          isActive ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "text-text-muted hover:text-white"
                        }`}
                        onClick={() => {
                          setActiveIndex(i);
                          setMobileOpen(false);
                        }}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className={`relative z-10 block w-full text-center py-4 font-mono text-base uppercase tracking-[0.2em] transition-colors duration-300 ${
                          isActive ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "text-text-muted hover:text-white"
                        }`}
                        onClick={(e) => handleNavClick(e, link, i)}
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>
            
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
                className="w-[85%] max-w-sm"
             >
                <a
                  href="/#contact"
                  className="block w-full text-center magnetic-btn text-sm font-mono tracking-[0.3em] px-8 py-5 rounded-full bg-gradient-to-r from-theme-mid to-theme-dark text-white border border-white/10 shadow-[0_0_30px_rgba(37,99,235,0.3)]"
                  onClick={(e) => handleNavClick(e, { href: '/#contact', isRoute: false }, -1)}
                >
                  GET STARTED
                </a>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
