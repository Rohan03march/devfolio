import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { useMotionValue } from 'framer-motion';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import JarvisHUD from './components/JarvisHUD';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import FreelancePage from './pages/FreelancePage';
import './App.css';

// Component to handle scroll restoration on route change when using Lenis/Router
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Conditional Navigation rendering
const NavigationWrapper = () => {
  const location = useLocation();
  const showNav = location.pathname !== '/projects';

  return showNav ? <Navigation /> : null;
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      // Silky-smooth: longer duration + expo-out easing feels cinematic
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 4), // quartic ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,   // slightly reduced so it never feels rushed
      smoothTouch: false,
      touchMultiplier: 1.8,
      infinite: false,
    });

    // Expose lenis instance globally so Hero/other components can subscribe
    window.__lenis = lenis;

    // Sync Lenis scroll value with native window.scrollY so Framer Motion's
    // useScroll() stays frame-perfect (no jitter between smooth & native pos)
    lenis.on('scroll', ({ scroll }) => {
      // Framer Motion reads document.documentElement.scrollTop internally;
      // Lenis already updates it, this event is our hook for any extras.
      window.dispatchEvent(new Event('scroll'));
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <JarvisHUD />
        <CustomCursor />
        <NavigationWrapper />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/freelance" element={<FreelancePage />} />
        </Routes>

        <footer style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          borderTop: '1px solid rgba(0, 245, 255, 0.1)',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '0.7rem',
          position: 'relative',
          background: 'rgba(2, 2, 4, 0.8)'
        }}>
          <div className="mono" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{ letterSpacing: '0.2em' }}>
              <span style={{ color: '#00f5ff' }}>©</span> {new Date().getFullYear()} // ROHAN.SYSTEM_v1.0.4
            </p>
          </div>
          <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', width: '60px', height: '2px', background: '#00f5ff', boxShadow: '0 0 10px #00f5ff' }} />
        </footer>
      </div>
    </Router>
  );
}

export default App;
