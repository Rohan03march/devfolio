import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles, Wifi, Cpu, Activity, Target, Radio, Crosshair } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────
   TYPEWRITER
───────────────────────────────────────── */
const Typewriter = ({ text, delay = 0, speed = 40, className, style }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    let timeout;
    if (displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed + (displayedText.length === 0 ? delay : 0));
    } else { setComplete(true); }
    return () => clearTimeout(timeout);
  }, [displayedText, text, speed, delay]);
  return (
    <span className={className} style={{ ...style, position: 'relative' }}>
      {displayedText}
      {!complete && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ display: 'inline-block', width: '2px', height: '1em', background: '#00f5ff', marginLeft: '2px', verticalAlign: 'middle' }}
        />
      )}
    </span>
  );
};

/* ─────────────────────────────────────────
   PARTICLE CANVAS (mouse-reactive)
───────────────────────────────────────── */
const ParticleField = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const particles = [];
    class P {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.2 + 0.3;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.05;
        this.life = 0; this.maxLife = Math.random() * 300 + 100;
      }
      update() {
        const dx = mouse.current.x - this.x, dy = mouse.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) { this.vx -= (dx / dist) * 0.05; this.vy -= (dy / dist) * 0.05; }
        this.vx *= 0.98; this.vy *= 0.98;
        this.x += this.vx; this.y += this.vy; this.life++;
        if (this.life > this.maxLife || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.fillStyle = `rgba(0,245,255,${this.opacity * (1 - this.life / this.maxLife)})`;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
    }
    const init = () => {
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
      particles.length = 0;
      for (let i = 0; i < 100; i++) particles.push(new P());
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      raf = requestAnimationFrame(animate);
    };
    const onMouse = e => { mouse.current = { x: e.clientX, y: e.clientY }; };
    init(); animate();
    window.addEventListener('resize', init);
    window.addEventListener('mousemove', onMouse);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', init); window.removeEventListener('mousemove', onMouse); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />;
};

/* ─────────────────────────────────────────
   AR GRID (perspective, mouse-tilted)
───────────────────────────────────────── */
const ARGrid = ({ mouse }) => (
  <motion.div
    style={{
      position: 'absolute', inset: '-10%', zIndex: 0,
      backgroundImage: `
        linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)
      `,
      backgroundSize: '60px 60px',
      transformStyle: 'preserve-3d',
      rotateX: mouse.y * 0.008,
      rotateY: mouse.x * 0.008,
    }}
  >
    {/* Horizon line */}
    <div style={{
      position: 'absolute', top: '50%', left: 0, right: 0, height: '1px',
      background: 'linear-gradient(90deg,transparent,rgba(0,245,255,0.15) 20%,rgba(0,245,255,0.4) 50%,rgba(0,245,255,0.15) 80%,transparent)',
      boxShadow: '0 0 20px rgba(0,245,255,0.1)',
    }} />
  </motion.div>
);

