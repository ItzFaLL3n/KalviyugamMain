import { useEffect } from 'react';
import Hero from '../sections/Hero';
import Courses from '../sections/Courses';
import OurPrograms from '../sections/OurPrograms';
import WhyWeStandOut from '../sections/WhyWeStandOut';
import WhyChooseUs from '../sections/WhyChooseUs';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';

export default function Home() {
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
      <OurPrograms />
      <WhyWeStandOut />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
    </main>
  );
}
