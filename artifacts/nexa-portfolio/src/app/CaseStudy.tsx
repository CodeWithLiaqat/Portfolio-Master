import { useSmoothScroll } from '@/motion/scroll';
import { useSEO } from '@/lib/seo';
import { useJsonLd, buildBreadcrumb } from '@/lib/jsonld';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { caseStudies } from '@/content/data';
import { useParams, Link } from 'wouter';
import NotFound from '@/app/NotFound';
import { MagneticButton } from '@/components/common/MagneticButton';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { revealImage } from '@/motion/reveals';

gsap.registerPlugin(ScrollTrigger);

export function CaseStudy() {
  useSmoothScroll();
  const params = useParams();
  const study = caseStudies.find(s => s.slug === params.slug);
  const heroWrapRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  useSEO({
    title: study ? `${study.title} — Case Study` : 'Case Study',
    description: study ? study.approach.slice(0, 155) : 'A case study from the CODEICS studio.',
    canonicalPath: `/portfolio/${params.slug ?? ''}`,
  });
  useJsonLd('casestudy-bc', buildBreadcrumb([
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: study?.title ?? 'Case Study', path: `/portfolio/${params.slug ?? ''}` },
  ]));

  // Tier 2: clip-path entry reveal + scroll parallax
  useGSAP(() => {
    if (!heroImgRef.current || !heroWrapRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Entry reveal
    revealImage(heroWrapRef.current);

    if (reduced) return;

    // Scale image to 1.12 so edges stay hidden during parallax
    gsap.set(heroImgRef.current, { scale: 1.12 });

    // ±8% translateY scrubbed by scroll
    gsap.fromTo(heroImgRef.current,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: heroWrapRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );
  }, { dependencies: [study?.slug] });

  if (!study) return <NotFound />;

  return (
    <div className="bg-bg-0 min-h-screen text-text-main">
      <Cursor />
      <Nav />

      <main id="main-content" className="pt-48 pb-32 max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-eyebrow text-accent">Case Study</span>
            {study.featured && (
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/30 tracking-wider uppercase">Live</span>
            )}
          </div>
          <h1 className="text-fluid-display font-bold mb-8 leading-[0.95]">{study.title}</h1>
          <div className="flex justify-center gap-8 text-sm font-mono uppercase tracking-wider text-text-2 flex-wrap">
            <span>Metric: <strong className="text-text-main">{study.metric}</strong></span>
            <span>Category: <strong className="text-text-main">{study.category}</strong></span>
          </div>
        </header>

        {/* Hero image — Tier 2: clip-path entry reveal + scroll parallax */}
        <div
          ref={heroWrapRef}
          className="w-full aspect-[21/9] bg-surface rounded-2xl overflow-hidden mb-32 relative"
        >
          <img
            ref={heroImgRef}
            src={study.image}
            alt={`${study.title} — project screenshot`}
            className="w-full h-full object-cover"
            loading="lazy"
            width="1400"
            height="600"
          />
          {/* Standard scrim — future text safety */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, color-mix(in oklab, var(--bg-0) 35%, transparent) 0%, transparent 50%)',
            }}
            aria-hidden="true"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-32">
          <div className="md:col-span-4">
            <h2 className="text-eyebrow mb-6">The Challenge</h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-3xl font-display leading-tight">{study.challenge}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-32 border-t border-border-main pt-32">
          <div className="md:col-span-4">
            <h2 className="text-eyebrow mb-6">The Approach</h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-xl leading-relaxed text-text-2 mb-12">{study.approach}</p>
            <h3 className="text-eyebrow mb-4">Technology Stack</h3>
            <div className="flex flex-wrap gap-3">
              {study.stack.map(tech => (
                <span key={tech} className="px-4 py-2 rounded-full border border-border-main text-sm font-mono">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-48 border-t border-border-main pt-32">
          <div className="md:col-span-4">
            <h2 className="text-eyebrow mb-6">The Outcome</h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-3xl font-display leading-tight text-accent">{study.outcome}</p>
          </div>
        </div>

        {/* Live site CTA */}
        {study.liveUrl && (
          <div className="mb-32 text-center border border-border-main rounded-3xl p-12 md:p-16 bg-surface/50">
            <p className="text-eyebrow text-text-2 mb-4">See it live</p>
            <p className="text-xl text-text-2 mb-10 max-w-md mx-auto">This project is deployed and serving real customers.</p>
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <MagneticButton variant="primary">Visit {study.title} →</MagneticButton>
            </a>
          </div>
        )}

        <div className="text-center border-t border-border-main pt-32">
          <p className="text-eyebrow mb-8">Next Project</p>
          <Link href="/portfolio" className="text-4xl font-display hover:text-accent transition-colors">Return to Portfolio</Link>
        </div>

      </main>
      <Footer />
    </div>
  );
}
