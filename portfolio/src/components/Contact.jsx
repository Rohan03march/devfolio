import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send, MapPin, ArrowUpRight, Activity, Shield, Wifi, Globe, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import resumeFile from "../assets/Rohan's Resume.pdf";

const Contact = () => {
  const formRef = useRef();
  const [sigStr, setSigStr] = useState(98.2);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSigStr(prev => Math.min(100, Math.max(95, prev + (Math.random() - 0.5))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Use environment variables for EmailJS IDs
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        setStatus('success');
        setFormData({ user_name: '', user_email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      }, (error) => {
        console.log(error.text);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  const socialLinks = [
    { icon: <Github size={20} />, link: 'https://github.com/Rohan03march', label: 'GITHUB' },
    { icon: <Linkedin size={20} />, link: 'https://www.linkedin.com/in/rohan-p-200r2002', label: 'LINKEDIN' },
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

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
              <a href="mailto:rohanp.dev@gmail.com" className="mono" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                fontSize: '0.9rem',
                color: '#00f5ff',
                fontWeight: 800,
                textDecoration: 'none',
                filter: 'drop-shadow(0 0 5px rgba(0, 245, 255, 0.4))',
                padding: '0.8rem 1.2rem',
                background: 'rgba(0, 245, 255, 0.05)',
                border: '1px solid rgba(0, 245, 255, 0.1)',
                borderRadius: '4px'
              }}>
                <Mail size={16} /> rohanp.dev@gmail.com
              </a>

              <a 
                href={resumeFile} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mono" 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  fontSize: '0.9rem',
                  color: '#fff',
                  fontWeight: 800,
                  textDecoration: 'none',
                  padding: '0.8rem 1.2rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 245, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.5)';
                  e.currentTarget.style.color = '#00f5ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#fff';
                }}
              >
                <FileText size={16} /> VIEW_RESUME <ArrowUpRight size={14} />
              </a>
            </div>
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
          ref={formRef}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="hologram-card technical-border"
          style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}
          onSubmit={handleSubmit}
        >
          {/* EmailJS Hidden Fields */}
          <input type="hidden" name="subject" value={`NEW_MISSION_BRIEFING // FROM: ${formData.user_name.toUpperCase() || 'ANONYMOUS'}`} />
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
            <input 
              type="text" 
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="USER_NAME" 
              required
              style={{
                padding: '1rem',
                background: 'rgba(0, 245, 255, 0.02)',
                border: '1px solid rgba(0, 245, 255, 0.1)',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                fontFamily: 'monospace'
              }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <label className="mono" style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#00f5ff' }}>COORDINATE_EMAIL</label>
            <input 
              type="email" 
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              placeholder="IDENTITY@HOST.EXT" 
              required
              style={{
                padding: '1rem',
                background: 'rgba(0, 245, 255, 0.02)',
                border: '1px solid rgba(0, 245, 255, 0.1)',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                fontFamily: 'monospace'
              }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <label className="mono" style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#00f5ff' }}>DATA_PAYLOAD</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe mission objectives..." 
              rows={4} 
              required
              style={{
                padding: '1rem',
                background: 'rgba(0, 245, 255, 0.02)',
                border: '1px solid rgba(0, 245, 255, 0.1)',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                fontFamily: 'monospace',
                resize: 'none'
              }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={status === 'sending'}
            className="hologram-card" 
            style={{
              padding: '1.2rem',
              background: status === 'sending' ? 'rgba(0, 245, 255, 0.05)' : 'rgba(0, 245, 255, 0.1)',
              border: '1px solid rgba(0, 245, 255, 0.4)',
              color: '#00f5ff',
              fontWeight: 800,
              fontSize: '0.8rem',
              cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              boxShadow: '0 0 20px rgba(0, 245, 255, 0.1)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              opacity: status === 'sending' ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (status !== 'sending') {
                e.currentTarget.style.background = 'rgba(0, 245, 255, 0.2)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 245, 255, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (status !== 'sending') {
                e.currentTarget.style.background = 'rgba(0, 245, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.1)';
              }
            }}
          >
            {status === 'sending' ? (
              <>
                <Loader2 size={18} className="animate-spin" /> DISPATCHING...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle2 size={18} /> LINK_ESTABLISHED
              </>
            ) : status === 'error' ? (
              <>
                <AlertCircle size={18} /> UPLOAD_FAILED
              </>
            ) : (
              <>
                <Send size={18} /> ESTABLISH_LINK
              </>
            )}
          </button>

          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '3rem',
                  right: '3rem',
                  padding: '1rem',
                  background: 'rgba(0, 255, 136, 0.1)',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  color: '#00ff88',
                  fontSize: '0.7rem',
                  textAlign: 'center',
                  borderRadius: '2px'
                }}
                className="mono"
              >
                [MESSAGE_ENCRYPTED_AND_DISPATCHED] // RESPONSE_EXPECTED_SOON.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '3rem',
                  right: '3rem',
                  padding: '1rem',
                  background: 'rgba(255, 0, 85, 0.1)',
                  border: '1px solid rgba(255, 0, 85, 0.3)',
                  color: '#ff0055',
                  fontSize: '0.7rem',
                  textAlign: 'center',
                  borderRadius: '2px'
                }}
                className="mono"
              >
                [COMM_FAILURE] // CHECK_CREDENTIALS_AND_RETRY.
              </motion.div>
            )}
          </AnimatePresence>
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

