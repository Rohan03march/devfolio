import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Server } from 'lucide-react';

const services = [
  {
    icon: <Globe size={32} />,
    title: 'Platform Engineering',
    desc: 'Scalable, high-performance web systems built with modern stacks (React, Node, Go).',
    color: '#6366f1' // Indigo
  },
  {
    icon: <Smartphone size={32} />,
    title: 'Native Mobility',
    desc: 'Premium cross-platform mobile experiences with React Native and native performance.',
    color: '#10b981' // Emerald
  },
  {
    icon: <Server size={32} />,
    title: 'Robust Core Systems',
    desc: 'Enterprise-grade backend architecture, secure APIs, and cloud-native solutions.',
    color: '#f59e0b' // Amber
  },
];

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
        padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1.2rem, 4vw, 2.5rem)', 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
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
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${color}15, transparent 40%)`,
          opacity,
          transition: 'opacity 0.5s ease',
          zIndex: 0
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
         {children}
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="section container">
      <div style={{ marginBottom: 'clamp(3rem, 10vw, 6rem)' }} className="text-center-mobile">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ color: 'var(--accent-color)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.75rem' }}
        >
          Expertise
        </motion.span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', marginTop: '0.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Services & <span className="text-gradient">Solutions.</span>
        </h2>
      </div>

      <div className="grid-responsive">
        {services.map((service, index) => (
          <SpotlightCard key={service.title} color={service.color} delay={index * 0.1}>
            <div style={{ color: service.color, marginBottom: 'clamp(1.5rem, 5vw, 2.5rem)' }}>
              {service.icon}
            </div>
            <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', marginBottom: '1rem', fontWeight: 700 }}>{service.title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 'clamp(0.95rem, 1.05vw, 1.05rem)' }}>{service.desc}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
};

export default Services;