/* ─────────────────────────────────────────
   SCAN SWEEP
───────────────────────────────────────── */
const ScanSweep = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
    <motion.div
      animate={{ y: ['-100%', '200%'] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
      style={{
        position: 'absolute', left: 0, right: 0, height: '3px',
        background: 'linear-gradient(90deg,transparent,rgba(0,245,255,0.08) 20%,rgba(0,245,255,0.5) 50%,rgba(0,245,255,0.08) 80%,transparent)',
        boxShadow: '0 0 30px rgba(0,245,255,0.3), 0 0 60px rgba(0,245,255,0.1)',
      }}
    />
    {/* Vertical scan */}
    <motion.div
      animate={{ x: ['-100%', '200%'] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: 2 }}
      style={{
        position: 'absolute', top: 0, bottom: 0, width: '2px',
        background: 'linear-gradient(180deg,transparent,rgba(0,245,255,0.08) 20%,rgba(0,245,255,0.3) 50%,rgba(0,245,255,0.08) 80%,transparent)',
        boxShadow: '0 0 20px rgba(0,245,255,0.2)',
      }}
    />
  </div>
);

/* ─────────────────────────────────────────
   AR TARGET RETICLE (center)
───────────────────────────────────────── */
const TargetReticle = () => (
  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 1 }}>
    <div style={{ position: 'relative', width: '500px', height: '500px' }}>
      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '1px solid rgba(0,245,255,0.12)',
          borderTopColor: 'rgba(0,245,255,0.5)',
        }}
      />
      {/* Middle ring - counter rotate */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: '60px', borderRadius: '50%',
          border: '1px dashed rgba(0,245,255,0.15)',
          borderTopColor: 'rgba(0,245,255,0.4)',
          borderRightColor: 'rgba(0,245,255,0.4)',
        }}
      />
      {/* Inner ring */}
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.02, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: '130px', borderRadius: '50%',
          border: '1px solid rgba(0,245,255,0.2)',
          borderTopColor: 'rgba(0,245,255,0.6)',
          borderBottomColor: 'rgba(0,245,255,0.6)',
        }}
      />
      {/* Crosshair lines */}
      {[0, 90, 180, 270].map(deg => (
        <div key={deg} style={{
          position: 'absolute', top: '50%', left: '50%',
          width: '80px', height: '1px',
          background: 'linear-gradient(90deg,rgba(0,245,255,0.6),transparent)',
          transformOrigin: '0 0',
          transform: `rotate(${deg}deg)`,
          marginTop: '-0.5px',
        }} />
      ))}
      {/* Center dot */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          width: '6px', height: '6px', borderRadius: '50%',
          background: '#00f5ff', boxShadow: '0 0 20px #00f5ff, 0 0 40px rgba(0,245,255,0.5)',
          transform: 'translate(-50%,-50%)',
        }}
      />
      {/* Corner brackets on inner circle */}
      {[
        { top: '122px', left: '122px', borderTop: true, borderLeft: true },
        { top: '122px', right: '122px', borderTop: true, borderRight: true },
        { bottom: '122px', left: '122px', borderBottom: true, borderLeft: true },
        { bottom: '122px', right: '122px', borderBottom: true, borderRight: true },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', width: '14px', height: '14px',
          ...pos,
          borderTopWidth: pos.borderTop ? '2px' : 0,
          borderBottomWidth: pos.borderBottom ? '2px' : 0,
          borderLeftWidth: pos.borderLeft ? '2px' : 0,
          borderRightWidth: pos.borderRight ? '2px' : 0,
          borderStyle: 'solid',
          borderColor: 'rgba(0,245,255,0.7)',
        }} />
      ))}
      {/* Pulsing aura */}
      <motion.div
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: '-50px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
    </div>
  </div>
);

/* CornerBrackets removed */

/* ─────────────────────────────────────────
   LEFT HUD PANEL
───────────────────────────────────────── */
const LeftHUDPanel = () => {
  const [time, setTime] = useState('');
  const [signal, setSignal] = useState(97);
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const id = setInterval(() => setSignal(Math.floor(Math.random() * 5) + 95), 2000);
    return () => clearInterval(id);
  }, []);

  const metrics = [
    { label: 'SYS.TEMP', value: '38.2°C', color: '#00f5ff' },
    { label: 'PROC.LOAD', value: '4.2%', color: '#00ff88' },
    { label: 'NET.PING', value: '12ms', color: '#00f5ff' },
    { label: 'MEM.ALLOC', value: '2.1 GB', color: '#ffbb00' },
    { label: 'UPTIME', value: '∞', color: '#00f5ff' },
  ];

  return (
    <motion.div
      className="desktop-only"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      style={{
        position: 'absolute', left: '2.5rem', top: '50%', transform: 'translateY(-50%)',
        zIndex: 3, display: 'flex', flexDirection: 'column', gap: '0.6rem', pointerEvents: 'none',
      }}
    >
      {/* Clock */}
      <div style={{ marginBottom: '0.5rem' }}>
        <div className="mono" style={{ fontSize: '0.5rem', color: 'rgba(0,245,255,0.5)', marginBottom: '0.2rem' }}>LOCAL_TIME</div>
        <div className="mono" style={{ fontSize: '0.85rem', color: '#00f5ff', letterSpacing: '0.15em', fontWeight: 700 }}>{time}</div>
      </div>
      <div style={{ width: '100%', height: '1px', background: 'rgba(0,245,255,0.15)' }} />
      {/* Metrics */}
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4 + i * 0.08 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
        >
          <div className="mono" style={{ fontSize: '0.45rem', color: 'rgba(0,245,255,0.45)', letterSpacing: '0.2em' }}>{m.label}</div>
          <div className="mono" style={{ fontSize: '0.7rem', color: m.color, fontWeight: 700 }}>{m.value}</div>
        </motion.div>
      ))}
      <div style={{ width: '100%', height: '1px', background: 'rgba(0,245,255,0.15)', marginTop: '0.3rem' }} />
      {/* Signal bar */}
      <div>
        <div className="mono" style={{ fontSize: '0.45rem', color: 'rgba(0,245,255,0.5)', marginBottom: '0.3rem' }}>SIGNAL_STR</div>
        <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end' }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              width: '4px',
              height: `${(i + 1) * 3 + 2}px`,
              background: i < Math.floor(signal / 12.5)
                ? `rgba(0,245,255,${0.4 + i * 0.08})`
                : 'rgba(255,255,255,0.1)',
              borderRadius: '1px',
            }} />
          ))}
          <div className="mono" style={{ fontSize: '0.5rem', color: '#00f5ff', marginLeft: '4px' }}>{signal}%</div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   RIGHT HUD PANEL
