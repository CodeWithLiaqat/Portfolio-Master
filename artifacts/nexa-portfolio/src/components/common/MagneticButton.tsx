import { motion, useSpring, useTransform } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';

export function MagneticButton({ 
  children, 
  className = "", 
  variant = 'primary',
  onClick
}: { 
  children: React.ReactNode; 
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.2, y: y * 0.2 });
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(position.x, springConfig);
  const y = useSpring(position.y, springConfig);

  const baseClasses = "relative inline-flex items-center justify-center overflow-hidden transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent";
  
  const variants = {
    primary: "bg-accent text-bg-0 rounded-full px-8 py-4 font-mono uppercase tracking-wider text-sm",
    secondary: "border border-accent/30 text-accent rounded-full px-8 py-4 font-mono uppercase tracking-wider text-sm hover:border-accent",
    ghost: "text-text-main font-mono uppercase tracking-wider text-sm pb-1 relative group"
  };

  if (variant === 'ghost') {
    return (
      <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
        {children}
        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-text-main origin-left scale-x-100 transition-transform duration-500 group-hover:scale-x-0" />
        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent origin-right scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
      </button>
    );
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={{ x, y }}
    >
      {variant === 'primary' && hovered && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 50px at ${cursorPos.x}px ${cursorPos.y}px, rgba(255,255,255,0.2), transparent)`
          }}
        />
      )}
      <motion.span 
        style={{ x: useTransform(x, (val) => val * 0.5), y: useTransform(y, (val) => val * 0.5) }}
        className="relative z-10"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
