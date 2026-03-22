import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured online store with real-time inventory management, secure payments, and a sleek user interface built with React and Node.js.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000',
    link: '#',
    github: '#',
  },
  {
    title: 'AI Analytics Dashboard',
    description: 'An advanced data visualization tool that leverages machine learning to provide actionable insights for business intelligence.',
    tech: ['Next.js', 'Python', 'TensorFlow', 'D3.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1000',
    link: '#',
    github: '#',
  },
  {
    title: 'SaaS Portfolio Manager',
    description: 'A comprehensive wealth management application for tracking investments across various asset classes in real-time.',
    tech: ['TypeScript', 'Express', 'PostgreSQL', 'Redux'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    link: '#',
    github: '#',
  },
];

const Projects = ({ limit }) => {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section id="projects" className="section container">
      <div style={{ marginBottom: 'clamp(3rem, 10vw, 5rem)' }} className="text-center-mobile">
        <h2 className="text-gradient" style={{ fontSize: 'clamp(2.2rem, 8vw, 4rem)' }}>Featured <span className="text-gradient-accent">Projects</span></h2>
        <p style={{ 
          color: 'var(--text-secondary)', 
          maxWidth: 'clamp(300px, 80%, 600px)', 
          margin: '1rem auto',
          fontSize: 'clamp(0.9rem, 4vw, 1.1rem)'
        }}>
          A collection of some of my most notable work, ranging from complex enterprise systems to innovative creative experiments.
        </p>
      </div>

      <div className="grid-responsive">
        {displayedProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
            className="glass-panel"
            style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
              <img 
                src={project.image} 
                alt={project.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              />
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                <a href={project.github} className="glass-panel" style={{ padding: '0.6rem', borderRadius: '12px' }}>
                  <Github size={18} />
                </a>
                <a href={project.link} className="glass-panel" style={{ padding: '0.6rem', borderRadius: '12px' }}>
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
            
            <div style={{ padding: 'clamp(1.2rem, 4vw, 2rem)', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '0.8rem', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>{project.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: '1.6' }}>
                {project.description}
              </p>
              
              <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {project.tech.map(t => (
                  <span key={t} style={{ 
                    padding: '0.3rem 0.8rem', 
                    background: 'rgba(255,255,255,0.05)', 
                    borderRadius: '6px', 
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)'
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {limit && (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link 
            to="/projects" 
            className="glass-panel" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.8rem', 
              padding: '1rem 2.5rem', 
              borderRadius: '99px',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            View All Projects <ArrowRight size={20} />
          </Link>
        </div>
      )}
    </section>
  );
};

export default Projects;
