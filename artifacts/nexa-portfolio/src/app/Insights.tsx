import { useSmoothScroll } from '@/motion/scroll';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { insights } from '@/content/data';
import { Link } from 'wouter';

export function Insights() {
  useSmoothScroll();

  return (
    <div className="bg-bg-0 min-h-screen text-text-main">
      <Cursor />
      <Nav />

      <main className="pt-48 pb-32 max-w-7xl mx-auto px-6">
        <header className="mb-24 border-b border-border-main pb-16">
          <h1 className="text-fluid-display font-bold mb-6 leading-[0.95]">Insights</h1>
          <p className="text-xl text-text-2 max-w-2xl">Thoughts on code, craft, and the future of digital experiences.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {insights.map((insight, idx) => (
            <Link key={insight.slug} href={`/insights/${insight.slug}`} className={`group block ${idx === 0 ? 'md:col-span-12 border-b border-border-main pb-16 mb-8' : 'md:col-span-6'}`}>
              <article>
                <span className="text-eyebrow text-accent mb-4 block">{insight.date}</span>
                <h2 className={`${idx === 0 ? 'text-5xl lg:text-6xl' : 'text-3xl'} font-display mb-6 group-hover:text-accent transition-colors leading-tight`}>{insight.title}</h2>
                <p className="text-lg text-text-2 leading-relaxed">{insight.excerpt}</p>
              </article>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
