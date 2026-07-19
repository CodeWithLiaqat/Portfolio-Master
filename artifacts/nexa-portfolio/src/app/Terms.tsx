import { useSmoothScroll } from '@/motion/scroll';
import { useSEO } from '@/lib/seo';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { Link } from 'wouter';

export function Terms() {
  useSmoothScroll();
  useSEO({
    title: 'Terms of Service',
    description: 'NEXA\'s standard terms of engagement covering professional services, intellectual property, payment, and confidentiality.',
    canonicalPath: '/legal/terms',
  });

  const sections = [
    { id: '1', title: '1. Professional Services' },
    { id: '2', title: '2. Intellectual Property' },
    { id: '3', title: '3. Limitation of Liability' },
    { id: '4', title: '4. Payment Terms' },
    { id: '5', title: '5. Confidentiality' },
    { id: '6', title: '6. Governing Law' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-bg-0 min-h-screen text-text-main relative">
      <Cursor />
      <Nav />

      <main id="main-content" className="pt-48 pb-32 max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-24 border-b border-border-main pb-16 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[0.95]">Terms of Service</h1>
          <p className="text-eyebrow text-text-2">Last Updated: February 2026</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Sticky Nav */}
          <div className="md:col-span-4 lg:col-span-3">
             <nav className="sticky top-32">
                <ul className="space-y-4 font-mono text-sm">
                  {sections.map(s => (
                    <li key={s.id}>
                      <button onClick={() => scrollTo(`section-${s.id}`)} className="text-text-2 hover:text-accent text-left transition-colors">
                        {s.title}
                      </button>
                    </li>
                  ))}
                </ul>
             </nav>
          </div>

          {/* Content */}
          <div className="md:col-span-8 lg:col-span-9">
            <article className="prose prose-invert prose-xl max-w-[65ch] text-text-main prose-headings:font-display prose-headings:text-text-main prose-h2:mt-16 prose-h2:mb-6 prose-p:text-text-2 prose-p:leading-relaxed">
              <p className="lead text-text-main">By accessing or using our website and services, you agree to be bound by these Terms. If you disagree with any part of these terms, please do not use our services.</p>
              
              <h2 id="section-1">1. Professional Services</h2>
              <p>NEXA provides bespoke software engineering and digital design services. Detailed scopes, timelines, and deliverables for specific projects will be outlined in a separate Statement of Work (SOW) or Master Services Agreement (MSA) specific to your engagement. Timelines are estimates and subject to prompt client feedback.</p>

              <h2 id="section-2">2. Intellectual Property</h2>
              <p>Unless explicitly stated in an MSA, NEXA retains the rights to our underlying architectural blueprints, open-source utilities (like the GSAP + Lenis framework provided in our Lab), and internal tools. You receive full, irrevocable license to the final deliverable and bespoke code authored specifically for your project upon receipt of final payment.</p>

              <h2 id="section-3">3. Limitation of Liability</h2>
              <p>In no event shall NEXA be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our website or services. Our maximum liability is capped at the total fee paid for the specific project in question.</p>

              <h2 id="section-4">4. Payment Terms</h2>
              <p>Standard payment terms dictate a 50% upfront deposit to secure scheduling and commence discovery. The remaining 50% is due upon completion of the project, prior to deployment to production or code handoff. All invoices are Net-30 unless otherwise agreed. Late payments may incur a 1.5% monthly interest fee.</p>

              <h2 id="section-5">5. Confidentiality</h2>
              <p>Both parties agree to standard mutual confidentiality. We will not disclose your proprietary business logic, trade secrets, or unreleased product details. You agree not to disclose our proprietary pricing, internal processes, or architectural blueprints to third-party engineering firms. This survives the termination of any project by 3 years.</p>

              <h2 id="section-6">6. Governing Law</h2>
              <p>These terms shall be governed by and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of London.</p>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}