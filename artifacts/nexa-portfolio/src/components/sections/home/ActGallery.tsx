import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { caseStudies } from '@/content/data';
import { Link } from 'wouter';

export function ActGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !trackRef.current) return;
    
    // Horizontal scroll
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current;
      if (!track) return;

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative z-10 bg-bg-1 overflow-hidden md:h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 mb-12 w-full pt-16 md:pt-0">
        <h2 className="text-fluid-h2">Selected Works</h2>
      </div>

      <div className="md:flex md:w-[300vw] h-[60vh] md:h-auto overflow-x-auto md:overflow-x-visible snap-x snap-mandatory hide-scrollbar" ref={trackRef}>
        {caseStudies.slice(0, 4).map((study, idx) => (
          <div key={study.slug} className="w-[85vw] md:w-[70vw] shrink-0 snap-center px-6 inline-flex flex-col justify-center h-full group">
            <Link href={`/portfolio/${study.slug}`} className="block relative w-full aspect-[4/3] md:aspect-[16/9] mb-8 overflow-hidden rounded-lg bg-surface group-hover:elevation-2 transition-shadow duration-500">
              <div className="absolute inset-0 bg-accent/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <img src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </Link>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-eyebrow mb-2 block">0{idx + 1}</span>
                <h3 className="text-3xl font-display">{study.title}</h3>
              </div>
              <div className="text-right">
                <span className="text-eyebrow text-accent block mb-1">Metric</span>
                <p className="font-mono text-sm">{study.metric}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Progress line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border-main">
        <div className="h-full bg-accent origin-left scale-x-0" />
      </div>
    </section>
  );
}
