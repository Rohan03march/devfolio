import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu, Zap, Activity } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Home', href: '/', isExternal: false },
  { name: 'About', href: '/#about', isExternal: false },
  { name: 'Services', href: '/#services', isExternal: false },
  { name: 'Projects', href: '/projects', isExternal: false },
  { name: 'Freelance', href: '/freelance', isExternal: false },
  { name: 'Experience', href: '/#experience', isExternal: false },
  { name: 'Contact', href: '/#contact', isExternal: false },
];

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTinyMobile, setIsTinyMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsTinyMobile(window.innerWidth < 360);
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const NavLink = ({ item, mobile = false }) => {
    const isHash = item.href.includes('#');
    const isActive = location.pathname === (isHash ? '/' : item.href) && (!isHash || location.hash === item.href.split('#')[1]);

    const handleClick = (e) => {
      if (isHash && location.pathname === '/') {
        e.preventDefault();
        const id = item.href.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      if (mobile) setMobileMenuOpen(false);
    };

    const LinkComponent = isHash && location.pathname === '/' ? 'a' : Link;
    const linkProps = isHash && location.pathname === '/' ? { href: item.href } : { to: item.href };

    return (
      <LinkComponent
        {...linkProps}
        onClick={handleClick}
        style={{
          fontSize: mobile ? '1.25rem' : '0.75rem',
          fontWeight: 600,
          color: isActive ? '#00f5ff' : 'var(--text-secondary)',
          textDecoration: 'none',
          padding: mobile ? '1rem 0' : '0.5rem 0.8rem',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          position: 'relative',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}
        className="nav-item-link"
      >
        {item.name}
        {isActive && !mobile && (
          <motion.div
            layoutId="nav-active"
            style={{
              position: 'absolute',
              bottom: 0,
              left: '0.8rem',
              right: '0.8rem',
              height: '1px',
              background: '#00f5ff',
              boxShadow: '0 0 10px #00f5ff'
            }}
          />
        )}
      </LinkComponent>
    );
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: isTinyMobile ? '1rem' : '2rem',
          left: 0,
          width: '100%',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 1.5rem',
          pointerEvents: 'none',
          boxSizing: 'border-box'
        }}
      >
        <div
          className="hologram-card"
          style={{
            width: '100%',
            maxWidth: '1100px',
            background: 'rgba(8, 8, 12, 0.4)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(0, 245, 255, 0.1)',
            borderRadius: '4px',
            padding: isTinyMobile ? '0.5rem 1rem' : '0.6rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 0 40px rgba(0, 245, 255, 0.05)',
            pointerEvents: 'auto',
            position: 'relative'
          }}
        >
          {/* Top Edge Corner Decoration */}
          <div style={{ position: 'absolute', top: -1, left: -1, width: '15px', height: '15px', borderTop: '2px solid #00f5ff', borderLeft: '2px solid #00f5ff' }} />
          <div style={{ position: 'absolute', bottom: -1, right: -1, width: '15px', height: '15px', borderBottom: '2px solid #00f5ff', borderRight: '2px solid #00f5ff' }} />

          <Link to="/" style={{
            fontSize: isTinyMobile ? '1rem' : '1.2rem',
            fontWeight: 800,
            color: '#fff',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.05em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Cpu size={18} className="text-cyan-400 group-hover:rotate-90 transition-transform" style={{ color: '#00f5ff' }} />
            ROHAN<span style={{ color: '#00f5ff' }}>.</span>SYSTEM
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="desktop-only">
            {navItems.filter(item => item.name !== 'Freelance').map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
            <Link to="/freelance" style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '2px',
              background: 'rgba(0, 245, 255, 0.1)',
              border: '1px solid rgba(0, 245, 255, 0.3)',
              color: '#00f5ff',
              fontWeight: 700,
              fontSize: '0.75rem',
              textDecoration: 'none',
              marginLeft: '1rem',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 0 15px rgba(0, 245, 255, 0.1)'
            }}
              className="hover:bg-cyan-500/20 hover:border-cyan-400"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 245, 255, 0.2)';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 245, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 245, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.1)';
              }}>
              <Zap size={14} /> Freelance
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'rgba(0, 245, 255, 0.05)',
              border: '1px solid rgba(0, 245, 255, 0.1)',
              color: '#00f5ff',
              cursor: 'pointer',
              padding: '0.6rem',
              borderRadius: '4px',
              transition: 'all 0.3s ease'
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(2, 2, 4, 0.95)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >

            <div className="hologram-card" style={{
              width: '100%',
              maxWidth: '400px',
              padding: '2rem 1.5rem', /* Reduced padding */
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem', /* Reduced gap */
              textAlign: 'center',
              border: '1px solid rgba(0, 245, 255, 0.2)'
            }}>
              {navItems.map((item) => (
                <NavLink key={item.name} item={item} mobile />
              ))}
              <Link
                to="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  marginTop: '1.5rem', /* Reduced margin */
                  padding: '1rem', /* Reduced padding */
                  borderRadius: '4px',
                  background: '#00f5ff',
                  color: '#000',
                  fontWeight: 800,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                <Activity size={18} style={{ display: 'inline', marginRight: '0.5rem' }} /> Initi_Collaborate
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        .nav-item-link:hover {
          color: #00f5ff !important;
        }
      `}</style>
    </>
  );
};

export default Navigation;

