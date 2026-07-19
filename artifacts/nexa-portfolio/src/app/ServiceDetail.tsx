import { useSmoothScroll } from '@/motion/scroll';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { services } from '@/content/data';
import { useParams, Link } from 'wouter';
import NotFound from '@/pages/not-found';
import { MagneticButton } from '@/components/common/MagneticButton';

export function ServiceDetail() {
  useSmoothScroll();
  const params = useParams();
  const service = services.find(s => s.slug === params.slug);

  if (!service) return <NotFound />;

  return (
    <div className="bg-bg-0 min-h-screen text-text-main">
      <Cursor />
      <Nav />

      <main className="pt-48 pb-32 max-w-7xl mx-auto px-6">
        <header className="mb-24">
          <Link href="/services" className="text-sm font-mono uppercase tracking-wider text-text-2 hover:text-text-main mb-8 inline-block">← Back to Services</Link>
          <h1 className="text-fluid-display font-bold mb-8 leading-[0.95] max-w-5xl">{service.title}</h1>
          <p className="text-3xl font-display text-accent max-w-3xl leading-tight mb-12">{service.promise}</p>
          <p className="text-xl text-text-2 max-w-2xl leading-relaxed">{service.description}</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 py-32 border-y border-border-main mb-32">
          <div>
            <h2 className="text-3xl font-display mb-8">The Philosophy</h2>
            <p className="text-lg text-text-2 mb-6">We approach this discipline not as a checklist of features, but as an opportunity to differentiate your brand through absolute technical precision.</p>
            <p className="text-lg text-text-2">Performance, aesthetics, and reliability are not trade-offs. They are the baseline requirements for competing in a crowded digital landscape.</p>
          </div>
          <div>
            <h2 className="text-3xl font-display mb-8">Key Deliverables</h2>
            <ul className="space-y-6">
              {[
                'Bespoke Architecture Design',
                'Cinematic Motion & Interactions',
                'Sub-second Load Times',
                'Accessibility Compliance',
                'SEO Foundation'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 border-b border-border-main pb-4">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-4xl font-display mb-8">Ready to elevate your digital presence?</h2>
          <MagneticButton onClick={() => window.location.href='/contact'}>Start a project</MagneticButton>
        </section>

      </main>
      <Footer />
    </div>
  );
}
