import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Projects from '../components/Projects';

const ProjectsPage = () => {
  return (
    <main style={{ padding: 'clamp(4rem, 10vw, 8rem) 0', background: 'rgba(2,2,4,0.3)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '4rem' }}
        >
          <Link
            to="/"
            className="hologram-card technical-border"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem 2rem',
              color: '#00f5ff',
              fontWeight: 800,
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontSize: '0.75rem',
              background: 'rgba(0, 245, 255, 0.05)',
              boxShadow: '0 0 20px rgba(0, 245, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div className="scanner-line" />
            <ArrowLeft size={16} /> RETURN_TO_BASE_HQ
          </Link>
        </motion.div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-2rem', right: '5%', opacity: 0.1 }}>
          <Terminal size={120} style={{ color: '#00f5ff' }} />
        </div>
        <Projects />
      </div>

      {/* Decorative Corner */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', opacity: 0.3, pointerEvents: 'none' }}>
        <Shield size={40} style={{ color: '#00f5ff' }} />
        <div className="mono" style={{ fontSize: '0.5rem', color: '#00f5ff', marginTop: '0.5rem' }}>SEC_LAYER_v4</div>
      </div>
    </main>
  );
};

export default ProjectsPage;

