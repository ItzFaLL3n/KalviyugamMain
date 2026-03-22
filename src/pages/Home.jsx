import Hero from '../sections/Hero';
import Courses from '../sections/Courses';
import WhyChooseUs from '../sections/WhyChooseUs';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Courses />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
    </main>
  );
}
