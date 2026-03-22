import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Zap, Cpu } from 'lucide-react';

const SpotlightCard = ({ children, color, delay }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        padding: 'clamp(1.5rem, 5vw, 2.5rem)', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)'
      }}
    >
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: 0, top: 0, width: '100%', height: '100%',
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${color}20, transparent 40%)`,
          opacity,
          transition: 'opacity 0.5s ease',
          zIndex: 0
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'inherit' }}>
         {children}
      </div>
    </motion.div>
  );
};

const About = () => {
  const masteryCards = [
    { icon: <Layers size={24} />, title: 'Full Stack Architecture', desc: 'Designing scalable, robust systems from database to UI.', color: '#6366f1' },
    { icon: <Cpu size={24} />, title: 'Performance Engineering', desc: 'Optimizing every byte for speed and seamless interaction.', color: '#10b981' },
    { icon: <ShieldCheck size={24} />, title: 'Authentic Security', desc: 'Baking security into the DNA of every application built.', color: '#f59e0b' },
    { icon: <Zap size={24} />, title: 'Modern Ecosystems', desc: 'Mastering the latest in React, Node, and Cloud Native.', color: '#ec4899' }
  ];

  return (
    <section id="about" className="section container">
      <div className="grid-responsive" style={{ alignItems: 'center', gap: 'clamp(3rem, 10vw, 6rem)' }}>
        
        {/* Editorial Text Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center-mobile"
        >
          <span style={{ 
            color: 'var(--accent-color)', 
            fontWeight: 600, 
            letterSpacing: '0.2em', 
            textTransform: 'uppercase', 
            fontSize: '0.75rem',
            marginBottom: '1rem',
            display: 'block'
          }}>
            The Visionary
          </span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', marginBottom: '1.5rem', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em' }}>
            Engineering <span className="text-gradient">Authentic</span> <br />
            Digital Experiences.
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: 'clamp(1rem, 1.2vw, 1.2rem)', lineHeight: 1.7 }}>
            I specialize in bridging the gap between complex engineering and human-centered design. 
            My approach is grounded in technical excellence and a relentless pursuit of "Smooth" performance.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 1.1vw, 1.1rem)', lineHeight: 1.7 }}>
            Whether it's a high-concurrency backend or a pixel-perfect mobile interface, I build with 
            integrity and long-term scalability in mind.
          </p>
        </motion.div>

        {/* Mastery Cards Column */}
        <div className="grid-cards">
          {masteryCards.map((card, i) => (
            <SpotlightCard key={card.title} color={card.color} delay={i * 0.1}>
              <div style={{ color: card.color }}>{card.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{card.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{card.desc}</p>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
