import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Shield, Activity, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: 'E-COMM_PLATFORM',
    description: 'A full-featured online store with real-time inventory management, secure payments, and a sleek user interface built with React and Node.js.',
    tech: ['REACT', 'NODE', 'MONGO', 'STRIPE'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000',
    id: 'BP-08',
    stability: '99.4%'
  },
  {
    title: 'AI_ANALYTICS_DASH',
    description: 'An advanced data visualization tool that leverages machine learning to provide actionable insights for business intelligence.',
    tech: ['NEXT', 'PYTHON', 'TF', 'D3'],
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1000',
    id: 'BP-16',
    stability: '98.7%'
  },
  {
    title: 'SAAS_PORTFOLIO_MGR',
    description: 'A comprehensive wealth management application for tracking investments across various asset classes in real-time.',
    tech: ['TS', 'EXPRESS', 'POSTGRES', 'REDUX'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    id: 'BP-24',
    stability: '99.9%'
  },
];

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    className="hologram-card technical-border"
    style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}
  >
    <div className="scanner-line" />
    
    {/* Image Container with HUD */}
    <div style={{ height: 'clamp(180px, 30vh, 220px)', overflow: 'hidden', position: 'relative', borderBottom: '1px solid rgba(0, 245, 255, 0.1)' }}>
      <img 
        src={project.image} 
        alt={project.title} 
        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) brightness(0.7) contrast(1.2) sepia(50%) hue-rotate(160deg)' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(2, 2, 4, 0.8))' }} />
      <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
         <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00f5ff', boxShadow: '0 0 8px #00f5ff' }} />
         <span className="mono" style={{ fontSize: '0.55rem', color: '#00f5ff', opacity: 0.8, letterSpacing: '0.2em' }}>ENCRYPTED_FILE_{project.id}</span>
      </div>
      
      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', gap: '0.8rem' }}>
        <a href="#" className="hologram-card" style={{ padding: '0.5rem', background: 'rgba(2, 2, 4, 0.6)', border: '1px solid rgba(0, 245, 255, 0.3)' }}>
          <Github size={16} style={{ color: '#00f5ff' }} />
        </a>
        <a href="#" className="hologram-card" style={{ padding: '0.5rem', background: 'rgba(2, 2, 4, 0.6)', border: '1px solid rgba(0, 245, 255, 0.3)' }}>
          <ExternalLink size={16} style={{ color: '#00f5ff' }} />
        </a>
      </div>
    </div>
    
    {/* Content Area */}
    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
         <h3 className="mono" style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fff' }}>{project.title}</h3>
         <span className="mono" style={{ fontSize: '0.6rem', color: '#00f5ff', opacity: 0.6 }}>STBL_{project.stability}</span>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.85rem', lineHeight: '1.6', flex: 1 }}>
        {project.description}
      </p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', borderTop: '1px solid rgba(0, 245, 255, 0.05)', paddingTop: '1rem' }}>
        {project.tech.map(t => (
          <span key={t} className="mono" style={{ 
            padding: '2px 8px', 
            background: 'rgba(0, 245, 255, 0.05)', 
            border: '1px solid rgba(0, 245, 255, 0.1)',
            fontSize: '0.6rem',
            color: '#00f5ff'
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const Projects = ({ limit }) => {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section id="projects" className="section container" style={{ position: 'relative' }}>
      <div style={{ marginBottom: '5rem', position: 'relative', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <Shield size={16} style={{ color: '#00f5ff' }} />
          <span className="mono" style={{ color: '#00f5ff', fontWeight: 800, letterSpacing: '0.3em', fontSize: '0.7rem' }}>
            INTELLIGENCE_REPOSITORY
          </span>
        </div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#fff' }}>
          Classified <span className="text-glow" style={{ color: '#00f5ff' }}>Projects.</span>
        </h2>
      </div>

      <div className="projects-grid" style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '2.5rem'
      }}>
        {displayedProjects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>

      {limit && (
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <Link 
            to="/projects" 
            className="hologram-card technical-border"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '1rem', 
              padding: '1.2rem 3rem', 
              color: '#00f5ff',
              fontWeight: 800,
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontSize: '0.8rem',
              background: 'rgba(0, 245, 255, 0.05)',
              boxShadow: '0 0 20px rgba(0, 245, 255, 0.1)'
            }}
          >
            Access_Full_Archives <ArrowRight size={18} />
          </Link>
        </div>
      )}
      
      <style>{`
        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Projects;

