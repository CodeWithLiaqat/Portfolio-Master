import { useSmoothScroll } from '@/motion/scroll';
import { Nav } from '@/components/common/Nav';
import { Cursor } from '@/components/common/Cursor';
import { Link, useLocation } from 'wouter';
import { MagneticButton } from '@/components/common/MagneticButton';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Custom404() {
  useSmoothScroll();
  const [, setLocation] = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!mainRef.current) return;
    gsap.fromTo('.not-found-heading',
      { opacity: 0, y: 40, skewX: -4 },
      { opacity: 1, y: 0, skewX: 0, duration: 1.4, ease: 'power4.out' }
    );
    gsap.fromTo('.not-found-sub',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
    );
    gsap.fromTo('.not-found-links',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
    );
  }, { scope: mainRef });

  return (
    <div className="bg-bg-0 min-h-screen text-text-main flex flex-col items-center justify-center overflow-hidden">
      <Cursor />
      <Nav />

      {/* Background: fractured orbit rings — mimic the Artifact breaking apart */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none z-0 opacity-30">
        <div className="absolute inset-0 border border-accent/20 rounded-full rotate-[25deg] scale-y-[0.4]" />
        <div className="absolute inset-[8%] border border-accent/15 rounded-full -rotate-[15deg] scale-x-[0.6]" />
        <div className="absolute inset-[20%] border border-accent/10 rounded-full rotate-[60deg] scale-y-[0.7]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full shadow-[0_0_40px_var(--glow)]" />
      </div>

      <main ref={mainRef} className="relative z-10 text-center px-6 max-w-2xl">
        <h1 className="not-found-heading text-[20vw] md:text-[15vw] font-display font-bold leading-none mix-blend-difference mb-6 select-none tabular-nums">
          404
        </h1>

        <div className="not-found-sub mb-16 space-y-4">
          <p className="text-2xl font-display text-text-2">Lost in the void.</p>
          <p className="text-sm font-mono uppercase tracking-widest text-text-2 opacity-60">
            The page you're looking for doesn't exist — or was never built.
          </p>
        </div>

        <div className="not-found-links flex flex-col items-center gap-8">
          <MagneticButton onClick={() => setLocation('/')}>
            Return to base
          </MagneticButton>

          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-mono uppercase tracking-widest text-text-2 opacity-50">
              While you're lost, here are some anchors
            </p>
            <div className="flex gap-8">
              {[
                { label: 'Home', href: '/' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Contact', href: '/contact' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-mono uppercase tracking-wider text-text-2 hover:text-accent transition-colors underline underline-offset-4"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
