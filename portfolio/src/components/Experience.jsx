import React from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

const experiences = [
  {
    company: 'Tech Innovators Inc.',
    role: 'Senior Full-Stack Developer',
    period: '2021 - Present',
    description: 'Spearheading the architecture of high-performance enterprise platforms. Mastering React, Node.js, and Cloud-native solutions while leading a team of 10+ engineers.',
    color: '#6366f1'
  },
  {
    company: 'Creative Digital Studio',
    role: 'Lead Frontend Engineer',
    period: '2019 - 2021',
    description: 'Defined the visual identity for top-tier startups. Specialized in Framer Motion, Three.js, and bespoke design systems for immersive web experiences.',
    color: '#10b981'
  },
  {
    company: 'Junior Software House',
    role: 'Web Developer',
    period: '2017 - 2019',
    description: 'Engineered responsive web solutions and scalable APIs. Built a strong foundation in modern JavaScript ecosystems and agile delivery.',
    color: '#f59e0b'
  },
];

const ExperienceCard = ({ exp, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    style={{ marginBottom: '4rem', position: 'relative' }}
  >
    <div className="glass-panel" style={{ padding: 'clamp(2rem, 6vw, 3.5rem)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: exp.color, letterSpacing: '0.1em' }}>{exp.period}</span>
          <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginTop: '0.5rem', fontWeight: 700 }}>{exp.role}</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
          <Building2 size={20} /> {exp.company}
        </div>
      </div>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>{exp.description}</p>
    </div>
  </motion.div>
);

const Experience = () => {
  return (
    <section id="experience" className="section container">
      <div style={{ marginBottom: 'clamp(3rem, 10vw, 6rem)' }} className="text-center-mobile">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ color: 'var(--accent-color)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem' }}
        >
          The Journey
        </motion.span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginTop: '0.5rem' }}>
          Professional <span className="text-gradient">Timeline.</span>
        </h2>
      </div>

      <div style={{ maxWidth: '1000px', marginInline: 'auto' }}>
        {experiences.map((exp, index) => (
          <ExperienceCard key={exp.company + exp.period} exp={exp} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
