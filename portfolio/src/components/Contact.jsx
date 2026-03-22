import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send, MapPin, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  const socialLinks = [
    { icon: <Github size={24} />, link: 'https://github.com', label: 'GitHub' },
    { icon: <Linkedin size={24} />, link: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Twitter size={24} />, link: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <section id="contact" className="section container" style={{ position: 'relative' }}>
      <div style={{ marginBottom: 'clamp(3rem, 10vw, 6rem)' }} className="text-center-mobile">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ color: 'var(--accent-color)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem' }}
        >
          Initiate
        </motion.span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginTop: '0.5rem' }}>
          Let's Start a <span className="text-gradient">Conversation.</span>
        </h2>
      </div>

      <div className="grid-responsive" style={{ alignItems: 'start', gap: 'clamp(3rem, 8vw, 5rem)' }}>
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Collaboration Portal</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                Currently available for selected freelance projects and architectural consulting. 
                Expect a response within 24 hours.
              </p>
            </div>

            <a href="mailto:hello@example.com" className="hover-link" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.5rem', 
              fontSize: '1.4rem',
              color: 'var(--text-primary)',
              fontWeight: 500
            }}>
              hello@example.com <ArrowUpRight size={20} />
            </a>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {socialLinks.map((social) => (
                <a key={social.label} href={social.link} target="_blank" rel="noreferrer" style={{ 
                  color: 'var(--text-secondary)',
                  transition: 'color 0.3s ease'
                }} className="social-hover">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel"
          style={{ padding: 'clamp(2rem, 6vw, 4rem)', display: 'flex', flexDirection: 'column', gap: '2rem' }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>Full Name</label>
            <input type="text" placeholder="Elon Musk" style={{ 
              padding: '1.2rem 0', 
              background: 'transparent', 
              border: 'none', 
              borderBottom: '1px solid rgba(255,255,255,0.1)', 
              color: '#fff', 
              fontSize: '1.1rem',
              outline: 'none'
            }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>Email Address</label>
            <input type="email" placeholder="elon@spacex.com" style={{ 
              padding: '1.2rem 0', 
              background: 'transparent', 
              border: 'none', 
              borderBottom: '1px solid rgba(255,255,255,0.1)', 
              color: '#fff', 
              fontSize: '1.1rem',
              outline: 'none'
            }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>Message</label>
            <textarea placeholder="Describe your vision..." rows={4} style={{ 
              padding: '1.2rem 0', 
              background: 'transparent', 
              border: 'none', 
              borderBottom: '1px solid rgba(255,255,255,0.1)', 
              color: '#fff', 
              fontSize: '1.1rem',
              outline: 'none',
              resize: 'none'
            }} />
          </div>

          <button type="submit" style={{ 
            padding: '1.2rem 3rem', 
            background: '#fff', 
            color: '#000', 
            borderRadius: '99px', 
            fontWeight: 700,
            fontSize: '1rem',
            alignSelf: 'flex-start',
            marginTop: '1.5rem',
            cursor: 'pointer'
          }}>
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
