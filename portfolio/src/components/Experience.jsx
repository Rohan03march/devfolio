import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Activity, Shield, Terminal } from 'lucide-react';

const experiences = [
  {
    company: 'Tech Innovators Inc.',
    role: 'Senior_Full-Stack_Dev',
    period: '2021 - PRESENT',
    description: 'Spearheading the architecture of high-performance enterprise platforms. Mastering React, Node.js, and Cloud-native solutions while leading a team of 10+ engineers.',
    id: 'LOG_01',
    status: 'ACTIVE'
  },
  {
    company: 'Creative Digital Studio',
    role: 'Lead_Frontend_Eng',
    period: '2019 - 2021',
    description: 'Defined the visual identity for top-tier startups. Specialized in Framer Motion, Three.js, and bespoke design systems for immersive web experiences.',
    id: 'LOG_02',
    status: 'COMPLETE'
  },
  {
    company: 'Junior Software House',
    role: 'Web_Developer',
    period: '2017 - 2019',
    description: 'Engineered responsive web solutions and scalable APIs. Built a strong foundation in modern JavaScript ecosystems and agile delivery.',
    id: 'LOG_03',
    status: 'COMPLETE'
  },
];

const ExperienceNode = ({ exp, index }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    style={{ marginBottom: '5rem', position: 'relative', paddingLeft: 'clamp(2rem, 8vw, 4rem)' }}
  >
    {/* Energy Conduit Line */}
    <div style={{ position: 'absolute', left: 0, top: 0, bottom: '-5rem', width: '2px', background: 'rgba(0, 245, 255, 0.1)' }}>
       <motion.div 
         initial={{ height: 0 }}
         whileInView={{ height: '100%' }}
         transition={{ duration: 1.5, delay: index * 0.2 }}
         style={{ width: '100%', background: '#00f5ff', boxShadow: '0 0 10px #00f5ff' }}
       />
    </div>

    {/* Pulsing Node */}
    <motion.div 
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      style={{ 
        position: 'absolute', 
        left: '-7px', 
        top: '1.5rem', 
        width: '16px', 
        height: '16px', 
        borderRadius: '50%', 
        background: '#020202',
        border: '2px solid #00f5ff',
        boxShadow: '0 0 15px #00f5ff',
        zIndex: 2
      }}
    >
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: 'rgba(0, 245, 255, 0.2)' }}
      />
    </motion.div>

    <div className="hologram-card technical-border" style={{ padding: '2.5rem' }}>
      <div className="scanner-line" />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <span className="mono" style={{ fontSize: '0.7rem', color: '#00f5ff', letterSpacing: '0.2em' }}>{exp.period} // {exp.id}</span>
          <h3 className="mono" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', marginTop: '0.5rem', fontWeight: 800, color: '#fff' }}>{exp.role}</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600, fontSize: '0.85rem' }}>
          <Building2 size={16} style={{ color: '#00f5ff' }} /> <span className="mono">{exp.company}</span>
        </div>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1.5rem' }}>{exp.description}</p>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
         <div style={{ padding: '2px 8px', border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: '2px', fontSize: '0.55rem', color: '#00f5ff', fontFamily: 'monospace' }}>
            STATUS: {exp.status}
         </div>
         <div style={{ display: 'flex', gap: '4px' }}>
            {[1,2,3,4].map(i => <div key={i} style={{ width: '4px', height: '1px', background: '#00f5ff', opacity: 0.3 }} />)}
         </div>
      </div>
    </div>
  </motion.div>
);

const Experience = () => {
  return (
    <section id="experience" className="section container" style={{ position: 'relative' }}>
      <div style={{ marginBottom: '5rem', position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Activity size={16} style={{ color: '#00f5ff' }} />
          <span className="mono" style={{ color: '#00f5ff', fontWeight: 800, letterSpacing: '0.3em', fontSize: '0.7rem' }}>
            CHRONO_CORE_LOGS
          </span>
        </div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em' }}>
          Mission <span className="text-glow" style={{ color: '#00f5ff' }}>History.</span>
        </h2>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {experiences.map((exp, index) => (
          <ExperienceNode key={exp.company + exp.period} exp={exp} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Experience;