───────────────────────────────────────── */
const RightHUDPanel = () => {
  const [altitude] = useState('ALT: 0042 M');
  const [coords, setCoords] = useState('51.52°N / 0.12°W');
  const [threat, setThreat] = useState('NONE_DETECTED');
  const [range, setRange] = useState(142);
  useEffect(() => {
    const id = setInterval(() => setRange(r => Math.floor(r + (Math.random() - 0.5) * 10)), 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="desktop-only"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      style={{
        position: 'absolute', right: '2.5rem', top: '50%', transform: 'translateY(-50%)',
        zIndex: 3, display: 'flex', flexDirection: 'column', gap: '0.6rem', pointerEvents: 'none',
        alignItems: 'flex-end', textAlign: 'right',
      }}
    >
      <div style={{ marginBottom: '0.5rem' }}>
        <div className="mono" style={{ fontSize: '0.5rem', color: 'rgba(0,245,255,0.5)', marginBottom: '0.2rem' }}>GEO_LOCATION</div>
        <div className="mono" style={{ fontSize: '0.7rem', color: '#00f5ff', fontWeight: 700 }}>{coords}</div>
      </div>
      <div style={{ width: '100%', height: '1px', background: 'rgba(0,245,255,0.15)' }} />
      {[
        { label: 'ALTITUDE', value: altitude },
        { label: 'RANGE_TARGET', value: `${range} M` },
        { label: 'AUTH_LEVEL', value: 'LVL_5_CLEARANCE' },
        { label: 'ENCRYPTION', value: 'AES-256-GCM' },
      ].map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4 + i * 0.08 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
        >
          <div className="mono" style={{ fontSize: '0.45rem', color: 'rgba(0,245,255,0.45)' }}>{m.label}</div>
          <div className="mono" style={{ fontSize: '0.7rem', color: '#00f5ff', fontWeight: 700 }}>{m.value}</div>
        </motion.div>
      ))}
      <div style={{ width: '100%', height: '1px', background: 'rgba(0,245,255,0.15)', marginTop: '0.3rem' }} />
      {/* Threat indicator */}
      <div>
        <div className="mono" style={{ fontSize: '0.45rem', color: 'rgba(0,245,255,0.5)', marginBottom: '0.2rem' }}>THREAT_LEVEL</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88' }} />
          </motion.div>
          <div className="mono" style={{ fontSize: '0.55rem', color: '#00ff88' }}>{threat}</div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   TOP HUD BAR
───────────────────────────────────────── */
const TopHUDBar = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.6 }}
    style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      height: '3px', zIndex: 4,
      background: 'linear-gradient(90deg,transparent,rgba(0,245,255,0.6) 30%,rgba(0,245,255,0.9) 50%,rgba(0,245,255,0.6) 70%,transparent)',
    }}
  />
);

