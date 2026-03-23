import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const JarvisHUD = () => {
  const [timestamp, setTimestamp] = useState(new Date().toLocaleTimeString());
  const [metrics, setMetrics] = useState({ core: 42.5, temp: 38.2, uptime: '02:14:55' });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
      setMetrics(prev => ({
        core: Math.min(100, Math.max(10, prev.core + (Math.random() - 0.5) * 5)),
        temp: Math.min(80, Math.max(30, prev.temp + (Math.random() - 0.5) * 2)),
        uptime: prev.uptime // Simplified uptime for now
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100, overflow: 'hidden' }}>
      {/* Corner Brackets */}
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', width: '40px', height: '40px', borderLeft: '2px solid #00f5ff', borderTop: '2px solid #00f5ff', opacity: 0.4 }} />
      <div style={{ position: 'absolute', top: '2rem', right: '2rem', width: '40px', height: '40px', borderRight: '2px solid #00f5ff', borderTop: '2px solid #00f5ff', opacity: 0.4 }} />
      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', width: '40px', height: '40px', borderLeft: '2px solid #00f5ff', borderBottom: '2px solid #00f5ff', opacity: 0.4 }} />
      <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', width: '40px', height: '40px', borderRight: '2px solid #00f5ff', borderBottom: '2px solid #00f5ff', opacity: 0.4 }} />

      {/* Main Technical Header */}
      <div style={{ 
        position: 'absolute', 
        top: '1.5rem', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        gap: '0.5rem',
        padding: '1rem 3rem',
        background: 'linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.05), transparent)',
        borderBottom: '1px solid rgba(0, 245, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: '#00f5ff', opacity: 0.8, letterSpacing: '0.3em' }}>
            JARVIS_OS_v4.2.1 // SYS_ACTIVE
          </div>
          <div className="mono" style={{ fontSize: '0.7rem', color: '#fff', fontWeight: 800, letterSpacing: '0.2em' }}>
            T[{timestamp}]
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', opacity: 0.6 }}>
           <span className="mono" style={{ fontSize: '0.55rem', color: '#00f5ff' }}>CORE_LOAD[{metrics.core.toFixed(1)}%]</span>
           <span className="mono" style={{ fontSize: '0.55rem', color: '#00f5ff' }}>TEMP[{metrics.temp.toFixed(1)}°C]</span>
           <span className="mono" style={{ fontSize: '0.55rem', color: '#00f5ff' }}>UPTIME[02:14:55]</span>
        </div>
      </div>

      {/* Scanning Background Grid (Subtle) */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 245, 255, 0.02) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'linear-gradient(rgba(0, 245, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '100px 100px',
        opacity: 0.1,
        pointerEvents: 'none'
      }} />

      {/* Global Scanline */}
      <div className="scanner-line" style={{ opacity: 0.08 }} />

      <style>{`
        @media (max-width: 768px) {
          .jarvis-hud-metadata { display: none; }
        }
      `}</style>
    </div>
  );
};

export default JarvisHUD;
