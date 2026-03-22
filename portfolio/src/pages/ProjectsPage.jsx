import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Projects from '../components/Projects';

const ProjectsPage = () => {
  return (
    <main style={{ padding: 'clamp(3rem, 10vw, 6rem) 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '3rem' }}
        >
          <Link 
            to="/" 
            className="glass-panel"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.8rem', 
              padding: '0.8rem 1.5rem', 
              borderRadius: '99px',
              fontWeight: 600,
              textDecoration: 'none',
              color: 'var(--text-primary)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.transform = 'translateX(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <ArrowLeft size={20} /> Back to Home
          </Link>
        </motion.div>
      </div>

      <Projects />
    </main>
  );
};

export default ProjectsPage;
