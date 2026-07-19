import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => setComplete(true), 500);
      }
    });

    const obj = { val: 0 };
    tl.to(obj, {
      val: 100,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => setProgress(Math.floor(obj.val))
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div 
          className="fixed inset-0 z-[999] bg-bg-0 flex items-center justify-center flex-col"
          exit={{ opacity: 0, y: '-10%', transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] } }}
        >
          <div className="relative w-full max-w-sm px-8">
            <div className="flex justify-between items-end mb-4 font-mono text-text-2">
              <span className="text-sm tracking-widest uppercase">Initializing</span>
              <span className="text-2xl text-text-main" ref={counterRef}>{progress.toString().padStart(3, '0')}</span>
            </div>
            <div className="h-[2px] w-full bg-surface relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-accent"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
