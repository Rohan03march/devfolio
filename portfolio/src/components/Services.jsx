import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Server, Activity, Database, Shield } from 'lucide-react';

const services = [
  {
    icon: <Globe size={28} />,
    title: 'Web_Platforms',
    desc: 'Building scalable web applications using modern stacks like React, Next.js, Node.js, and cloud services.',
    id: 'PX-01',
    status: 'ACTIVE'
  },
  {
    icon: <Smartphone size={28} />,
    title: 'Mobile_Apps',
    desc: 'Developing cross-platform mobile apps with React Native and Expo, focusing on performance and clean UI.',
    id: 'PX-02',
    status: 'ACTIVE'
  },
  {
    icon: <Server size={28} />,
    title: 'Backend_Systems',
    desc: 'Designing APIs, databases, authentication systems, and cloud deployments for scalable applications.',
    id: 'PX-03',
    status: 'STABLE'
  }
];

const BitStream = () => {
  const [bits, setBits] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      const char = Math.random() > 0.5 ? '1' : '0';
      setBits(prev => (char + prev).slice(0, 15));
    }, 200);
    return () => clearInterval(interval);
  }, []);
  return <span style={{ fontFamily: 'monospace', opacity: 0.4, fontSize: '0.6rem' }}>{bits}</span>;
};

const HologramServiceCard = ({ service, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="hologram-card technical-border"
      style={{
        padding: '3rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }}
    >
      <div className="scanner-line" />

      {/* HUD Data Top */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span className="mono" style={{ fontSize: '0.6rem', color: '#00f5ff' }}>ID_{service.id}</span>
          <BitStream />
        </div>
        <div style={{ padding: '2px 8px', border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: '2px', fontSize: '0.55rem', color: '#00f5ff', fontWeight: 700 }}>
          {service.status}
        </div>
      </div>

      <div style={{ color: '#00f5ff', marginBottom: '2rem', filter: 'drop-shadow(0 0 8px rgba(0, 245, 255, 0.4))' }}>
        {service.icon}
      </div>

      <h3 className="mono" style={{ fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 800, color: '#fff' }}>
        {service.title}
      </h3>

      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.9rem', flex: 1 }}>
        {service.desc}
      </p>

      {/* Decorative Bottom Corner */}
      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', gap: '4px' }}>
        {[1, 2, 3].map(i => <div key={i} style={{ width: '4px', height: '4px', background: '#00f5ff', opacity: 0.3 }} />)}
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="section container" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ marginBottom: '5rem', position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00f5ff', boxShadow: '0 0 10px #00f5ff' }} />
          <span className="mono" style={{ color: '#00f5ff', fontWeight: 800, letterSpacing: '0.3em', fontSize: '0.7rem' }}>
            CAPABILITIES_MATRIX
          </span>
        </div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#fff' }}>
          System <span className="text-glow" style={{ color: '#00f5ff' }}>Services.</span>
        </h2>
      </div>

      <div className="services-grid" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem'
      }}>
        {services.map((service, index) => (
          <HologramServiceCard key={service.title} service={service} delay={index * 0.1} />
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Services;

