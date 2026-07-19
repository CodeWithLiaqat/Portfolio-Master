import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'wouter';

/**
 * Custom cursor — disabled on touch devices and when prefers-reduced-motion is set.
 */
export function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    // Disable on reduced-motion (the animated cursor is the only value here)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button'
      );
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [location]);

  if (!visible) return null;

  return (
    <>
      {/* Inner dot — no spring, tracks precisely */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 bg-text-main rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: position.x - 4, y: position.y - 4 }}
      />
      {/* Outer ring — lagged spring */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-8 h-8 border border-text-main/50 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: position.x - 16,
          y: position.y - 16,
          borderColor: isPointer ? 'var(--accent)' : 'var(--text-main)',
        }}
        animate={{ scale: isPointer ? 1.5 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 30, mass: 0.8 }}
      />
    </>
  );
}
