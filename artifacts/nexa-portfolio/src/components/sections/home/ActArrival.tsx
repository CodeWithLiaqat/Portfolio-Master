import { useRef } from 'react';
import { MagneticButton } from '@/components/common/MagneticButton';
import { useLocation } from 'wouter';
import { useGSAP } from '@gsap/react';
import { revealLines } from '@/motion/reveals';

export function ActArrival() {
  const [, setLocation] = useLocation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (titleRef.current) {
      revealLines(titleRef.current);
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex items-center justify-center pt-32 pb-24 px-6 z-10">
      <div className="max-w-7xl mx-auto w-full text-center flex flex-col items-center">
        <p className="text-eyebrow mb-8">AI WEB DEVELOPER — NEXA</p>
        
        <h1 ref={titleRef} className="text-fluid-display font-bold max-w-5xl mb-8 leading-[0.95] tracking-[-0.02em] mix-blend-difference z-20 pointer-events-none text-text-main">
          Digital experiences, engineered.
        </h1>
        
        <p className="text-fluid-body text-text-2 mb-12 max-w-2xl mix-blend-difference">
          NEXA builds AI-powered digital experiences for founders and agencies who refuse to settle for ordinary.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 items-center mix-blend-difference">
          <MagneticButton onClick={() => setLocation('/contact')}>
            Start a project
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={() => setLocation('/portfolio')}>
            View the work
          </MagneticButton>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50">
        <span className="text-[10px] font-mono tracking-widest uppercase mb-4">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-text-main to-transparent" />
      </div>
    </section>
  );
}