/* ─────────────────────────────────────────
   BOTTOM STATUS BAR
───────────────────────────────────────── */
const BottomStatusBar = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 500);
    return () => clearInterval(id);
  }, []);
  const statusItems = ['SYS::ONLINE', 'NET::SECURED', 'AUTH::VERIFIED', 'AI_CORE::ACTIVE', 'EXO_SUIT::READY'];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      style={{
        position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '2rem', alignItems: 'center', zIndex: 3, pointerEvents: 'none',
      }}
    >
      {statusItems.map((item, i) => (
        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#00f5ff', boxShadow: '0 0 6px #00f5ff' }}
          />
          <span className="mono" style={{ fontSize: '0.45rem', color: 'rgba(0,245,255,0.55)' }}>{item}</span>
        </div>
      ))}
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   GLITCH TEXT - smooth CSS-driven chromatic shift
───────────────────────────────────────── */
const GlitchText = ({ children, style }) => {
  const [phase, setPhase] = useState(0); // 0=idle, 1=building, 2=peak, 3=fading
  useEffect(() => {
    let timeout;
    const schedule = () => {
      // wait a random idle period then run the glitch sequence
      timeout = setTimeout(() => {
        setPhase(1);                    // start building
        timeout = setTimeout(() => {
          setPhase(2);                  // peak
          timeout = setTimeout(() => {
            setPhase(3);               // fade out
            timeout = setTimeout(() => {
              setPhase(0);             // back to idle
              schedule();              // schedule next
            }, 400);
          }, 180);
        }, 80);
      }, Math.random() * 3500 + 1500);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  const offsets = { 1: 3, 2: 6, 3: 1 };
  const opacities = { 0: 0, 1: 0.4, 2: 0.75, 3: 0.15 };
  const offset = offsets[phase] ?? 0;
  const opacity = opacities[phase] ?? 0;

  return (
    <span style={{ position: 'relative', display: 'inline-block', ...style }}>
      {children}
      {/* cyan layer - shifts left */}
      <span style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        color: '#00f5ff',
        clipPath: 'polygon(0 20%,100% 20%,100% 55%,0 55%)',
        transform: `translateX(-${offset}px)`,
        pointerEvents: 'none',
        opacity,
        filter: phase >= 2 ? 'blur(0.5px)' : 'none',
        transition: 'opacity 0.12s ease, transform 0.12s ease',
        mixBlendMode: 'screen',
      }}>{children}</span>
      {/* red/magenta layer - shifts right */}
      <span style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        color: '#ff2060',
        clipPath: 'polygon(0 55%,100% 55%,100% 85%,0 85%)',
        transform: `translateX(${offset}px)`,
        pointerEvents: 'none',
        opacity: opacity * 0.85,
        filter: phase >= 2 ? 'blur(0.5px)' : 'none',
        transition: 'opacity 0.12s ease, transform 0.12s ease',
        mixBlendMode: 'screen',
      }}>{children}</span>
    </span>
  );
};

