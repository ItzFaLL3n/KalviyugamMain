import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from '../components/SmoothScroll';
import Hero from '../sections/Hero';
import Courses from '../sections/Courses';
import Results from '../sections/Results';
import WhyWeStandOut from '../sections/WhyWeStandOut';
// import WhyChooseUs from '../sections/WhyChooseUs';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';

export default function Home() {
  const location = useLocation();
  const lenisRef = useLenis();

  /* ── Scroll to a section when navigated from another page ── */
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;
    // Wait for PageTransition animation (600ms) + paint buffer
    const timer = setTimeout(() => {
      const el = document.getElementById(target);
      if (!el) return;
      const lenis = lenisRef?.current;
      if (lenis) {
        // Use lenis.scrollTo so Lenis's internal targetScroll is updated —
        // native scrollIntoView gets overridden by Lenis's RAF loop
        lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 700);
    return () => clearTimeout(timer);
  }, [location.state, lenisRef]);

  useEffect(() => {
    // Select all sections with an id
    const sections = document.querySelectorAll('section[id]');
    
    // Observer to update URL dynamically
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Update URL hash without causing a page jump
          window.history.replaceState(null, null, `#${entry.target.id}`);
          // Force a popstate event so Navbar can sync its active state if needed
          window.dispatchEvent(new Event('popstate'));
        }
      });
    }, {
      // Trigger when the section crosses roughly the top 1/3rd of the screen
      rootMargin: '-30% 0px -70% 0px'
    });

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Hero />
      <Courses />
      <Results />
      <WhyWeStandOut />
      {/* <WhyChooseUs /> */}
      <Testimonials />
      <Contact />
    </main>
  );
}
