import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import SmoothScroll, { useLenis } from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { useEffect } from 'react';

function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-text-muted">404</p>
      <h1 className="text-5xl sm:text-7xl font-bold font-heading tracking-tighter text-text-main uppercase">
        Page Not Found
      </h1>
      <p className="text-text-muted max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="mt-4 px-8 py-4 border border-border-custom text-text-main font-mono text-xs uppercase tracking-widest hover:border-theme-dark hover:text-theme-dark transition-colors duration-300"
      >
        Back to Home
      </Link>
    </main>
  );
}

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
          <Route path="*" element={<NotFound />} />
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