/* ─────────────────────────────────────────
   AR TARGET LOCK - cursor follower
───────────────────────────────────────── */
const ARCursor = ({ mouse }) => {
  const springCfg = { stiffness: 200, damping: 25 };
  const x = useSpring(mouse.x, springCfg);
  const y = useSpring(mouse.y, springCfg);
  return (
    <>
      {/* Outer bracket */}
      <motion.div
        style={{
          position: 'fixed', zIndex: 9999, pointerEvents: 'none',
          width: '30px', height: '30px',
          x, y,
          marginLeft: '-15px', marginTop: '-15px',
          border: '1px solid rgba(0,245,255,0.8)',
          borderRadius: '2px',
          mixBlendMode: 'normal',
        }}
        animate={{ rotate: [0, 90, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      {/* Inner dot */}
      <motion.div
        style={{
          position: 'fixed', zIndex: 9999, pointerEvents: 'none',
          width: '4px', height: '4px', borderRadius: '50%',
          background: '#00f5ff', boxShadow: '0 0 8px #00f5ff',
          x, y,
          marginLeft: '-2px', marginTop: '-2px',
        }}
      />
    </>
  );
};

/* ─────────────────────────────────────────
   ARC REACTOR LOADER
───────────────────────────────────────── */
const ArcReactorLoader = () => {
  const [percent, setPercent] = useState(0);
  const [logs, setLogs] = useState([]);
  const bootLogs = useMemo(() => [
    'INITIALIZING_CORE_REACTIVE_UNIT...',
    'CHECKING_INTEGRITY_SHIELD...',
    'POWER_LEVEL_OPTIMIZED: 100%',
    'BYPASSING_SECURITY_PROTOCOLS...',
    'JARVIS_ONLINE_V4.2.1',
    'WELCOME_HOME_ROHAN',
  ], []);
  useEffect(() => {
    const d = 3000;
    const i1 = setInterval(() => setPercent(p => p >= 100 ? 100 : p + 1), d / 100);
    const i2 = setInterval(() => setLogs(prev => prev.length >= bootLogs.length ? prev : [...prev, bootLogs[prev.length]]), d / bootLogs.length);
    return () => { clearInterval(i1); clearInterval(i2); };
  }, [bootLogs]);
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#010101', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1000, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(0,50,60,0.4) 0%, transparent 70%)', opacity: 0.5 }} />
      <div style={{ position: 'relative', width: 'clamp(260px,45vw,420px)', height: 'clamp(260px,45vw,420px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', width: '120%', height: '120%', background: 'radial-gradient(circle, rgba(0,245,255,0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(50px)' }}
        />
        <motion.svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 30px rgba(0,245,255,0.6))' }}>
          <motion.g animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
            {[...Array(10)].map((_, i) => <motion.path key={i} d="M100 5 A95 95 0 0 1 130 10 L128 25 A80 80 0 0 0 100 22 Z" fill="rgba(0,245,255,0.15)" stroke="#00f5ff" strokeWidth="0.5" transform={`rotate(${i * 36},100,100)`} />)}
          </motion.g>
          <motion.g animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}>
            {[...Array(6)].map((_, i) => <g key={i} transform={`rotate(${i * 60},100,100)`}><rect x="96" y="30" width="8" height="25" fill="#00f5ff" opacity="0.4" rx="1" /><rect x="98" y="32" width="4" height="21" fill="#fff" opacity="0.6" rx="1" /></g>)}
          </motion.g>
          <motion.circle cx="100" cy="100" r="45" stroke="#00f5ff" strokeWidth="3" strokeDasharray="15 8" fill="none" animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} />
          <motion.g animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.1, repeat: Infinity }}>
            <circle cx="100" cy="100" r="32" fill="rgba(0,245,255,0.2)" />
            <circle cx="100" cy="100" r="28" fill="#00f5ff" opacity="0.8" />
            <circle cx="100" cy="100" r="20" fill="#fff" />
            <motion.circle cx="100" cy="100" r="24" stroke="#010101" strokeWidth="4" strokeDasharray="2 4" fill="none" animate={{ rotate: -360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
          </motion.g>
          {[...Array(30)].map((_, i) => <line key={i} x1="100" y1="55" x2="100" y2="60" stroke="#00f5ff" strokeWidth="0.5" opacity="0.3" transform={`rotate(${i * 12},100,100)`} />)}
        </motion.svg>
        <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', pointerEvents: 'none' }}>
          <span className="mono" style={{ color: '#00f5ff', fontSize: '1.2rem', fontWeight: 900, textShadow: '0 0 15px #00f5ff' }}>{percent}%</span>
          <span className="mono" style={{ color: '#00f5ff', fontSize: '0.5rem', opacity: 0.6, letterSpacing: '0.2em' }}>SYNCHRONIZING</span>
        </div>
      </div>
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', fontSize: '0.6rem', color: '#00f5ff', opacity: 0.4 }} className="mono">
        <div>CORE_TEMP: 38.2°C</div><div>STABILITY: 100%</div>
      </div>
      <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', textAlign: 'right', fontSize: '0.6rem', color: '#00f5ff', opacity: 0.4 }} className="mono">
        <div>LOC: 51.52° N, 0.12° W</div><div>AUTH: LEVEL_5_ENCRYPTION</div>
      </div>
      <div style={{ position: 'absolute', bottom: '5rem', left: '50%', transform: 'translateX(-50%)', width: '320px', maxHeight: '100px', overflow: 'hidden', pointerEvents: 'none', maskImage: 'linear-gradient(transparent, black 20%, black 80%, transparent)' }}>
        <AnimatePresence mode="popLayout">
          {logs.map((log) => (
            <motion.div key={log} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#00f5ff', opacity: 0.8, textAlign: 'center', marginBottom: '4px' }}
            >&gt;&gt; {log}</motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,245,255,0.04) 50%), linear-gradient(90deg, rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))', backgroundSize: '100% 3px, 3px 100%', pointerEvents: 'none', zIndex: 10 }} />
      <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 200px rgba(0,0,0,0.95)', pointerEvents: 'none' }} />
    </div>
  );
};

