import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { Physics, useSphere, usePlane } from '@react-three/cannon';
import { Environment } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
import * as THREE from 'three';

// List of technologies. Since these are in public/images, we'll list them here.
// You can add more filenames here when you add images to public/images.
const techFiles = [
  'expo.jpg', 'express.webp', 'firebase.jpg', 'javascript.webp',
  'mongo.webp', 'mysql.webp', 'next.webp', 'next1.webp',
  'next2.webp', 'nextBL.webp', 'node.webp', 'node2.webp',
  'react.webp', 'react2.webp', 'supabase.webp', 'typescript.webp'
];

const technologies = techFiles.map(filename => ({
  name: filename.split('.')[0],
  image: `/images/${filename}`
}));

function Bubble({ position, tech }) {
  const { viewport } = useThree();
  const texture = useLoader(THREE.TextureLoader, tech.image);
  texture.colorSpace = THREE.SRGBColorSpace;

  // Scale sphere size based on viewport width (more narrow = smaller spheres)
  const isMobile = viewport.width < 15; // Rough estimate in Three.js units
  const sphereSize = isMobile ? viewport.width / 8 : 2.0;

  const [ref, api] = useSphere(() => ({
    mass: 1,
    position,
    args: [sphereSize * 1.2],
    material: { restitution: 0.9, friction: 0.1 },
    linearDamping: 0.9,
    angularDamping: 0.9,
  }));

  const [hovered, setHover] = useState(false);
  const [pointerDown, setPointerDown] = useState(false);
  const [target, setTarget] = useState(new THREE.Vector3());
  const state = useThree();

  const pos = useRef([0, 0, 0]);
  React.useEffect(() => {
    const unsub = api.position.subscribe((v) => (pos.current = v));
    return unsub;
  }, [api.position]);

  const bind = useDrag(({ active, event }) => {
    if (active) {
      setPointerDown(true);
      document.body.style.cursor = 'grabbing';

      const clientX = event.clientX || (event.touches && event.touches[0].clientX);
      const clientY = event.clientY || (event.touches && event.touches[0].clientY);

      if (clientX !== undefined && clientY !== undefined) {
        const rect = state.gl.domElement.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((clientY - rect.top) / rect.height) * 2 + 1;

        const vec = new THREE.Vector3(x, y, 0.5);
        vec.unproject(state.camera);
        vec.sub(state.camera.position).normalize();
        const distance = -state.camera.position.z / vec.z;
        const projectedPos = state.camera.position.clone().add(vec.multiplyScalar(distance));
        setTarget(projectedPos);
      }
    } else {
      setPointerDown(false);
      document.body.style.cursor = hovered ? 'grab' : 'auto';
    }
  });

  useFrame(() => {
    const [px, py, pz] = pos.current;

    if (pointerDown) {
      // Smooth drag logic: pull towards the mouse target, loose and springy
      const force = 20; // Lower force for a looser feel
      api.applyForce([
        (target.x - px) * force,
        (target.y - py) * force,
        (target.z - pz) * force
      ], [0, 0, 0]);
    } else {
      // Atom clustering logic: pull towards center (0,0,0) with stable, smooth motion
      const force = 4; // Subtler gravity for smoother clustering
      const noise = 5; // Significantly reduced noise for more stable motion

      // Add a gentle upward shift if hovered
      const hoverForceY = hovered ? 30 : 0;

      api.applyForce([
        -px * force + (Math.random() - 0.5) * noise,
        -py * force + hoverForceY + (Math.random() - 0.5) * noise,
        -pz * force + (Math.random() - 0.5) * noise
      ], [0, 0, 0]);
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHover(true);
    if (!pointerDown) document.body.style.cursor = 'grab';
  };

  const handlePointerOut = () => {
    setHover(false);
    if (!pointerDown) document.body.style.cursor = 'auto';
  };

  return (
    <mesh
      ref={ref}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      castShadow
      receiveShadow
      {...bind()}
    >
      <sphereGeometry args={[sphereSize, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.4}
        metalness={0.2}
        emissive={hovered ? new THREE.Color(0x333333) : new THREE.Color(0x000000)}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function Borders() {
  const { viewport } = useThree();
  const width = viewport.width;
  const height = viewport.height;

  // Invisible bounding box
  usePlane(() => ({ position: [0, -height / 2 - 2, 0], rotation: [-Math.PI / 2, 0, 0] }));
  usePlane(() => ({ position: [0, height / 2 + 2, 0], rotation: [Math.PI / 2, 0, 0] }));
  usePlane(() => ({ position: [-width / 2 - 2, 0, 0], rotation: [0, Math.PI / 2, 0] }));
  usePlane(() => ({ position: [width / 2 + 2, 0, 0], rotation: [0, -Math.PI / 2, 0] }));
  usePlane(() => ({ position: [0, 0, -5], rotation: [0, 0, 0] }));
  usePlane(() => ({ position: [0, 0, 10], rotation: [0, -Math.PI, 0] }));

  return null;
}

const TechStack3D = () => {
  const [cameraConfig, setCameraConfig] = useState({ z: 30, fov: 45 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCameraConfig({ z: 45, fov: 55 }); // Greater FOV and distance for mobile
      } else {
        setCameraConfig({ z: 30, fov: 45 });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="tech" className="section" style={{ minHeight: '100vh', position: 'relative', padding: 0, overflow: 'hidden', width: '100%' }}>
      <div style={{ position: 'absolute', top: '5rem', left: '0', width: '100%', zIndex: 10, pointerEvents: 'none', padding: '0 1.5rem' }} className="text-center-mobile">
        <h2 className="text-gradient" style={{ fontSize: 'clamp(2.2rem, 8vw, 4rem)' }}>My <span className="text-gradient-accent">Tech Stack</span></h2>
      </div>

      <div style={{ width: '100%', height: '100vh', overflow: 'hidden', background: 'transparent', touchAction: 'none' }}>
        <Canvas camera={{ position: [0, 0, cameraConfig.z], fov: cameraConfig.fov }} shadows dpr={[1, 2]}>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
          <spotLight position={[-10, 10, 10]} intensity={2} color="#ffffff" />

          <Physics gravity={[0, 0, 0]} defaultContactMaterial={{ restitution: 0.5, friction: 0.5 }}>
            <Borders />
            {technologies.map((tech) => (
              <React.Suspense key={`${tech.name}-${cameraConfig.z}`} fallback={null}>
                <Bubble
                  tech={tech}
                  position={[
                    (Math.random() - 0.5) * 15,
                    (Math.random() - 0.5) * 15,
                    (Math.random() - 0.5) * 15
                  ]}
                />
              </React.Suspense>
            ))}
          </Physics>

          <Environment preset="city" />
        </Canvas>
      </div>
    </section>
  );
};

export default TechStack3D;
