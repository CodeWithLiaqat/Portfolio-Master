import { useState, useRef, Suspense } from 'react';
import { useSmoothScroll } from '@/motion/scroll';
import { useSEO } from '@/lib/seo';
import { useJsonLd, buildService, buildBreadcrumb, buildFAQPage } from '@/lib/jsonld';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { childServices, caseStudies, insights } from '@/content/data';
import { Link, useLocation } from 'wouter';
import NotFound from '@/app/NotFound';
import { MagneticButton } from '@/components/common/MagneticButton';
import { CoverScene } from '@/three/scenes/CoverScene';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useThemeStore } from '@/stores/theme';

export function ChildServiceDetail() {
  useSmoothScroll();
  const [location, setLocation] = useLocation();
  const { theme } = useThemeStore();

  // Derive slug from URL path — static routes don't populate useParams()
  const slug = location.split('/').filter(Boolean).pop() ?? '';
  const service = childServices.find(s => s.slug === slug);

  const accentColorMap: Record<string, string> = {
    aurum: '#E8C47C',
    iris: '#8B93F8',
    garnet: '#D14D66',
  };
  const accentColor = accentColorMap[theme] ?? '#8B93F8';

  useSEO({
    title: service ? service.title : 'Mobile App Development',
    description: service ? service.metaDescription : 'Bespoke mobile app development from CODEICS.',
    canonicalPath: `/services/${slug}`,
  });

  useJsonLd(
    `child-service-${slug || 'unknown'}`,
    service
      ? [
          buildService({
            name: service.title,
            description: service.description,
            slug: service.slug,
          }),
          buildBreadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.parentTitle, path: `/services/${service.parentSlug}` },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
          buildFAQPage(service.faqs),
        ]
      : [],
  );

  const processRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useGSAP(() => {
    if (!processRef.current || !lineRef.current) return;
    const nodes = gsap.utils.toArray('.process-node', processRef.current);

    gsap.to(lineRef.current, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: processRef.current,
        start: 'top 70%',
        end: 'bottom 70%',
        scrub: 1,
      },
    });

    nodes.forEach((node: any, i) => {
      const fill = node.querySelector('.node-fill');
      const label = node.querySelector('.node-label');
      gsap.to([fill, label], {
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: processRef.current,
          start: `top ${70 - i * 15}%`,
          end: `top ${70 - i * 15 - 10}%`,
          scrub: 1,
        },
      });
    });
  }, { scope: processRef });

  if (!service) return <NotFound />;

  const relatedStudy =
    caseStudies.find(c => c.slug === service.relatedCaseStudySlug) ?? caseStudies[0];
  const relatedInsight =
    insights.find(i => i.slug === service.relatedInsightSlug) ?? insights[0];

  // Sibling child services under the same parent
  const siblings = childServices.filter(
    cs => cs.parentSlug === service.parentSlug && cs.slug !== service.slug,
  );

  return (
    <div className="bg-bg-0 min-h-screen text-text-main relative">
      <Cursor />
      <Nav />

      <main id="main-content" className="pt-48 pb-32 max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Hero ── */}
        <header className="mb-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            {/* 3-level breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-mono text-text-2 mb-8">
              <Link href="/services" className="hover:text-text-main transition-colors">Services</Link>
              <span aria-hidden="true">›</span>
              <Link href={`/services/${service.parentSlug}`} className="hover:text-text-main transition-colors">
                {service.parentTitle}
              </Link>
              <span aria-hidden="true">›</span>
              <span className="text-text-main">{service.title}</span>
            </nav>

            <h1 className="text-fluid-display font-bold mb-8 leading-[0.95] max-w-xl">
              {service.title}
            </h1>
            <p className="text-3xl font-display text-accent max-w-xl leading-tight mb-12">
              {service.promise}
            </p>
            <p className="text-xl text-text-2 max-w-2xl leading-relaxed mb-12">
              {service.description}
            </p>
            <MagneticButton onClick={() => setLocation('/contact')}>
              Discuss your app
            </MagneticButton>
          </div>

          {/* CoverScene canvas */}
          <div
            className="md:col-span-5 relative h-[380px] md:h-[480px] rounded-[2rem] overflow-hidden bg-surface"
            aria-hidden="true"
          >
            <Suspense fallback={null}>
              <CoverScene variant={service.coverVariant} accentColor={accentColor} />
            </Suspense>
          </div>
        </header>

        {/* ── Process Timeline ── */}
        <section
          ref={processRef}
          className="mb-32 py-24 bg-surface rounded-[2rem] px-8 md:px-16 overflow-hidden"
        >
          <h2 className="text-3xl font-display mb-24">The Execution</h2>
          <div className="relative max-w-4xl mx-auto px-4 h-32 flex items-center">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-surface-2" />
            <svg
              className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 overflow-visible pointer-events-none"
              preserveAspectRatio="none"
            >
              <path
                ref={lineRef}
                d="M 0,0 L 10000,0"
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10000"
                strokeDashoffset="10000"
              />
            </svg>
            <div className="relative w-full flex justify-between items-center z-10">
              {[
                { n: '01', t: 'Discovery' },
                { n: '02', t: 'Build' },
                { n: '03', t: 'Launch' },
              ].map(step => (
                <div key={step.n} className="process-node flex flex-col items-center group">
                  <div className="w-10 h-10 rounded-full bg-surface-2 border-2 border-surface flex items-center justify-center relative">
                    <div className="node-fill absolute inset-0 rounded-full bg-accent scale-0 opacity-0 transition-transform duration-300 shadow-[0_0_15px_var(--color-glow)]" />
                    <span className="relative z-10 text-xs font-mono text-bg-0 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                      {step.n}
                    </span>
                  </div>
                  <span className="node-label text-sm uppercase tracking-widest mt-6 opacity-0 translate-y-2">
                    {step.t}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Deliverables & Case Study ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 py-16 border-y border-border-main mb-32">
          <div>
            <h2 className="text-3xl font-display mb-12">Core Deliverables</h2>
            <ul className="space-y-6">
              {service.deliverables.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 border-b border-border-main pb-6 group"
                >
                  <div className="w-2 h-2 rounded-full bg-text-2 group-hover:bg-accent transition-colors flex-shrink-0" />
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
              <MagneticButton
                variant="secondary"
                onClick={() => setLocation(`/portfolio/${relatedStudy.slug}`)}
              >
                Read Case Study
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* ── Related Insight ── */}
        <section className="mb-32">
          <h2 className="text-2xl font-display mb-8">Further Reading</h2>
          <Link
            href={`/insights/${relatedInsight.slug}`}
            className="group flex flex-col md:flex-row gap-8 p-8 bg-surface rounded-[1.5rem] border border-border-main hover:border-accent/50 transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_color-mix(in_oklab,_var(--color-accent)_6%,_transparent),_transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" aria-hidden="true" />
            <div className="relative z-10">
              <p className="text-eyebrow text-accent mb-3">{relatedInsight.category}</p>
              <h3 className="text-2xl font-display mb-4 group-hover:text-accent transition-colors leading-snug">
                {relatedInsight.title}
              </h3>
              <p className="text-text-2 leading-relaxed max-w-2xl">{relatedInsight.excerpt}</p>
              <span className="inline-block mt-6 text-sm font-mono uppercase tracking-wider text-text-main border-b border-text-main pb-1 group-hover:text-accent group-hover:border-accent transition-colors">
                Read Article →
              </span>
            </div>
          </Link>
        </section>

        {/* ── Sibling platforms ── */}
        {siblings.length > 0 && (
          <section className="mb-32">
            <h2 className="text-2xl font-display mb-8">Related Platforms</h2>
            <div className="flex flex-wrap gap-4">
              {siblings.map(sib => (
                <Link
                  key={sib.slug}
                  href={`/services/${sib.slug}`}
                  className="group flex items-center gap-3 px-6 py-4 rounded-full border border-border-main hover:border-accent bg-surface hover:bg-surface-2 transition-all duration-300 text-sm font-mono uppercase tracking-wider"
                >
                  <span className="group-hover:text-accent transition-colors">{sib.shortTitle} App Development</span>
                  <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Engagement Modes ── */}
        <section className="mb-32">
          <h2 className="text-2xl font-display mb-8">Available Engagement Modes</h2>
          <div className="flex flex-wrap gap-4">
            {['Fixed Project', 'Monthly Retainer', 'Venture Partnership'].map(model => (
              <span
                key={model}
                className="px-6 py-3 rounded-full border border-border-main font-mono text-sm uppercase tracking-wider"
              >
                {model}
              </span>
            ))}
          </div>
        </section>

        {/* ── FAQ Accordion ── */}
        <section className="mb-32">
          <h2 className="text-3xl font-display mb-12">Frequently Asked Questions</h2>
          <div className="divide-y divide-border-main">
            {service.faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="w-full text-left py-6 flex justify-between items-start gap-8 group"
                >
                  <span className="text-lg font-display leading-snug group-hover:text-accent transition-colors">
                    {faq.q}
                  </span>
                  <span
                    className="text-accent font-mono text-xl flex-shrink-0 transition-transform duration-300"
                    style={{ transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <p className="pb-8 text-text-2 leading-relaxed max-w-3xl">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="text-center bg-surface py-32 rounded-[2rem]">
          <h2 className="text-4xl font-display mb-4">Ready to build your {service.shortTitle} app?</h2>
          <p className="text-text-2 text-xl mb-12 max-w-xl mx-auto">
            Tell us what you are building. We read every message and reply within one business day.
          </p>
          <MagneticButton onClick={() => setLocation('/contact')}>Start a conversation</MagneticButton>
        </section>
      </main>

      <Footer />
    </div>
  );
}
