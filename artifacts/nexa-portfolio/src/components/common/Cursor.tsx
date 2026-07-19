import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';
import { useLocation } from 'wouter';

export function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button'
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [location]);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(position.x, springConfig);
  const cursorY = useSpring(position.y, springConfig);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-text-main rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: position.x - 4,
          y: position.y - 4,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-text-main/50 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: useSpring(position.x - 16, { damping: 30, stiffness: 200, mass: 0.8 }),
          y: useSpring(position.y - 16, { damping: 30, stiffness: 200, mass: 0.8 }),
          scale: isPointer ? 1.5 : 1,
          borderColor: isPointer ? 'var(--accent)' : 'var(--text-main)',
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
        }}
      />
    </>
  );
}
