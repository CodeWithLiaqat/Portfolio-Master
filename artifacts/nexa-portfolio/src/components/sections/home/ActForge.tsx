import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { services, childServices } from '@/content/data';
import { useThemeStore } from '@/stores/theme';

export function ActForge() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setTheme } = useThemeStore();

  useGSAP(() => {
    if (!containerRef.current) return;
    const panels = gsap.utils.toArray('.service-panel') as HTMLElement[];
    
    // Change theme to iris when this section hits
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => setTheme('iris', 'cinematic'),
      onLeaveBack: () => setTheme('aurum', 'cinematic'),
    });

    panels.forEach((panel, i) => {
      if (i === panels.length - 1) return;
      
      gsap.to(panel, {
        scale: 0.95,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: panels[i + 1],
          start: "top bottom",
          end: "top top",
          scrub: true,
        }
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative z-10 bg-bg-0 pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="text-fluid-h2">The Forge</h2>
        <p className="text-fluid-body text-text-2 mt-4 max-w-xl">What we build.</p>
      </div>

      <div ref={containerRef} className="relative w-full">
        {services.map((service, index) => (
          <div 
            key={service.slug} 
            className="service-panel sticky top-0 w-full min-h-[80vh] flex items-center bg-bg-0 border-t border-border-main will-change-transform"
            style={{ zIndex: index }}
          >
            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-8">
                <span className="text-eyebrow mb-8 block">0{index + 1}</span>
                <h3 className="text-fluid-display font-medium mb-6 leading-none">{service.title}</h3>
                <p className="text-2xl text-text-2 mb-12 max-w-2xl">{service.promise}</p>
                <a href={`/services/${service.slug}`} className="text-text-main font-mono uppercase tracking-wider text-sm pb-1 relative group inline-block">
                  Explore
                  <span className="absolute left-0 bottom-0 w-full h-[1px] bg-text-main origin-left scale-x-100 transition-transform duration-500 group-hover:scale-x-0" />
                  <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent origin-right scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                </a>
                {/* Child platform chips — only on Mobile Applications */}
                {service.slug === 'mobile-applications' && (
                  <div className="flex gap-3 mt-6">
                    {childServices
                      .filter(cs => cs.parentSlug === 'mobile-applications')
                      .map(cs => (
                        <a
                          key={cs.slug}
                          href={`/services/${cs.slug}`}
                          className="px-4 py-1.5 rounded-full border border-accent/40 font-mono text-xs uppercase tracking-wider text-text-2 hover:text-accent hover:border-accent transition-all duration-300"
                        >
                          {cs.shortTitle}
                        </a>
                      ))}
                  </div>
                )}
              </div>
              <div className="md:col-span-4 flex items-center justify-center">
                {/* Fallback for micro-artifact visually */}
                <div className="w-48 h-48 rounded-full border border-accent/20 bg-gradient-to-tr from-accent/5 to-transparent blur-sm mix-blend-screen" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
