import { useSmoothScroll } from '@/motion/scroll';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { caseStudies } from '@/content/data';
import { Link } from 'wouter';

export function Portfolio() {
  useSmoothScroll();

  return (
    <div className="bg-bg-0 min-h-screen text-text-main relative">
      <Cursor />
      <Nav />

      <main className="pt-48 pb-32 max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-24 border-b border-border-main pb-16">
          <h1 className="text-fluid-display font-bold mb-6 leading-[0.95]">Selected Works</h1>
          <p className="text-xl text-text-2 max-w-2xl">Digital experiences that drive measurable outcomes without sacrificing uncompromising craft.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {caseStudies.map((study, idx) => (
            <Link key={study.slug} href={`/portfolio/${study.slug}`} className="group block">
              <div className="aspect-[4/3] w-full bg-surface rounded-xl overflow-hidden mb-6 relative">
                 <div className="absolute inset-0 bg-accent/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                 <img src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-3xl font-display group-hover:text-accent transition-colors">{study.title}</h2>
                <span className="font-mono text-sm px-3 py-1 rounded-full border border-border-main">{study.metric}</span>
              </div>
              <p className="text-text-2 mb-4 line-clamp-2">{study.challenge}</p>
              <div className="flex gap-2 flex-wrap">
                {study.stack.map(tech => (
                  <span key={tech} className="text-xs font-mono text-text-2 uppercase tracking-wider">{tech}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
