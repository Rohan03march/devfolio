import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { Physics, useSphere, usePlane } from '@react-three/cannon';
import { Cpu, Activity, Zap, Pointer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Automatically discover all tech logos in the assets folder
const techLogos = import.meta.glob('../assets/tech-logos/*.{webp,jpg,png,jpeg}', { eager: true });

const technologies = Object.entries(techLogos).map(([path, module]) => ({
  name: path.split('/').pop().split('.')[0],
  image: module.default || module
}));

function MouseSphere() {
  const { viewport, mouse } = useThree();
  const [ref, api] = useSphere(() => ({
    type: 'Kinematic',
    args: [3],
    position: [0, 0, -100] // Initial position far behind the scene
  }));

  useFrame(() => {
    // Only activate mouse sphere when cursor moves from center
    if (Math.abs(mouse.x) > 0.05 || Math.abs(mouse.y) > 0.05) {
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      api.position.set(x, y, 0);
    } else {
      api.position.set(0, 0, -100);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
}

function TechNode({ position, tech, i }) {
  const { viewport } = useThree();
  const texture = useLoader(THREE.TextureLoader, tech.image);

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);

  const isMobile = viewport.width < 15;
  const nodeSize = isMobile ? viewport.width / 9 : 2.2;

  const [ref, api] = useSphere(() => ({
    mass: 1,
    position,
    args: [nodeSize],
    linearDamping: 0.98, // Very high damping for stable return-to-center
    angularDamping: 0.98,
    material: { restitution: 0.2, friction: 0.1 }
  }));

  const [hovered, setHover] = useState(false);
  const pos = useRef([0, 0, 0]);

  useEffect(() => {
    const unsub = api.position.subscribe((v) => (pos.current = v));
    return unsub;
  }, [api.position]);

  const holoRef = useRef();
  const auraRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (holoRef.current) {
      holoRef.current.rotation.x = t * (1 + i * 0.1);
      holoRef.current.rotation.y = t * 0.5;
    }
    if (auraRef.current) {
      auraRef.current.rotation.z = t;
    }

    const [px, py, pz] = pos.current;

    // Teleport back if too far
    if (Math.abs(px) > 60 || Math.abs(py) > 60 || Math.abs(pz) > 60) {
      api.position.set(0, 0, 0);
      api.velocity.set(0, 0, 0);
    }

    // Atom Physics: Strong attraction to [0,0,0] + High Damping
    const dist = Math.sqrt(px * px + py * py + pz * pz);

    // Smooth magnetic-like attraction to center
    // The further away, the stronger the pull
    const strength = hovered ? 5 : 25;

    api.applyForce([
      -px * strength,
      -py * strength,
      -pz * strength
    ], [0, 0, 0]);
  });

  return (
    <group ref={ref} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      {/* SOLID BALL WITH TEXTURE */}
      <mesh>
        <sphereGeometry args={[nodeSize, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.7}
          roughness={0.3}
          emissive="#00f5ff"
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>

      {/* 2. Holographic Ironman Tech Shell (Rotating Rings) */}
      <group ref={holoRef}>
        <mesh>
          <torusGeometry args={[nodeSize * 1.5, 0.03, 16, 100]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[nodeSize * 1.6, 0.01, 16, 100]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.15} />
        </mesh>
      </group>

      {/* 3. Subtle outer data aura */}
      <mesh ref={auraRef}>
        <sphereGeometry args={[nodeSize * 1.3, 12, 8]} />
        <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

function Borders() {
  const { viewport } = useThree();
  const width = viewport.width;
  const height = viewport.height;
  usePlane(() => ({ position: [0, -height / 2 - 5, 0], rotation: [-Math.PI / 2, 0, 0] }));
  usePlane(() => ({ position: [0, height / 2 + 5, 0], rotation: [Math.PI / 2, 0, 0] }));
  usePlane(() => ({ position: [-width / 2 - 5, 0, 0], rotation: [0, Math.PI / 2, 0] }));
  usePlane(() => ({ position: [width / 2 + 5, 0, 0], rotation: [0, -Math.PI / 2, 0] }));
  return null;
}

const AssessingLoader = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--primary-color)',
      zIndex: 20
    }}
  >
    <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '2rem' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', inset: 0, border: '2px dashed rgba(0, 245, 255, 0.3)', borderRadius: '50%' }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', inset: '20px', border: '1px solid rgba(0, 245, 255, 0.1)', borderRadius: '50%', borderTopColor: '#00f5ff' }}
      />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Activity size={40} style={{ color: '#00f5ff' }} className="animate-pulse" />
      </div>
    </div>
    <div className="mono" style={{ color: '#00f5ff', fontSize: '0.8rem', letterSpacing: '0.5em', textAlign: 'center' }}>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ASSESSING_CORE_MATRIX...
      </motion.span>
    </div>
  </motion.div>
);

const TechStack3D = () => {
  const [isAssessing, setIsAssessing] = useState(false); // Disable loader by default for instant feedback

  return (
    <section id="tech" className="section" style={{
      minHeight: '100vh',
      position: 'relative',
      padding: 0,
      overflow: 'hidden',
      width: '100%',
      background: 'var(--primary-color)'
    }}>
      <AnimatePresence>
        {isAssessing && <AssessingLoader />}
      </AnimatePresence>

      <div style={{ position: 'absolute', top: '5rem', left: '0', width: '100%', zIndex: 10, pointerEvents: 'none', padding: '0 2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <Pointer size={18} style={{ color: '#00f5ff' }} />
          <span className="mono" style={{ color: '#00f5ff', fontWeight: 800, letterSpacing: '0.4em', fontSize: '0.75rem' }}>
            PHYS_SYNC: ACTIVE
          </span>
        </div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', textTransform: 'uppercase' }}>
          Core <span className="text-glow" style={{ color: '#00f5ff' }}>Architecture.</span>
        </h2>
      </div>

      <div style={{ width: '100%', height: '100vh', overflow: 'hidden', touchAction: 'none', position: 'relative' }}>
        <Canvas camera={{ position: [0, 0, 30], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 0, 15]} intensity={150} color="#00f5ff" />
          <pointLight position={[0, 0, -15]} intensity={50} color="#fff" />
          <Suspense fallback={<mesh><sphereGeometry args={[2]} /><meshBasicMaterial color="#00f5ff" wireframe /></mesh>}>
            <Physics gravity={[0, 0, 0]} iterations={10}>
              <Borders />
              <MouseSphere />
              {technologies.map((tech, i) => {
                const isMobile = window.innerWidth <= 768;
                const dynamicRadius = isMobile ? 8 : 12;
                return (
                  <TechNode
                    key={tech.name}
                    tech={tech}
                    i={i}
                    position={[
                      Math.cos(i * (Math.PI * 2 / technologies.length)) * dynamicRadius,
                      Math.sin(i * (Math.PI * 2 / technologies.length)) * dynamicRadius,
                      0
                    ]}
                  />
                );
              })}
            </Physics>
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default TechStack3D;
