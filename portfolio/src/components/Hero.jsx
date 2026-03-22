import React, { Suspense, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

const FloatingBlob = ({ color, position, speed, size }) => {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.x = position[0] + Math.sin(t) * 2;
    ref.current.position.y = position[1] + Math.cos(t * 0.5) * 2;
    ref.current.position.z = position[2] + Math.sin(t * 0.3) * 1;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.4}
        roughness={0}
      />
    </mesh>
  );
};

const PrismaticBackground = () => {
  return (
    <group>
      <FloatingBlob color="#4f46e5" position={[-4, 2, -2]} speed={0.5} size={3} />
      <FloatingBlob color="#7c3aed" position={[4, -2, -3]} speed={0.4} size={3.5} />
      <FloatingBlob color="#2563eb" position={[0, 3, -4]} speed={0.6} size={2.5} />
      <FloatingBlob color="#db2777" position={[-2, -3, -2]} speed={0.3} size={4} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="night" />
    </group>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.98]);
  const yTranslate = useTransform(scrollYProgress, [0, 0.3], [0, 50]);

  const titleWords1 = "Architecting".split(" ");
  const titleWords2 = "The Future".split(" ");
  const titleWords3 = "Of Web & Apps".split(" ");

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const wordVars = {
    hidden: { y: 40, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="home" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '0 1.5rem',
      background: 'radial-gradient(circle at 50% 50%, #0a0a1a 0%, #030303 100%)',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Visual Atmosphere */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.9,
        overflow: 'hidden'
      }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <PrismaticBackground />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Noise Texture Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        opacity: 0.04,
        pointerEvents: 'none',
        backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
        width: '100%',
        height: '100%'
      }} />

      <motion.div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          opacity,
          scale,
          y: yTranslate,
          textAlign: 'center',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 'clamp(8rem, 20vh, 12rem)' // Push content below the lower fixed nav
        }}
      >
        <motion.h1
          variants={containerVars}
          initial="hidden"
          animate="show"
          style={{
            fontSize: 'clamp(1.8rem, 9vw, 4.5rem)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            maxWidth: '100%',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            width: '100%',
            padding: '0 0.5rem'
          }}
        >
          <motion.span variants={wordVars} style={{ display: 'block' }}>Architecting</motion.span>
          <motion.span variants={wordVars} style={{ display: 'block' }} className="text-gradient">The Future</motion.span>
          <motion.span variants={wordVars} style={{ display: 'block' }} className="text-gradient-accent">Of Web & Apps</motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          style={{
            fontSize: 'clamp(1rem, 4vw, 1.2rem)',
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            maxWidth: '650px',
            marginInline: 'auto',
            lineHeight: 1.6,
            fontWeight: 400,
            padding: '0 1rem'
          }}
        >
          Engineering high-performance applications with a focus on <span style={{ color: '#fff' }}>authentic</span> user experiences and <span style={{ color: '#fff' }}>clean</span> architecture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            width: '100%'
          }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/projects" style={{
              padding: 'clamp(0.9rem, 3vw, 1.1rem) clamp(1.8rem, 6vw, 2.5rem)',
              background: '#fff',
              color: '#000',
              borderRadius: '99px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: '0 10px 30px -10px rgba(255,255,255,0.3)',
              fontSize: '1rem',
              textDecoration: 'none',
              whiteSpace: 'nowrap'
            }}>
              View Projects <ArrowRight size={18} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a href="#contact" style={{
              padding: 'clamp(0.9rem, 3vw, 1.1rem) clamp(1.8rem, 6vw, 2.5rem)',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              borderRadius: '99px',
              fontWeight: 600,
              display: 'inline-block',
              fontSize: '1rem',
              textDecoration: 'none',
              whiteSpace: 'nowrap'
            }}>
              Get in touch
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
