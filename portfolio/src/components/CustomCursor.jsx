import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const springX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateMousePosition = (e) => {
      if (isMobile) return;
      setMousePosition({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (isMobile) return;
      const target = e.target;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(isClickable);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile, springX, springY]);

  if (isMobile) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99999 }}>
      {/* Targeting Reticle */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '32px',
          height: '32px',
          border: '1px solid rgba(0, 245, 255, 0.3)',
          borderRadius: '50%',
          translateX: '-50%',
          translateY: '-50%',
          x: springX,
          y: springY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 90 : 0,
          borderColor: isHovering ? 'rgba(0, 245, 255, 0.8)' : 'rgba(0, 245, 255, 0.3)'
        }}
      >
        {/* Crosshairs */}
        <div style={{ position: 'absolute', top: '50%', left: '-4px', right: '-4px', height: '1px', background: 'var(--accent-color)', opacity: 0.5 }} />
        <div style={{ position: 'absolute', left: '50%', top: '-4px', bottom: '-4px', width: '1px', background: 'var(--accent-color)', opacity: 0.5 }} />
        
        {/* Corner Brackets */}
        <div style={{ position: 'absolute', top: '0', left: '0', width: '6px', height: '6px', borderTop: '1.5px solid #00f5ff', borderLeft: '1.5px solid #00f5ff', transform: 'translate(-1px, -1px)' }} />
        <div style={{ position: 'absolute', top: '0', right: '0', width: '6px', height: '6px', borderTop: '1.5px solid #00f5ff', borderRight: '1.5px solid #00f5ff', transform: 'translate(1px, -1px)' }} />
        <div style={{ position: 'absolute', bottom: '0', left: '0', width: '6px', height: '6px', borderBottom: '1.5px solid #00f5ff', borderLeft: '1.5px solid #00f5ff', transform: 'translate(-1px, 1px)' }} />
        <div style={{ position: 'absolute', bottom: '0', right: '0', width: '6px', height: '6px', borderBottom: '1.5px solid #00f5ff', borderRight: '1.5px solid #00f5ff', transform: 'translate(1px, 1px)' }} />
      </motion.div>

      {/* Coordinate Display */}
      <motion.div
        style={{
          position: 'absolute',
          left: '20px',
          top: '20px',
          fontFamily: 'monospace',
          fontSize: '0.6rem',
          color: '#00f5ff',
          opacity: 0.6,
          pointerEvents: 'none',
          x: springX,
          y: springY,
          whiteSpace: 'nowrap'
        }}
      >
        X_{Math.round(mousePosition.x)} Y_{Math.round(mousePosition.y)}
      </motion.div>

      {/* Central Dot */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '4px',
          height: '4px',
          background: '#00f5ff',
          borderRadius: '50%',
          boxShadow: '0 0 10px #00f5ff',
          translateX: '-50%',
          translateY: '-50%',
          x: springX,
          y: springY
        }}
      />
    </div>
  );
};

export default CustomCursor;

