import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import JarvisHUD from './components/JarvisHUD';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
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
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
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
            <p style={{ opacity: 0.6, fontSize: '0.6rem' }}>
              DEPLOYED_BY: <span style={{ color: '#00f5ff' }}>HYPER_CORE</span> // PROTOCOL: <span style={{ color: '#00f5ff' }}>IRONMAN_HUD</span>
            </p>
          </div>
          <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', width: '60px', height: '2px', background: '#00f5ff', boxShadow: '0 0 10px #00f5ff' }} />
        </footer>
      </div>
    </Router>
  );
}

export default App;
