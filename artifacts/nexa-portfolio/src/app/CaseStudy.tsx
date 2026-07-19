import { useSmoothScroll } from '@/motion/scroll';
import { useSEO } from '@/lib/seo';
import { useJsonLd, buildBreadcrumb } from '@/lib/jsonld';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { caseStudies } from '@/content/data';
import { useParams, Link } from 'wouter';
import NotFound from '@/app/NotFound';

export function CaseStudy() {
  useSmoothScroll();
  const params = useParams();
  const study = caseStudies.find(s => s.slug === params.slug);

  useSEO({
    title: study ? `${study.title} — Case Study` : 'Case Study',
    description: study ? study.approach.slice(0, 155) : 'A case study from the NEXA studio.',
    canonicalPath: `/portfolio/${params.slug ?? ''}`,
  });
  useJsonLd('casestudy-bc', buildBreadcrumb([
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: study?.title ?? 'Case Study', path: `/portfolio/${params.slug ?? ''}` },
  ]));

  if (!study) return <NotFound />;

  return (
    <div className="bg-bg-0 min-h-screen text-text-main">
      <Cursor />
      <Nav />

      <main id="main-content" className="pt-48 pb-32 max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-16 text-center">
          <span className="text-eyebrow text-accent mb-6 block">Case Study</span>
          <h1 className="text-fluid-display font-bold mb-8 leading-[0.95]">{study.title}</h1>
          <div className="flex justify-center gap-8 text-sm font-mono uppercase tracking-wider text-text-2">
             <span>Metric: <strong className="text-text-main">{study.metric}</strong></span>
          </div>
        </header>

        <div className="w-full aspect-[21/9] bg-surface rounded-2xl overflow-hidden mb-32 flex items-center justify-center relative">
          <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
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

        <div className="text-center border-t border-border-main pt-32">
           <p className="text-eyebrow mb-8">Next Project</p>
           <Link href="/portfolio" className="text-4xl font-display hover:text-accent transition-colors">Return to Portfolio</Link>
        </div>

      </main>
      <Footer />
    </div>
  );
}
