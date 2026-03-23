import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send, MapPin, ArrowUpRight, Activity, Shield, Wifi } from 'lucide-react';

const Contact = () => {
  const [sigStr, setSigStr] = useState(98.2);

  useEffect(() => {
    const interval = setInterval(() => {
      setSigStr(prev => Math.min(100, Math.max(95, prev + (Math.random() - 0.5))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { icon: <Github size={20} />, link: 'https://github.com', label: 'GITHUB' },
    { icon: <Linkedin size={20} />, link: 'https://linkedin.com', label: 'LINKEDIN' },
    { icon: <Twitter size={20} />, link: 'https://twitter.com', label: 'TWITTER' },
  ];

  return (
    <section id="contact" className="section container" style={{ position: 'relative' }}>
      <div style={{ marginBottom: '5rem', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <Wifi size={16} style={{ color: '#00f5ff' }} />
          <span className="mono" style={{ color: '#00f5ff', fontWeight: 800, letterSpacing: '0.3em', fontSize: '0.7rem' }}>
            ESTABLISH_COMM_LINK
          </span>
        </div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em' }}>
          Initiate <span className="text-glow" style={{ color: '#00f5ff' }}>Contact.</span>
        </h2>
      </div>

      <div className="grid-responsive" style={{ alignItems: 'start', gap: 'clamp(3rem, 5vw, 5rem)' }}>
        
        {/* Connection Intel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hologram-card technical-border" style={{ padding: '2.5rem', marginBottom: '3rem' }}>
            <div className="scanner-line" />
            <h3 className="mono" style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 900, color: '#fff' }}>PORTAL_ACCESS</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Currently available for high-priority architectural consulting and unique project deployments. 
              Sub-24h response latency guaranteed.
            </p>
            
            <a href="mailto:hello@example.com" className="mono" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              fontSize: '1rem',
              color: '#00f5ff',
              fontWeight: 800,
              textDecoration: 'none',
              filter: 'drop-shadow(0 0 5px rgba(0, 245, 255, 0.4))'
            }}>
              SEND_PACKET@SYSTEM.IO <ArrowUpRight size={18} />
            </a>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {socialLinks.map((social) => (
              <a key={social.label} href={social.link} target="_blank" rel="noreferrer" className="hologram-card" style={{ 
                padding: '0.8rem',
                border: '1px solid rgba(0, 245, 255, 0.2)',
                color: '#00f5ff',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Transmission Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="hologram-card technical-border"
          style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="scanner-line" />
          
          {/* Form HUD */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span className="mono" style={{ fontSize: '0.55rem', color: '#00f5ff', opacity: 0.6 }}>SIG_STR</span>
                <span className="mono" style={{ fontSize: '0.7rem', color: '#00f5ff' }}>{sigStr.toFixed(1)}%</span>
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'right' }}>
                <span className="mono" style={{ fontSize: '0.55rem', color: '#00f5ff', opacity: 0.6 }}>ENCRYPTION</span>
                <span className="mono" style={{ fontSize: '0.7rem', color: '#00f5ff' }}>AES_256_ACTIVE</span>
             </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <label className="mono" style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#00f5ff' }}>SENDER_IDENTITY</label>
            <input type="text" placeholder="USER_NAME" style={{ 
              padding: '1rem', 
              background: 'rgba(0, 245, 255, 0.02)', 
              border: '1px solid rgba(0, 245, 255, 0.1)', 
              color: '#fff', 
              fontSize: '1rem',
              outline: 'none',
              fontFamily: 'monospace'
            }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <label className="mono" style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#00f5ff' }}>COORDINATE_EMAIL</label>
            <input type="email" placeholder="IDENTITY@HOST.EXT" style={{ 
              padding: '1rem', 
              background: 'rgba(0, 245, 255, 0.02)', 
              border: '1px solid rgba(0, 245, 255, 0.1)', 
              color: '#fff', 
              fontSize: '1rem',
              outline: 'none',
              fontFamily: 'monospace'
            }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <label className="mono" style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#00f5ff' }}>DATA_PAYLOAD</label>
            <textarea placeholder="Describe mission objectives..." rows={4} style={{ 
              padding: '1rem', 
              background: 'rgba(0, 245, 255, 0.02)', 
              border: '1px solid rgba(0, 245, 255, 0.1)', 
              color: '#fff', 
              fontSize: '1rem',
              outline: 'none',
              fontFamily: 'monospace',
              resize: 'none'
            }} />
          </div>

          <button type="submit" className="hologram-card" style={{ 
            padding: '1.2rem', 
            background: 'rgba(0, 245, 255, 0.1)', 
            border: '1px solid rgba(0, 245, 255, 0.4)',
            color: '#00f5ff', 
            fontWeight: 800,
            fontSize: '0.8rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            boxShadow: '0 0 20px rgba(0, 245, 255, 0.1)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}
          onMouseEnter={(e) => {
             e.currentTarget.style.background = 'rgba(0, 245, 255, 0.2)';
             e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 245, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
             e.currentTarget.style.background = 'rgba(0, 245, 255, 0.1)';
             e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.1)';
          }}>
            <Send size={18} /> ESTABLISH_LINK
          </button>
        </motion.form>
      </div>
      <style>{`
        .grid-responsive {
           display: grid;
           grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        }
      `}</style>
    </section>
  );
};

export default Contact;

