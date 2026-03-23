import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Zap, Cpu, Activity, Circle } from 'lucide-react';

const HologramDataPanel = ({ children, delay, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`hologram-card technical-border ${className}`}
      style={{ 
        padding: '2rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem',
        position: 'relative'
      }}
    >
      <div className="scanner-line" />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'inherit' }}>
         {children}
      </div>
    </motion.div>
  );
};

const About = () => {
  const [dataPoints, setDataPoints] = useState([85, 92, 78, 95]);

  useEffect(() => {
    const interval = setInterval(() => {
       setDataPoints(prev => prev.map(p => Math.min(100, Math.max(70, p + (Math.random() - 0.5) * 5))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const masteryCards = [
    { icon: <Layers size={20} />, title: 'Full_Stack_Arch', desc: 'Designing scalable, robust systems from database to UI.', id: 'ARCH-X' },
    { icon: <Cpu size={20} />, title: 'Perf_Engineering', desc: 'Optimizing every byte for speed and seamless interaction.', id: 'PERF-Y' },
    { icon: <ShieldCheck size={20} />, title: 'Authentic_Security', desc: 'Baking security into the DNA of every application built.', id: 'SEC-Z' },
    { icon: <Zap size={20} />, title: 'Modern_Ecosystems', desc: 'Mastering the latest in React, Node, and Cloud Native.', id: 'ECO-W' }
  ];

  return (
    <section id="about" className="section container" style={{ position: 'relative' }}>
      <div className="grid-responsive" style={{ maxWidth: '1200px', margin: '0 auto', alignItems: 'flex-start', gap: 'clamp(3rem, 10vw, 5rem)' }}>
        
        {/* Technical Registry Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                   <Activity size={16} style={{ color: '#00f5ff' }} />
              </motion.div>
              <span className="mono" style={{ color: '#00f5ff', fontWeight: 800, letterSpacing: '0.3em', fontSize: '0.7rem' }}>
                THE_VISIONARY_REGISTRY
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {[ {label: 'THREAT_LVL', val: '0.00%'}, {label: 'SYSTEM_SYNC', val: '100%'} ].map(stat => (
                <div key={stat.label} style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
                  <span className="mono" style={{ fontSize: '0.45rem', color: '#00f5ff', opacity: 0.5 }}>{stat.label}</span>
                  <span className="mono" style={{ fontSize: '0.65rem', color: '#fff', fontWeight: 700 }}>{stat.val}</span>
                </div>
              ))}
            </div>
          </div>

          <h2 style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', marginBottom: '2rem', lineHeight: 1, fontWeight: 900, letterSpacing: '-0.04em', color: '#fff' }}>
            Engineering <span className="text-glow" style={{ color: '#00f5ff' }}>Authentic</span> <br />
            Digital Realities.
          </h2>

          <div className="hologram-card technical-border" style={{ padding: '2.5rem', marginBottom: '2rem', background: 'rgba(0, 245, 255, 0.02)' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: 1.8 }}>
              Specializing in the intersection of <span style={{ color: '#fff', fontWeight: 600 }}>Complex Engineering</span> and <span style={{ color: '#00f5ff' }}>Human Experience</span>. 
              Grounded in technical excellence and the pursuit of "Zero-Latency" performance.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8 }}>
              Whether architecting high-concurrency backends or pixel-perfect neural interfaces, 
              each line of code is structured for integrity and long-term evolutionary scaling.
            </p>
          </div>

        </motion.div>

        {/* Mastery Grid Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {masteryCards.map((card, i) => (
              <HologramDataPanel key={card.title} delay={i * 0.1}>
                {/* ... card content ... */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ color: '#00f5ff', filter: 'drop-shadow(0 0 5px #00f5ff80)' }}>{card.icon}</div>
                  <span className="mono" style={{ fontSize: '0.55rem', color: '#00f5ff', opacity: 0.5 }}>{card.id}</span>
                </div>
                
                <h3 className="mono" style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>{card.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>{card.desc}</p>
                
                <div style={{ width: '100%', height: '3px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${dataPoints[i]}%` }}
                    style={{ height: '100%', background: '#00f5ff', boxShadow: '0 0 10px #00f5ff' }}
                  />
                </div>
              </HologramDataPanel>
            ))}
          </div>

          {/* New System Health Panel below the grid */}
          <HologramDataPanel delay={0.5} className="system-health-panel">
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: 'clamp(1rem, 4vw, 2rem)', flexWrap: 'wrap' }}>
                   {[ {label: 'SYNC_RATE', val: '99.8%'}, {label: 'CORE_UPTIME', val: '99.9%'} ].map(stat => (
                      <div key={stat.label}>
                         <div className="mono" style={{ fontSize: '0.45rem', color: '#00f5ff', opacity: 0.6 }}>{stat.label}</div>
                         <div className="mono" style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#fff', fontWeight: 800 }}>{stat.val}</div>
                      </div>
                   ))}
                </div>
                <div style={{ textAlign: 'right' }}>
                   <div className="mono" style={{ fontSize: '0.45rem', color: '#00f5ff', opacity: 0.6 }}>ENGINE_STATUS</div>
                   <div className="mono" style={{ fontSize: '0.7rem', color: '#00f5ff', fontWeight: 700 }}>OPTIMIZED</div>
                </div>
             </div>
          </HologramDataPanel>
        </div>

      </div>
      <style>{`
        .grid-responsive { display: grid; grid-template-columns: 1fr 1fr; }
        @media (max-width: 1024px) { .grid-responsive { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
};

export default About;

