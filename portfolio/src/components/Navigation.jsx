import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Home', href: '/', isExternal: false },
  { name: 'About', href: '/#about', isExternal: false },
  { name: 'Services', href: '/#services', isExternal: false },
  { name: 'Projects', href: '/projects', isExternal: true },
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
      setIsMobile(window.innerWidth <= 1000);
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
          fontSize: mobile ? '1.25rem' : '0.85rem',
          fontWeight: 600,
          color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
          textDecoration: 'none',
          padding: mobile ? '1rem 0' : '0.5rem 1rem',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          position: 'relative'
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
              left: '1rem',
              right: '1rem',
              height: '2px',
              background: 'var(--accent-color)',
              borderRadius: '2px'
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
          top: isTinyMobile ? '2.5rem' : (isMobile ? '4.5rem' : '4rem'),
          left: 0,
          width: '100%',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          padding: isTinyMobile ? '0 0.8rem' : '0 1.2rem',
          pointerEvents: 'none',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            width: isTinyMobile ? '100%' : '92%',
            maxWidth: '1000px',
            margin: '0 auto',
            background: 'rgba(8, 8, 8, 0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '999px',
            padding: isTinyMobile ? '0.5rem 1rem' : '0.6rem 1.2rem 0.6rem 1.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: isTinyMobile ? '0.5rem' : 'clamp(1rem, 4vw, 3rem)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'auto'
          }}
        >
          <Link to="/" style={{
            fontSize: isTinyMobile ? '1rem' : '1.3rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            textDecoration: 'none',
            whiteSpace: 'nowrap'
          }}>
            Rohan<span style={{ color: 'var(--accent-color)' }}>.</span>P
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }} className="desktop-only">
            {navItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
            <Link to="/#contact" style={{
              padding: '0.7rem 1.8rem',
              borderRadius: '999px',
              background: 'var(--text-primary)',
              color: 'var(--bg-primary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              textDecoration: 'none',
              marginLeft: '0.8rem',
              transition: 'all 0.4s ease'
            }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              Hire Me
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '0.7rem',
              borderRadius: '12px',
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
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(25px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(3, 3, 3, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
                width: '100%',
                maxWidth: '300px',
                textAlign: 'center'
              }}
            >
              {navItems.map((item) => (
                <NavLink key={item.name} item={item} mobile />
              ))}
              <Link
                to="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  marginTop: '2rem',
                  padding: '1.1rem',
                  borderRadius: '16px',
                  background: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                  boxShadow: '0 10px 40px rgba(255,255,255,0.1)'
                }}
              >
                Let's Collaborate
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-only { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        .nav-item-link {
          border-radius: 12px;
        }
        .nav-item-link:hover {
          background: rgba(255,255,255,0.03);
          color: var(--text-primary) !important;
        }
      `}</style>
    </>
  );
};

export default Navigation;
