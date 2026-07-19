import { useSmoothScroll } from '@/motion/scroll';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';

export function Terms() {
  useSmoothScroll();

  return (
    <div className="bg-bg-0 min-h-screen text-text-main">
      <Cursor />
      <Nav />

      <main className="pt-48 pb-32 max-w-3xl mx-auto px-6">
        <header className="mb-16 border-b border-border-main pb-12">
          <h1 className="text-5xl font-display font-bold mb-6 leading-tight">Terms of Service</h1>
          <p className="text-eyebrow text-text-2">Last Updated: February 2026</p>
        </header>

        <article className="prose prose-invert prose-lg max-w-[65ch] text-text-main prose-headings:font-display prose-headings:text-text-main prose-a:text-accent">
          <p>By accessing or using our website and services, you agree to be bound by these Terms. If you disagree with any part of these terms, please do not use our services.</p>
          
          <h2>1. Professional Services</h2>
          <p>NEXA provides bespoke software engineering and digital design services. Detailed scopes, timelines, and deliverables for specific projects will be outlined in a separate Statement of Work (SOW) or Master Services Agreement (MSA) specific to your engagement.</p>

          <h2>2. Intellectual Property</h2>
          <p>Unless explicitly stated in an MSA, NEXA retains the rights to our underlying architectural blueprints, open-source utilities (like the GSAP + Lenis framework provided in our Lab), and internal tools. You receive full license to the final deliverable and bespoke code authored specifically for your project upon final payment.</p>

          <h2>3. Limitation of Liability</h2>
          <p>In no event shall NEXA be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our website or services.</p>

          <h2>4. Governing Law</h2>
          <p>These terms shall be governed by and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions.</p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