/* ─────────────────────────────────────────
   HERO MAIN
───────────────────────────────────────── */
const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const mouseMotionX = useMotionValue(0);
  const mouseMotionY = useMotionValue(0);

  // Scroll tracking — ref on the section itself for accuracy
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // ── Parallax layers at different depths ──
  // Content (closest) — fades + slides up gently
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.94]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Reticle (mid layer) — drifts up a bit faster
  const reticleY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const reticleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const reticleScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.85]);

  // HUD panels (attached to reticle depth)
  const hudOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const hudY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // Grid (deepest, slowest) — barely moves
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.8], [0.4, 0]);

  // Status bar
  const statusOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const onMouse = e => {
      mouseMotionX.set(e.clientX);
      mouseMotionY.set(e.clientY);
      setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 120, y: (e.clientY / window.innerHeight - 0.5) * 120 });
    };
    window.addEventListener('mousemove', onMouse);
    const t = setTimeout(() => setIsLoading(false), 3000);
    return () => { window.removeEventListener('mousemove', onMouse); clearTimeout(t); };
  }, []);

  return (
    <>
      {/* Custom AR Cursor */}
      <ARCursor mouse={{ x: mouseMotionX, y: mouseMotionY }} />

      {/* Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div key="loader" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }} transition={{ duration: 0.9, ease: 'easeInOut' }} style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
            <ArcReactorLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ── */}
      <motion.section
        ref={sectionRef}
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1, filter: isLoading ? 'blur(10px)' : 'blur(0px)' }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: isLoading ? 0 : 0.4 }}
        style={{
          position: 'relative', minHeight: '100vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '100%', overflow: 'hidden', background: '#010101',
          padding: 'clamp(6rem,15vh,10rem) clamp(1rem,5vw,4rem)',
        }}
      >
        {/* Cinematic vignette */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)', zIndex: 1, pointerEvents: 'none' }} />

        {/* Scanline overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }} />

        {/* ── DEPTH 0: Grid + Particles (deepest — barely drifts) ── */}
        <motion.div style={{ position: 'absolute', inset: 0, y: gridY, opacity: gridOpacity }}>
          <ARGrid mouse={mouse} />
          <ParticleField />
        </motion.div>

        {/* Scan sweeps */}
        <ScanSweep />

        {/* Top bar accent */}
        <TopHUDBar />

        {/* ── DEPTH 1: Reticle (mid-speed) ── */}
        <motion.div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', y: reticleY, opacity: reticleOpacity, scale: reticleScale }}>
          <TargetReticle />
        </motion.div>

        {/* ── DEPTH 1.5: HUD side panels (fade out fastest) ── */}
        <motion.div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', y: hudY, opacity: hudOpacity }}>
          <LeftHUDPanel />
          <RightHUDPanel />
        </motion.div>

        {/* ── DEPTH 2: Bottom status bar ── */}
        <motion.div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3, opacity: statusOpacity }}>
          <BottomStatusBar />
        </motion.div>

        {/* ── DEPTH 3: Main content (closest — fades last) ── */}
        <motion.div
          className="container"
          style={{
            position: 'relative', zIndex: 2,
            opacity: contentOpacity, scale: contentScale, y: contentY,
            width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          }}
        >
          {/* System label pill */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.45rem 1.2rem',
              background: 'rgba(0,245,255,0.04)',
              border: '1px solid rgba(0,245,255,0.2)',
              color: '#00f5ff', fontSize: '0.62rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.4em',
              marginBottom: '3rem', fontFamily: 'monospace', borderRadius: '2px',
              backdropFilter: 'blur(10px)',
            }}
          >
            ROHAN_P - AR_SYSTEM_ONLINE
            <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 6px #00ff88' }} />
            </motion.div>
          </motion.div>

          {/* Name / Title */}
          <h1 style={{ fontSize: 'clamp(2.8rem, 10vw, 8rem)', lineHeight: 0.88, marginBottom: '1.5rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', maxWidth: '1100px' }}>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              <GlitchText>Engineering</GlitchText>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'block', color: '#00f5ff', textShadow: '0 0 40px rgba(0,245,255,0.4), 0 0 80px rgba(0,245,255,0.15)' }}
            >
              <GlitchText>Authentic</GlitchText>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              Future
            </motion.div>
          </h1>

          {/* Identity line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}
          >
            <div style={{ width: '40px', height: '1px', background: 'rgba(0,245,255,0.4)' }} />

            <div style={{ width: '40px', height: '1px', background: 'rgba(0,245,255,0.4)' }} />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(0.9rem,2.5vw,1.2rem)', color: 'rgba(255,255,255,0.55)', marginBottom: '4rem', maxWidth: '640px', lineHeight: 1.7 }}
          >
            Architecting high-stakes digital environments where performance meets precision.
            Translating complex requirements into{' '}
            <span style={{ color: '#00f5ff', fontWeight: 600 }}>elegant, scalable solutions</span>.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-btn-container"
            style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', width: '100%', maxWidth: '560px' }}
          >
            {/* Primary CTA */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} style={{ flex: 1, position: 'relative' }}>
              <Link to="/projects" style={{
                height: '60px', padding: '0 2rem',
                background: '#00f5ff', border: '1px solid #00f5ff',
                color: '#000', borderRadius: '2px', fontWeight: 900,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '0.75rem', fontSize: '0.85rem', textDecoration: 'none', textTransform: 'uppercase',
                letterSpacing: '0.15em', boxShadow: '0 0 40px rgba(0,245,255,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
                width: '100%', position: 'relative', overflow: 'hidden',
              }}>
                {/* Shimmer sweep on hover */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                  style={{ position: 'absolute', top: 0, bottom: 0, width: '30%', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)', pointerEvents: 'none' }}
                />
                <Target size={16} /> Access Work <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} style={{ flex: 1 }}>
              <a href="#contact" style={{
                height: '60px', padding: '0 2rem',
                border: '1px solid rgba(0,245,255,0.3)', background: 'rgba(0,245,255,0.05)',
                color: '#00f5ff', borderRadius: '2px', fontWeight: 900,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '0.75rem', fontSize: '0.85rem', textDecoration: 'none', textTransform: 'uppercase',
                letterSpacing: '0.15em', width: '100%', backdropFilter: 'blur(10px)',
                boxShadow: '0 0 20px rgba(0,245,255,0.1)',
              }}>
                <ShieldCheck size={16} /> Contact Me
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── SCROLLDOWN indicator (fades immediately on scroll) ── */}
        <motion.div
          style={{
            position: 'absolute', right: '2.5rem', bottom: '3rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 3,
            opacity: statusOpacity,
          }}
        >
          <span className="mono" style={{ fontSize: '0.45rem', color: 'rgba(0,245,255,0.5)', writingMode: 'vertical-lr', letterSpacing: '0.25em' }}>SCROLL_DOWN</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg,rgba(0,245,255,0.5),transparent)' }}
          />
        </motion.div>

        <style>{`
          .desktop-only { display: flex; }
          @media (max-width: 1024px) { .desktop-only { display: none !important; } }
          @media (max-width: 640px) { .hero-btn-container { flex-direction: column !important; gap: 1rem !important; } }
        `}</style>
      </motion.section>
    </>
  );
};

export default Hero;
