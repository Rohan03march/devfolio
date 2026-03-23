import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { 
  ArrowRight, Activity, Cpu, Terminal, 
  Code2, Database, Globe, Layers, 
  ShieldCheck, Zap, Sparkles 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Typewriter = ({ text, delay = 0, speed = 40, className, style }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let timeout;
    if (displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed + (displayedText.length === 0 ? delay : 0));
    } else {
      setComplete(true);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, text, speed, delay]);

  return (
    <span className={className} style={{ ...style, position: 'relative' }}>
      {displayedText}
      {!complete && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ 
            display: 'inline-block', 
            width: '2px', 
            height: '1em', 
            background: '#00f5ff', 
            marginLeft: '2px',
            verticalAlign: 'middle'
          }}
        />
      )}
    </span>
  );
};

const BitStream = () => {
  const [bits, setBits] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      const char = Math.random() > 0.5 ? '1' : '0';
      setBits(prev => (char + prev).slice(0, 20));
    }, 150);
    return () => clearInterval(interval);
  }, []);
  return <span style={{ fontFamily: 'monospace', opacity: 0.6 }}>{bits}</span>;
};

const Satellite = ({ icon: Icon, delay, radius, speed }) => (
  <motion.div
    style={{
      position: 'absolute',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'rgba(255, 255, 255, 0.5)',
      boxShadow: '0 0 15px rgba(0, 245, 255, 0.1)',
      zIndex: 1,
      pointerEvents: 'none'
    }}
    animate={{
      x: [
        Math.cos(0) * radius,
        Math.cos(Math.PI / 2) * radius,
        Math.cos(Math.PI) * radius,
        Math.cos(3 * Math.PI / 2) * radius,
        Math.cos(2 * Math.PI) * radius
      ],
      y: [
        Math.sin(0) * radius,
        Math.sin(Math.PI / 2) * radius,
        Math.sin(Math.PI) * radius,
        Math.sin(3 * Math.PI / 2) * radius,
        Math.sin(2 * Math.PI) * radius
      ],
      rotate: [0, 360],
      opacity: [0.2, 0.5, 0.2]
    }}
    transition={{
      duration: speed,
      repeat: Infinity,
      delay,
      ease: "linear"
    }}
  >
    <Icon size={18} />
  </motion.div>
);

const DataDust = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX + (mouse.current.x - canvas.width / 2) * 0.001;
        this.y += this.speedY + (mouse.current.y - canvas.height / 2) * 0.001;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw() {
        ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    init();
    animate();
    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity: 0.4 }} />;
};

const TechOrbits = () => (
  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 1, opacity: 0.15 }}>
    <motion.svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.circle 
        cx="300" cy="300" r="280" stroke="#00f5ff" strokeWidth="0.5" strokeDasharray="10 20"
        animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle 
        cx="300" cy="300" r="200" stroke="#00f5ff" strokeWidth="1" strokeDasharray="100 50"
        animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.path 
        d="M300 100 A200 200 0 0 1 500 300" stroke="#00f5ff" strokeWidth="2" strokeLinecap="round"
        animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.svg>
  </div>
);

