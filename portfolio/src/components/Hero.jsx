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

const DiagnosticSatellite = ({ label, value, delay, radius, speed, angleOffset = 0 }) => (
  <motion.div
    style={{
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '4px',
      zIndex: 1,
      pointerEvents: 'none'
    }}
    animate={{
      x: [
        Math.cos(angleOffset) * radius,
        Math.cos(angleOffset + Math.PI / 2) * radius,
        Math.cos(angleOffset + Math.PI) * radius,
        Math.cos(angleOffset + 3 * Math.PI / 2) * radius,
        Math.cos(angleOffset + 2 * Math.PI) * radius
      ],
      y: [
        Math.sin(angleOffset) * radius,
        Math.sin(angleOffset + Math.PI / 2) * radius,
        Math.sin(angleOffset + Math.PI) * radius,
        Math.sin(angleOffset + 3 * Math.PI / 2) * radius,
        Math.sin(angleOffset + 2 * Math.PI) * radius
      ],
      opacity: [0.3, 0.6, 0.3]
    }}
    transition={{
      duration: speed,
      repeat: Infinity,
      delay,
      ease: "linear"
    }}
  >
    <div className="mono" style={{ fontSize: '0.5rem', color: '#00f5ff', opacity: 0.6, letterSpacing: '0.1em' }}>{label}</div>
    <div className="mono" style={{ fontSize: '0.7rem', color: '#fff', fontWeight: 600 }}>{value}</div>
    <div style={{ width: '40px', height: '1px', background: 'rgba(0, 245, 255, 0.3)' }} />
  </motion.div>
);
const QuantumCore = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      <div style={{ position: 'relative', width: '600px', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Deep Atmosphere Glow */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(0, 245, 255, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />

        {/* Central Singularity */}
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95], rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            border: '2px solid rgba(0, 245, 255, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(0, 245, 255, 0.1)'
          }}
        >
          <div style={{ width: '40px', height: '40px', background: '#00f5ff', borderRadius: '50%', boxShadow: '0 0 30px #00f5ff', opacity: 0.8 }} />
        </motion.div>

        {/* Geometric Orbitals */}
        <motion.svg width="800" height="800" viewBox="0 0 800 800" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="orb-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#00f5ff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="400" cy="400" r="350" stroke="url(#orb-grad)" strokeWidth="0.5" fill="none"
            animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="400" cy="400" r="280" stroke="rgba(0, 245, 255, 0.1)" strokeWidth="1" strokeDasharray="10 20" fill="none"
            animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="400" cy="400" r="180" stroke="rgba(0, 245, 255, 0.3)" strokeWidth="0.5" fill="none"
          />
        </motion.svg>

        {/* Pulsing Sync Dots */}
        {[0, 120, 240].map((angle, i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: i * 2 }}
            style={{ position: 'absolute', width: '360px', height: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{
              width: '6px',
              height: '6px',
              background: '#00f5ff',
              borderRadius: '50%',
              boxShadow: '0 0 10px #00f5ff',
              transform: 'translateY(-180px)'
            }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

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

const ArcReactorLoader = () => {
  const [percent, setPercent] = useState(0);
  const [logs, setLogs] = useState([]);

  const bootLogs = useMemo(() => [
    "INITIALIZING_CORE_REACTIVE_UNIT...",
    "CHECKING_INTEGRITY_SHIELD...",
    "POWER_LEVEL_OPTIMIZED: 100%",
    "BYPASSING_SECURITY_PROTOCOLS...",
    "JARVIS_ONLINE_V4.2.1",
    "WELCOME_HOME_ROHAN"
  ], []);

  useEffect(() => {
    const duration = 3000;
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, duration / 100);

    const logInterval = setInterval(() => {
      setLogs(prev => {
        if (prev.length >= bootLogs.length) return prev;
        return [...prev, bootLogs[prev.length]];
      });
    }, duration / bootLogs.length);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, [bootLogs]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#010101',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      overflow: 'hidden'
    }}>
      {/* Background Cinematic Atmosphere */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 50, 60, 0.4) 0%, transparent 70%)',
        opacity: 0.5,
      }} />

      <div style={{ position: 'relative', width: 'clamp(280px, 50vw, 450px)', height: 'clamp(280px, 50vw, 450px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Deep Atmosphere Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            width: '120%',
            height: '120%',
            background: 'radial-gradient(circle, rgba(0, 245, 255, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
          }}
        />

        <motion.svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 30px rgba(0, 245, 255, 0.6))' }}>
          {/* Level 3: Outer Rotating Frame */}
          <motion.g animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
            {[...Array(10)].map((_, i) => (
              <motion.path
                key={i}
                d="M100 5 A95 95 0 0 1 130 10 L128 25 A80 80 0 0 0 100 22 Z"
                fill="rgba(0, 245, 255, 0.15)"
                stroke="#00f5ff"
                strokeWidth="0.5"
                transform={`rotate(${i * 36}, 100, 100)`}
              />
            ))}
          </motion.g>

          {/* Level 2: Middle Power Fins */}
          <motion.g animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>
            {[...Array(6)].map((_, i) => (
              <g key={i} transform={`rotate(${i * 60}, 100, 100)`}>
                <rect x="96" y="30" width="8" height="25" fill="#00f5ff" opacity="0.4" rx="1" />
                <rect x="98" y="32" width="4" height="21" fill="#fff" opacity="0.6" rx="1" />
              </g>
            ))}
          </motion.g>

          {/* Level 1: Inner Magnetic Ring */}
          <motion.circle
            cx="100" cy="100" r="45"
            stroke="#00f5ff"
            strokeWidth="3"
            strokeDasharray="15 8"
            fill="none"
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />

          {/* The Singularity Core */}
          <motion.g
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.1, repeat: Infinity }}
          >
            {/* Core Glow Layers */}
            <circle cx="100" cy="100" r="32" fill="rgba(0, 245, 255, 0.2)" />
            <circle cx="100" cy="100" r="28" fill="#00f5ff" opacity="0.8" />
            <circle cx="100" cy="100" r="20" fill="#fff" />

            {/* Core Internal HUD */}
            <motion.circle
              cx="100" cy="100" r="24"
              stroke="#010101"
              strokeWidth="4"
              strokeDasharray="2 4"
              fill="none"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.g>

          {/* Connectors / Power Conduits */}
          {[...Array(30)].map((_, i) => (
            <line
              key={i}
              x1="100" y1="55" x2="100" y2="60"
              stroke="#00f5ff"
              strokeWidth="0.5"
              opacity="0.3"
              transform={`rotate(${i * 12}, 100, 100)`}
            />
          ))}
        </motion.svg>

        {/* Progress Display */}
        <div style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          pointerEvents: 'none'
        }}>
          <span className="mono" style={{ color: '#00f5ff', fontSize: '1.2rem', fontWeight: 900, textShadow: '0 0 15px #00f5ff' }}>
            {percent}%
          </span>
          <span className="mono" style={{ color: '#00f5ff', fontSize: '0.5rem', opacity: 0.6, letterSpacing: '0.2em' }}>
            SYNCHRONIZING
          </span>
        </div>
      </div>

      {/* Cinematic HUD Overlays */}
      <div style={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        fontSize: '0.6rem',
        color: '#00f5ff',
        opacity: 0.4
      }} className="mono">
        <div>CORE_TEMP: 38.2°C</div>
        <div>STABILITY: 100%</div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '2rem',
        right: '2rem',
        textAlign: 'right',
        fontSize: '0.6rem',
        color: '#00f5ff',
        opacity: 0.4
      }} className="mono">
        <div>LOC: 51.52° N, 0.12° W</div>
        <div>AUTH: LEVEL_5_ENCRYPTION</div>
      </div>

      {/* Scrolling Diagnostic Logs */}
      <div style={{
        position: 'absolute',
        bottom: '5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '320px',
        maxHeight: '100px',
        overflow: 'hidden',
        pointerEvents: 'none',
        maskImage: 'linear-gradient(transparent, black 20%, black 80%, transparent)'
      }}>
        <AnimatePresence mode="popLayout">
          {logs.map((log, i) => (
            <motion.div
              key={log}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                fontFamily: 'monospace',
                fontSize: '0.6rem',
                color: '#00f5ff',
                opacity: 0.8,
                textAlign: 'center',
                marginBottom: '4px'
              }}
            >
              &gt;&gt; {log}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Screen Degradation Effects */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 245, 255, 0.04) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02))',
        backgroundSize: '100% 3px, 3px 100%',
        pointerEvents: 'none',
        zIndex: 10
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        boxShadow: 'inset 0 0 200px rgba(0, 0, 0, 0.95)',
        pointerEvents: 'none'
      }} />
    </div>
  );
};

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.98]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ position: 'fixed', inset: 0, zIndex: 1000 }}
          >
            <ArcReactorLoader />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        key="hero"
        id="home"
        initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
        animate={{ 
          opacity: isLoading ? 0 : 1,
          scale: isLoading ? 1.05 : 1,
          filter: isLoading ? 'blur(10px)' : 'blur(0px)'
        }}
        transition={{ 
          duration: 1.5, 
          ease: [0.16, 1, 0.3, 1], // Custom slow-out ease
          delay: isLoading ? 0 : 0.4 
        }}
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          overflow: 'hidden',
          background: '#010101',
          padding: 'clamp(6rem, 15vh, 10rem) clamp(1rem, 5vw, 4rem)'
        }}
      >
        {/* 1. Background Grid & Particles */}
        <motion.div
          animate={{ 
            opacity: isLoading ? 0 : 0.4,
            scale: isLoading ? 1.1 : 1
          }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.6 }}
          style={{
            position: 'absolute',
            inset: '-5%',
            zIndex: 0,
            x: mousePos.x * 0.1,
            y: mousePos.y * 0.1,
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(rgba(0, 245, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />
          <DataDust />
        </motion.div>

        {/* 2. Central Quantum Core */}
        <QuantumCore />

        {/* 3. Diagnostic Satellites */}
        <div className="desktop-only" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
          <DiagnosticSatellite label="CORE_VELOCITY" value="842.5 KM/S" delay={0.5} radius={320} speed={40} angleOffset={0} />
          <DiagnosticSatellite label="SYNC_FREQUENCY" value="14.22 GHZ" delay={0.8} radius={380} speed={45} angleOffset={Math.PI / 3} />
          <DiagnosticSatellite label="SYSTEM_LOAD" value="0.042 ms" delay={1.1} radius={350} speed={35} angleOffset={2 * Math.PI / 3} />
        </div>

        {/* 4. Main Symmetrical Content */}
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
          {/* Top Header Label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.5rem 1.5rem',
              background: 'rgba(0, 245, 255, 0.05)',
              border: '1px solid rgba(0, 245, 255, 0.2)',
              color: '#00f5ff',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.4em',
              marginBottom: '4rem',
              fontFamily: 'monospace',
              borderRadius: '2px'
            }}
          >
            <Sparkles size={12} className="animate-pulse" /> SYSTEM_OVERVIEW_INIT
          </motion.div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 10vw, 7.5rem)',
            lineHeight: 0.9,
            marginBottom: '2.5rem',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: '#fff',
            maxWidth: '1200px'
          }}>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Engineering <br />
              <span className="text-glow" style={{ color: '#00f5ff' }}>Authentic</span> Future
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)',
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '4rem',
              maxWidth: '700px',
              lineHeight: 1.6,
              fontWeight: 400
            }}
          >
            Architecting high-stakes digital environments where performance meets precision.
            Translating complex requirements into elegant, scalable solutions.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-btn-container"
            style={{ display: 'flex', gap: '2rem', justifyContent: 'center', width: '100%', maxWidth: '600px' }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ flex: 1 }}>
              <Link to="/projects" style={{
                height: '64px',
                padding: '0 2.5rem',
                background: '#00f5ff',
                border: '1px solid #00f5ff',
                color: '#000',
                borderRadius: '2px',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                fontSize: '1rem',
                textDecoration: 'none',
                textTransform: 'uppercase',
                boxShadow: '0 0 40px rgba(0, 245, 255, 0.3)',
                width: '100%'
              }}>
                Access Work <ArrowRight size={20} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ flex: 1 }}>
              <a href="#contact" style={{
                height: '64px',
                padding: '0 2.5rem',
                border: '1px solid rgba(0, 245, 255, 0.3)',
                background: 'rgba(0, 245, 255, 0.05)',
                color: '#00f5ff',
                borderRadius: '2px',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                fontSize: '1rem',
                textDecoration: 'none',
                textTransform: 'uppercase',
                width: '100%',
                backdropFilter: 'blur(10px)'
              }}>
                Secure Connection <ShieldCheck size={20} />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Decorative Corner Borders */}
        <div style={{ position: 'absolute', top: '2rem', left: '2rem', width: '60px', height: '60px', borderTop: '2px solid #00f5ff', borderLeft: '2px solid #00f5ff', opacity: 0.3 }} />
        <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', width: '60px', height: '60px', borderBottom: '2px solid #00f5ff', borderRight: '2px solid #00f5ff', opacity: 0.3 }} />

        <style>{`
          .desktop-only { @media (max-width: 1024px) { display: none !important; } }
          @media (max-width: 640px) {
            .hero-btn-container { flex-direction: column !important; gap: 1rem !important; }
          }
          .text-glow { text-shadow: 0 0 20px rgba(0, 245, 255, 0.4); }
        `}</style>
      </motion.section>
    </>
  );
};

export default Hero;
