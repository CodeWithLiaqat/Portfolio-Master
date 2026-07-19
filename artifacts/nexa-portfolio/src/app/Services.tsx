import { useSmoothScroll } from '@/motion/scroll';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { services } from '@/content/data';
import { Link, useLocation } from 'wouter';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MagneticButton } from '@/components/common/MagneticButton';

export function Services() {
  useSmoothScroll();
  const deckRef = useRef<HTMLDivElement>(null);
  const [_, setLocation] = useLocation();

  useGSAP(() => {
    if (!deckRef.current) return;
    const panels = gsap.utils.toArray<HTMLElement>('.service-panel');
    
    panels.forEach((panel, i) => {
      // The last panel doesn't get covered by anything
      if (i === panels.length - 1) return;

      const nextPanel = panels[i + 1];

      // As the NEXT panel scrolls over the CURRENT panel,
      // the CURRENT panel scales down and fades.
      gsap.to(panel, {
        scale: 0.95,
        opacity: 0.6,
        ease: "none",
        scrollTrigger: {
          trigger: nextPanel,
          start: "top bottom",
          end: "top top",
          scrub: true,
        }
      });
    });
  }, { scope: deckRef });

  return (
    <div className="bg-bg-0 min-h-screen text-text-main relative">
      <Cursor />
      <Nav />

      <main className="relative z-10">
        <header className="pt-48 pb-24 max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-fluid-display font-bold mb-6 leading-[0.95]">The Forge</h1>
          <p className="text-xl text-text-2 max-w-2xl">Specialized capabilities to build next-generation digital experiences.</p>
        </header>

        {/* Sticky Deck */}
        <div ref={deckRef} className="relative z-10 w-full mb-32">
          {services.map((service, idx) => (
            <div 
              key={service.slug} 
              className="service-panel sticky top-0 min-h-[100dvh] w-full bg-bg-0 flex items-center border-t border-border-main overflow-hidden"
              style={{ zIndex: idx }}
            >
              <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 py-24">
                  <span className="text-eyebrow text-text-2 block">0{idx + 1}</span>
                  <h2 className="text-fluid-display font-display leading-[0.95]">{service.title}</h2>
                  <p className="text-xl text-text-2 max-w-md">{service.promise}</p>
                  <div>
                    <MagneticButton variant="ghost" onClick={() => setLocation(`/services/${service.slug}`)}>
                      Explore Capability
                    </MagneticButton>
                  </div>
                </div>

                <div className="h-full min-h-[400px] flex items-center justify-center relative pointer-events-none">
                   {/* Procedural CSS Shape unique per service */}
                   <div 
                      className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] mix-blend-screen opacity-60"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, var(--color-accent), transparent 70%), 
                                     radial-gradient(circle at 70% 70%, var(--color-accent-2), transparent 70%)`,
                        borderRadius: `${30 + (idx * 5)}% ${70 - (idx * 5)}% ${40 + (idx * 8)}% ${60 - (idx * 4)}%`,
                        animation: `blob-spin ${20 + idx * 5}s linear infinite${idx % 2 === 0 ? '' : ' reverse'}`
                      }}
                   />
                   <div 
                      className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] mix-blend-screen opacity-40 blur-xl"
                      style={{
                        background: `conic-gradient(from ${idx * 45}deg, var(--color-accent), transparent, var(--color-accent-2), transparent)`,
                        animation: `blob-spin ${15 + idx * 3}s linear infinite${idx % 2 === 0 ? ' reverse' : ''}`
                      }}
                   />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Engagement Models */}
        <section className="py-32 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-display mb-16 text-center">Engagement Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Project', subtitle: 'Fixed scope. Decisive impact.', desc: 'End-to-end design and engineering for a specific initiative. Perfect for site overhauls, landing pages, and zero-to-one builds.', price: 'From £15,000' },
                { title: 'Retainer', subtitle: 'Continuous evolution.', desc: 'A dedicated block of hours each month to steadily improve your digital presence, run A/B tests, and add new capabilities.', price: 'From £4,000/mo' },
                { title: 'Partnership', subtitle: 'Technical co-founder.', desc: 'Deep technical partnership for early-stage startups. We handle the entire engineering vertical in exchange for a mix of capital and equity.', price: 'Variable' }
              ].map(model => (
                <div key={model.title} className="bg-bg-0 p-10 rounded-[2rem] border border-border-main flex flex-col h-full hover:border-accent transition-colors duration-500">
                  <h3 className="text-2xl font-display mb-2">{model.title}</h3>
                  <p className="text-sm font-mono text-accent mb-8 uppercase tracking-wider">{model.subtitle}</p>
                  <p className="text-text-2 flex-grow mb-12">{model.desc}</p>
                  <div className="pt-8 border-t border-border-main font-mono text-sm">
                    {model.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Credibility Strip */}
        <section className="py-24 border-y border-border-main overflow-hidden relative">
           <div className="whitespace-nowrap flex gap-8 items-center justify-center min-w-full">
              {['React 19', 'Three.js', 'GSAP 3', 'Next.js 15', 'TypeScript 5', 'Vercel', 'Headless Shopify', 'OpenAI API'].map((tech, i) => (
                <span key={i} className="text-xl md:text-3xl font-mono text-text-2 uppercase tracking-widest flex items-center gap-8">
                  {tech}
                  {i < 7 && <span className="w-2 h-2 rounded-full bg-accent" />}
                </span>
              ))}
           </div>
        </section>

        {/* Footer CTA */}
        <section className="py-48 text-center max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-display mb-12 leading-tight">Every great site starts with a conversation.</h2>
          <MagneticButton onClick={() => setLocation('/contact')}>
            Start a project
          </MagneticButton>
        </section>

      </main>
      <Footer />
    </div>
  );
}