const HeroSkeleton = () => (
  <section className="technical-grid" style={{
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#030303',
    padding: '0 1.5rem',
    overflow: 'hidden'
  }}>
    <div className="skeleton" style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', opacity: 0.1 }} />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '2.5rem', width: '100%', maxWidth: '800px', zIndex: 2 }}>
      <div className="skeleton" style={{ width: '220px', height: '32px', borderRadius: '4px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', alignItems: 'center' }}>
        <div className="skeleton" style={{ width: '95%', height: 'clamp(50px, 8vw, 80px)', borderRadius: '4px' }} />
        <div className="skeleton" style={{ width: '75%', height: 'clamp(50px, 8vw, 80px)', borderRadius: '4px' }} />
      </div>
      <div className="skeleton" style={{ width: '85%', height: '60px', borderRadius: '4px' }} />
    </div>
  </section>
);

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.98]);

  // Smoother parallax
  const x = useSpring(useTransform(useScroll().scrollY, [0, 500], [0, 0]), { stiffness: 100, damping: 30 }); // Placeholder for mouse parallax

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) return <HeroSkeleton />;

  return (
    <section id="home" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      overflow: 'hidden',
      background: '#010101',
      padding: 'clamp(9rem, 20vh, 12rem) clamp(1.5rem, 5vw, 4rem) 4rem'
    }}>
      {/* 1. Deep Background Layer (Slowest) */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          inset: '-10%', 
          zIndex: 0,
          x: mousePos.x * 0.2,
          y: mousePos.y * 0.2,
          opacity: 0.5
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(0, 245, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }} />
        <DataDust />
      </motion.div>

      {/* 2. Mid Ground Layer (Tech Orbits) */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          zIndex: 1,
          x: mousePos.x * 0.5,
          y: mousePos.y * 0.5,
        }}
      >
        <TechOrbits />
      </motion.div>

      {/* 3. Global Scanner Line */}
      <motion.div 
        animate={{ y: ['-100%', '200%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ 
          position: 'absolute', 
          left: 0, 
          right: 0, 
          height: '2px', 
          background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)',
          opacity: 0.1,
          boxShadow: '0 0 15px #00f5ff',
          zIndex: 4,
          pointerEvents: 'none'
        }}
      />

      {/* Floating Satellites (Hidden on small mobile for clarity) */}
      <div className="desktop-only" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <Satellite icon={Code2} delay={0} radius={350} speed={40} />
        <Satellite icon={Cpu} delay={10} radius={400} speed={45} />
        <Satellite icon={Terminal} delay={20} radius={380} speed={35} />
      </div>

      {/* 4. HUD Glass Markers (Fastest) */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          inset: 'clamp(1rem, 4vw, 3rem)', 
          pointerEvents: 'none', 
          zIndex: 5,
          x: mousePos.x * -0.8,
          y: mousePos.y * -0.8,
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '60px', height: '60px', borderTop: '2px solid #00f5ff', borderLeft: '2px solid #00f5ff', opacity: 0.4 }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '60px', height: '60px', borderBottom: '2px solid #00f5ff', borderRight: '2px solid #00f5ff', opacity: 0.4 }} />
        
        <div className="mono" style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '0.6rem', color: '#00f5ff' }}>
          <span style={{ opacity: 0.6 }}>CORD_X: {mousePos.x.toFixed(2)}</span>
          <span style={{ opacity: 0.6 }}>CORD_Y: {mousePos.y.toFixed(2)}</span>
          <BitStream />
        </div>

        <div className="mono" style={{ position: 'absolute', bottom: '1rem', left: '1rem', fontSize: '0.5rem', color: '#00f5ff', opacity: 0.3 }}>
           SYSTEM_INTEGRITY: 100% // NO_THREATS_DETECTED
        </div>
      </motion.div>

      <motion.div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          opacity,
          scale,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <motion.div
          initial={{ opacity: 0, filter: 'blur(20px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1 }}
          style={{ 
            maxWidth: '1080px',
            padding: 'clamp(2.5rem, 5vw, 5rem) clamp(1.5rem, 6vw, 4rem)',
            borderRadius: '12px',
            background: 'rgba(8, 8, 12, 0.4)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(0, 245, 255, 0.1)',
            boxShadow: '0 0 100px rgba(0, 245, 255, 0.05)',
            position: 'relative',
            width: '100%'
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.8rem',
              padding: '0.6rem 1.4rem',
              background: 'rgba(0, 245, 255, 0.05)',
              border: '1px solid rgba(0, 245, 255, 0.2)',
              color: '#00f5ff',
              fontSize: 'clamp(0.65rem, 2vw, 0.8rem)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              marginBottom: '3rem',
              fontFamily: 'monospace',
              boxShadow: '0 0 20px rgba(0, 245, 255, 0.1)',
              position: 'relative'
            }}
          >
            <div style={{ position: 'absolute', top: '-1.5rem', left: 0, fontSize: '0.5rem', color: '#00f5ff', opacity: 0.5 }} className="mono">
               AI_ASSISTANT: JARVIS_v4.2.1
            </div>
            <Activity size={14} className="animate-pulse" /> PROTOCOL_INITIATED
          </motion.div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 10vw, 7.5rem)',
            lineHeight: 0.9,
            marginBottom: '2rem',
            fontWeight: 900,
            letterSpacing: '-0.05em',
            color: '#fff'
          }}>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
               Engineering <br />
               <span className="text-glow" style={{ color: '#00f5ff' }}>Authentic</span> Future
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            style={{
              fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)',
              color: '#a1a1aa',
              marginBottom: '3.5rem',
              maxWidth: '650px',
              marginInline: 'auto',
              lineHeight: 1.6,
              fontWeight: 400
            }}
          >
            Architecting high-stakes digital environments where performance meets precision. 
            Translating complex requirements into elegant, scalable solutions.
          </motion.p>

          <div style={{ marginBottom: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
             <motion.div 
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mono" 
                style={{ fontSize: '0.6rem', color: '#00f5ff' }}
             >
                SCANNING_ENVIRONMENT... [OK]
             </motion.div>
             <div style={{ width: '40px', height: '1px', background: 'rgba(0, 245, 255, 0.2)' }} />
             <div className="mono" style={{ fontSize: '0.6rem', color: '#00f5ff', opacity: 0.4 }}>
                THREAT_LEVEL: ZERO
             </div>
          </div>

          <div className="hero-btn-container" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', width: '100%', maxWidth: '550px', marginInline: 'auto' }}>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ flex: 1, minWidth: '240px' }}>
              <Link to="/projects" style={{
                padding: '1rem 2rem',
                background: '#00f5ff',
                color: '#000',
                borderRadius: '4px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem',
                fontSize: '0.9rem',
                textDecoration: 'none',
                textTransform: 'uppercase',
                boxShadow: '0 0 30px rgba(0, 245, 255, 0.3)',
                width: '100%',
                height: '60px'
              }}>
                Access Work <Cpu size={20} />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ flex: 1, minWidth: '240px' }}>
              <a href="#contact" style={{
                padding: '1rem 2rem',
                border: '1px solid rgba(0, 245, 255, 0.3)',
                background: 'rgba(0, 245, 255, 0.05)',
                color: '#00f5ff',
                borderRadius: '4px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem',
                fontSize: '0.9rem',
                textDecoration: 'none',
                textTransform: 'uppercase',
                width: '100%',
                height: '60px'
              }}>
                Secure Connection <ShieldCheck size={20} />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .desktop-only { @media (max-width: 1024px) { display: none !important; } }
        @media (max-width: 640px) {
          .hero-btn-container { flex-direction: column !important; }
        }
        .text-gradient { background: linear-gradient(135deg, #fff 30%, #00f5ff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      `}</style>
    </section>
  );
};

export default Hero;
