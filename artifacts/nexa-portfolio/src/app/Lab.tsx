import { useSmoothScroll } from '@/motion/scroll';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { lab } from '@/content/data';

export function Lab() {
  useSmoothScroll();

  return (
    <div className="bg-bg-0 min-h-screen text-text-main">
      <Cursor />
      <Nav />

      <main className="pt-48 pb-32 max-w-7xl mx-auto px-6">
        <header className="mb-24 border-b border-border-main pb-16">
          <h1 className="text-fluid-display font-bold mb-6 leading-[0.95]">The Lab</h1>
          <p className="text-xl text-text-2 max-w-2xl">Experiments, open-source resources, and architectural blueprints.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lab.map((item, idx) => (
            <a key={idx} href={item.link} className="group block bg-surface rounded-[24px] p-8 hover:bg-surface-2 transition-colors border border-border-main hover:border-accent/30">
              <div className="flex justify-between items-start mb-12">
                <span className="text-eyebrow px-3 py-1 rounded-full border border-border-main">{item.type}</span>
                <span className="w-8 h-8 rounded-full border border-border-main flex items-center justify-center group-hover:bg-accent group-hover:text-bg-0 group-hover:border-accent transition-colors">↗</span>
              </div>
              <h2 className="text-2xl font-display mb-4">{item.title}</h2>
              <p className="text-text-2">{item.description}</p>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
