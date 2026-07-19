import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ActSignal() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    
    // Variable font weight scrub
    gsap.to(titleRef.current, {
      fontWeight: 700,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "center center",
        scrub: true,
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative min-h-[200vh] py-32 px-6 z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        
        {/* Left side empty for 3D artifact space */}
        <div className="hidden lg:block pointer-events-none" />

        {/* Right side manifesto */}
        <div className="flex flex-col justify-center sticky top-[20vh] h-[60vh]">
          <h2 ref={titleRef} className="text-fluid-h2 mb-16 font-light" style={{ fontVariationSettings: '"wght" 300' }}>
            We don't build websites.<br />
            We create worlds.
          </h2>

          <div className="space-y-16">
            <div className="border-t border-border-main pt-8">
              <span className="text-eyebrow text-accent block mb-4">01 — The browser is a medium.</span>
              <p className="text-fluid-h3 font-medium mb-4">Most websites are documents. We build films, games, and stories that happen to live in URLs.</p>
            </div>
            
            <div className="border-t border-border-main pt-8">
              <span className="text-eyebrow text-accent block mb-4">02 — Craft is computable.</span>
              <p className="text-fluid-h3 font-medium mb-4">AI doesn't replace precision — it multiplies it. Every pixel, timing, and interaction is designed.</p>
            </div>

            <div className="border-t border-border-main pt-8">
              <span className="text-eyebrow text-accent block mb-4">03 — Speed is a feature.</span>
              <p className="text-fluid-h3 font-medium mb-4">Sub-second loads on 3D-heavy builds. Performance is non-negotiable, always.</p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
