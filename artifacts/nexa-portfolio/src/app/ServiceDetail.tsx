import { useSmoothScroll } from '@/motion/scroll';
import { useSEO } from '@/lib/seo';
import { useJsonLd, buildService, buildBreadcrumb } from '@/lib/jsonld';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { services, caseStudies, childServices } from '@/content/data';
import { useParams, Link, useLocation } from 'wouter';
import NotFound from '@/app/NotFound';
import { MagneticButton } from '@/components/common/MagneticButton';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function ServiceDetail() {
  useSmoothScroll();
  const [, setLocation] = useLocation();
  const params = useParams();
  const service = services.find(s => s.slug === params.slug);

  useSEO({
    title: service ? `${service.title} — Service` : 'Service',
    description: service ? service.description : 'A specialised web development service from CODEICS.',
    canonicalPath: `/services/${params.slug ?? ''}`,
  });
  useJsonLd('service-detail', service ? [
    buildService({ name: service.title, description: service.description, slug: service.slug }),
    buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: service.title, path: `/services/${service.slug}` },
    ]),
  ] : []);
  const processRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (!processRef.current || !lineRef.current) return;
    const nodes = gsap.utils.toArray('.process-node', processRef.current);
    
    gsap.to(lineRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: processRef.current,
        start: "top 70%",
        end: "bottom 70%",
        scrub: 1,
      }
    });

    nodes.forEach((node: any, i) => {
      const fill = node.querySelector('.node-fill');
      const label = node.querySelector('.node-label');
      
      gsap.to([fill, label], {
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: processRef.current,
          start: `top ${70 - (i * 15)}%`,
          end: `top ${70 - (i * 15) - 10}%`,
          scrub: 1
        }
      });
    });
  }, { scope: processRef });

  if (!service) return <NotFound />;

  // Explicit per-service mapping to the most relevant case study
  const serviceStudyMap: Record<string, string> = {
    'ai-website-development':  'luminary-ai',
    'premium-landing-pages':   'fractional',
    'ecommerce-websites':      'maison-calloway',
    'web-applications':        'apex-finance',
    'mobile-applications':     'trckr',
    'wordpress-development':   'the-correspondent',
    'headless-wordpress':      'the-correspondent',
  };
  const relatedStudySlug = serviceStudyMap[service.slug];
  const relatedStudy = (relatedStudySlug ? caseStudies.find(c => c.slug === relatedStudySlug) : undefined) ?? caseStudies[0];

  const trckr = caseStudies.find(c => c.slug === 'trckr')!

  const deliverableMap: Record<string, string[]> = {
    'ai-website-development': ['LLM Integration', 'Generative UI', 'Vector Search', 'Dynamic Personalization'],
    'ecommerce-websites': ['Headless Shopify', 'Custom Cart Flow', 'WebGL Product Configurator', 'ERP Sync'],
    'web-applications': ['React/Next.js Architecture', 'Complex State Management', 'Real-time WebSockets', 'RBAC Systems'],
    'premium-landing-pages': ['Cinematic Scroll Sequences', 'WebGL Hero Scenes', 'Lighthouse 95+ Opt', 'A/B Testing Setup'],
  };

  const deliverables = deliverableMap[service.slug] || ['Custom Architecture', 'Performant APIs', 'Accessible UI', 'Analytics Setup'];

  return (
    <div className="bg-bg-0 min-h-screen text-text-main relative">
      <Cursor />
      <Nav />

      <main id="main-content" className="pt-48 pb-32 max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-32">
          <Link href="/services" className="text-sm font-mono uppercase tracking-wider text-text-2 hover:text-text-main mb-8 inline-block">← All Capabilities</Link>
          <h1 className="text-fluid-display font-bold mb-8 leading-[0.95] max-w-5xl">{service.title}</h1>
          <p className="text-3xl font-display text-accent max-w-3xl leading-tight mb-12">{service.promise}</p>
          <p className="text-xl text-text-2 max-w-2xl leading-relaxed">{service.description}</p>
        </header>

        {/* Process Timeline */}
        <section ref={processRef} className="mb-32 py-24 bg-surface rounded-[2rem] px-8 md:px-16 overflow-hidden">
          <h2 className="text-3xl font-display mb-24">The Execution</h2>
          <div className="relative max-w-4xl mx-auto px-4 h-32 flex items-center">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-surface-2" />
            <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 overflow-visible pointer-events-none" preserveAspectRatio="none">
              <path ref={lineRef} d="M 0,0 L 10000,0" stroke="var(--color-accent)" strokeWidth="2" fill="none" strokeDasharray="10000" strokeDashoffset="10000" />
            </svg>

            <div className="relative w-full flex justify-between items-center z-10">
              {[
                { n: '01', t: 'Architecture' },
                { n: '02', t: 'Implementation' },
                { n: '03', t: 'Optimization' }
              ].map((step) => (
                <div key={step.n} className="process-node flex flex-col items-center group">
                  <div className="w-10 h-10 rounded-full bg-surface-2 border-2 border-surface flex items-center justify-center relative">
                     <div className="node-fill absolute inset-0 rounded-full bg-accent scale-0 opacity-0 transition-transform duration-300 shadow-[0_0_15px_var(--color-glow)]" />
                     <span className="relative z-10 text-xs font-mono text-bg-0 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">{step.n}</span>
                  </div>
                  <span className="node-label text-sm uppercase tracking-widest mt-6 opacity-0 translate-y-2">{step.t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deliverables & Case Study Split */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 py-16 border-y border-border-main mb-32">
          <div>
            <h2 className="text-3xl font-display mb-12">Core Deliverables</h2>
            <ul className="space-y-6">
              {deliverables.map((item, i) => (
                <li key={i} className="flex items-center gap-4 border-b border-border-main pb-6 group">
                  <div className="w-2 h-2 rounded-full bg-text-2 group-hover:bg-accent transition-colors"></div>
                  <span className="text-xl group-hover:text-accent transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-eyebrow text-accent mb-6">Proven In Production</h3>
              <h4 className="text-3xl font-display mb-4">{relatedStudy.title}</h4>
              <p className="text-text-2 mb-8">{relatedStudy.challenge}</p>
            </div>
            <div>
              <div className="font-mono text-2xl text-accent mb-8">{relatedStudy.metric}</div>
              <MagneticButton variant="secondary" onClick={() => setLocation(`/portfolio/${relatedStudy.slug}`)}>
                Read Case Study
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* TRCKR Featured Callout — only for Mobile Applications */}
        {service.slug === 'mobile-applications' && trckr && (
          <section className="mb-32">
            <h2 className="text-2xl font-display mb-3">Featured Native Build</h2>
            <p className="text-text-2 mb-10 max-w-2xl">See what a production-grade cross-platform native app looks like in practice.</p>
            <Link
              href={`/portfolio/${trckr.slug}`}
              className="group relative flex flex-col md:flex-row gap-0 bg-surface rounded-[2rem] border border-border-main hover:border-accent/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_color-mix(in_oklab,_var(--color-accent)_8%,_transparent),_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" aria-hidden="true" />
              {/* Text side */}
              <div className="relative z-10 flex flex-col justify-between p-10 md:p-14 md:w-1/2">
                <div>
                  <span className="text-eyebrow text-accent mb-4 block">Case Study — Native App</span>
                  <h3 className="text-4xl font-display mb-4 group-hover:text-accent transition-colors">{trckr.title}</h3>
                  <p className="text-text-2 leading-relaxed mb-8 max-w-md">{trckr.challenge}</p>
                </div>
                <div>
                  <div className="font-mono text-3xl text-accent mb-8">{trckr.metric}</div>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {trckr.stack.slice(0, 4).map(t => (
                      <span key={t} className="px-3 py-1 rounded-full border border-border-main font-mono text-xs uppercase tracking-wider text-text-2">{t}</span>
                    ))}
                  </div>
                  <span className="text-sm font-mono uppercase tracking-wider text-text-main border-b border-text-main pb-1 group-hover:text-accent group-hover:border-accent transition-colors">
                    Read Case Study →
                  </span>
                </div>
              </div>
              {/* Visual side */}
              <div className="relative md:w-1/2 min-h-[280px] md:min-h-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-transparent z-10 pointer-events-none hidden md:block" />
                <img
                  src={trckr.image}
                  alt={`${trckr.title} app preview`}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                />
              </div>
            </Link>
          </section>
        )}

        {/* Specialized Platforms — only for Mobile Applications */}
        {service.slug === 'mobile-applications' && (() => {
          const mobileChildren = childServices.filter(cs => cs.parentSlug === 'mobile-applications');
          return mobileChildren.length > 0 ? (
            <section className="mb-32">
              <h2 className="text-2xl font-display mb-8">Specialized Platforms</h2>
              <p className="text-text-2 mb-10 max-w-2xl">Need a dedicated native experience for a specific platform? We offer focused iOS and Android development services in addition to cross-platform builds.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mobileChildren.map(cs => (
                  <a
                    key={cs.slug}
                    href={`/services/${cs.slug}`}
                    className="group relative flex flex-col gap-4 p-8 bg-surface rounded-[1.5rem] border border-border-main hover:border-accent/50 transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_color-mix(in_oklab,_var(--color-accent)_6%,_transparent),_transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" aria-hidden="true" />
                    <div className="relative z-10">
                      <span className="text-eyebrow text-accent mb-3 block">{cs.shortTitle}</span>
                      <h3 className="text-2xl font-display mb-3 group-hover:text-accent transition-colors">{cs.title}</h3>
                      <p className="text-text-2 leading-relaxed mb-6">{cs.description}</p>
                      <span className="text-sm font-mono uppercase tracking-wider text-text-main border-b border-text-main pb-1 group-hover:text-accent group-hover:border-accent transition-colors">
                        Explore →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ) : null;
        })()}

        {/* Models */}
        <section className="mb-32">
          <h2 className="text-2xl font-display mb-8">Available Engagement Modes</h2>
          <div className="flex flex-wrap gap-4">
            {['Fixed Project', 'Monthly Retainer', 'Venture Partnership'].map(model => (
              <span key={model} className="px-6 py-3 rounded-full border border-border-main font-mono text-sm uppercase tracking-wider">{model}</span>
            ))}
          </div>
        </section>

        <section className="text-center bg-surface py-32 rounded-[2rem]">
          <h2 className="text-4xl font-display mb-8">Ready to architect your solution?</h2>
          <MagneticButton onClick={() => setLocation('/contact')}>Start a conversation</MagneticButton>
        </section>

      </main>
      <Footer />
    </div>
  );
}