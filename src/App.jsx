import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SmoothScroll, { useLenis } from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { useEffect } from 'react';

function ScrollToTop() {
  const location = useLocation();
  const lenisRef = useLenis();
  useEffect(() => {
    // Skip scroll-to-top if we're navigating to a specific section
    if (location.state?.scrollTo) return;
    const lenis = lenisRef?.current;
    if (lenis) {
      // immediate: true — no smooth animation, just snap to top instantly on route change
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, lenisRef]);
  return null;
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </PageTransition>
      <Navbar />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <AppContent />
      </SmoothScroll>
    </BrowserRouter>
  );
}
