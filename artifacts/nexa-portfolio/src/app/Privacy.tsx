import { useSmoothScroll } from '@/motion/scroll';
import { useSEO } from '@/lib/seo';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';

export function Privacy() {
  useSmoothScroll();
  useSEO({
    title: 'Privacy Policy',
    description: 'How CODEICS handles your data, cookies, and personal information.',
    canonicalPath: '/legal/privacy',
  });

  return (
    <div className="bg-bg-0 min-h-screen text-text-main">
      <Cursor />
      <Nav />

      <main id="main-content" className="pt-48 pb-32 max-w-3xl mx-auto px-6">
        <header className="mb-16 border-b border-border-main pb-12">
          <h1 className="text-5xl font-display font-bold mb-6 leading-tight">Privacy Policy</h1>
          <p className="text-eyebrow text-text-2">Last Updated: February 2026</p>
        </header>

        <article className="prose prose-invert prose-lg max-w-[65ch] text-text-main prose-headings:font-display prose-headings:text-text-main prose-a:text-accent">
          <p>We believe privacy is a fundamental right. We collect only what we need to run our business, and we protect it fiercely. We do not sell your data. We do not use deceptive tracking patterns.</p>
          
          <h2>1. Information We Collect</h2>
          <p>When you use our website or contact us, we may collect the following:</p>
          <ul>
            <li><strong>Contact Information:</strong> Name, email address, and any information you provide in your project inquiry.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, and anonymous usage statistics to monitor our site's performance (like WebGL framerates).</li>
          </ul>

          <h2>2. How We Use Information</h2>
          <p>We use your information exclusively to:</p>
          <ul>
            <li>Respond to your inquiries and map out potential projects.</li>
            <li>Provide you with technical support or updates regarding an ongoing engagement.</li>
            <li>Maintain the security and performance of our digital infrastructure.</li>
          </ul>

          <h2>3. Data Retention</h2>
          <p>We retain your information only as long as necessary to fulfill the purposes outlined above, or as required by law. If you wish to have your data removed from our systems, simply email us at <a href="mailto:hello@codeics.com">hello@codeics.com</a>.</p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
