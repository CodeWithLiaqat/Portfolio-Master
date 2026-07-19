import { useSmoothScroll } from '@/motion/scroll';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { services } from '@/content/data';
import { Link } from 'wouter';

export function Services() {
  useSmoothScroll();

  return (
    <div className="bg-bg-0 min-h-screen text-text-main">
      <Cursor />
      <Nav />

      <main className="pt-48 pb-32 max-w-7xl mx-auto px-6">
        <header className="mb-24 border-b border-border-main pb-16">
          <h1 className="text-fluid-display font-bold mb-6 leading-[0.95]">The Forge</h1>
          <p className="text-xl text-text-2 max-w-2xl">Specialized capabilities to build next-generation digital experiences.</p>
        </header>

        <div className="space-y-12">
          {services.map((service, idx) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="group block border-t border-border-main pt-12 hover:bg-surface/30 transition-colors -mx-6 px-6 rounded-2xl pb-12">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-1">
                  <span className="text-eyebrow text-text-2 block">0{idx + 1}</span>
                </div>
                <div className="md:col-span-5">
                  <h2 className="text-3xl font-display group-hover:text-accent transition-colors">{service.title}</h2>
                </div>
                <div className="md:col-span-5">
                  <p className="text-lg text-text-2">{service.promise}</p>
                </div>
                <div className="md:col-span-1 text-right">
                  <span className="w-10 h-10 rounded-full border border-border-main inline-flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
