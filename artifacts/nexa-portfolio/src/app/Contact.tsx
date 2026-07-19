import { useRef, useState } from 'react';
import { useSmoothScroll } from '@/motion/scroll';
import { useSEO } from '@/lib/seo';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { useLocation } from 'wouter';

export function Contact() {
  useSmoothScroll();
  useSEO({
    title: 'Start a Project — Contact NEXA',
    description: 'Reach out to NEXA to discuss your project. We read every message and reply within one business day. Proposals within 48 hours.',
    canonicalPath: '/contact',
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setStatus('loading');
    // Announce loading state to screen readers via aria-live (set on status region)
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        formRef.current.reset();
        setStatus('success');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="bg-bg-0 min-h-screen text-text-main relative">
      <Cursor />
      <Nav />
      
      {/* Background glow to simulate beacon */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <main id="main-content" className="pt-48 pb-32 max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-24 text-center max-w-3xl mx-auto">
          <h1 className="text-fluid-display font-bold mb-8 leading-[0.95]">Initiate a project.</h1>
          <p className="text-xl text-text-2">We read every message today, reply within one business day, and can provide a proposal within 48 hours.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            {/* aria-live region so screen readers announce status changes */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {status === 'loading' && 'Sending your message…'}
              {status === 'success' && 'Message received. We will be in touch within one business day.'}
              {status === 'error' && 'Transmission failed. Please try again or email us directly.'}
            </div>
            <div className="glass-panel p-8 md:p-12 rounded-[24px]">
              {status === 'success' ? (
                <div className="text-center py-16">
                  <h3 className="text-3xl font-display mb-4 text-success">Message Received.</h3>
                  <p className="text-text-2 mb-8">We will review your inquiry and be in touch within one business day.</p>
                  <button onClick={() => setLocation('/')} className="text-sm font-mono uppercase tracking-wider text-text-main border-b border-text-main pb-1 hover:text-accent hover:border-accent transition-colors">Return Home</button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col">
                      <label htmlFor="name" className="text-eyebrow mb-2">Name</label>
                      <input required id="name" name="name" type="text" className="bg-transparent border-b border-border-main py-3 focus:outline-none focus:border-accent transition-colors" placeholder="Your name" />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-eyebrow mb-2">Email</label>
                      <input required id="email" name="email" type="email" className="bg-transparent border-b border-border-main py-3 focus:outline-none focus:border-accent transition-colors" placeholder="your@email.com" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <label htmlFor="type" className="text-eyebrow mb-2">Project Type</label>
                    <select id="type" name="type" className="bg-transparent border-b border-border-main py-3 focus:outline-none focus:border-accent transition-colors appearance-none rounded-none">
                      <option className="bg-surface text-text-main" value="AI Web App">AI Web App</option>
                      <option className="bg-surface text-text-main" value="Premium Landing Page">Premium Landing Page</option>
                      <option className="bg-surface text-text-main" value="Ecommerce">Ecommerce</option>
                      <option className="bg-surface text-text-main" value="Other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="message" className="text-eyebrow mb-2">Project Details</label>
                    <textarea required id="message" name="message" rows={5} className="bg-transparent border-b border-border-main py-3 focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Budget, timeline, vision..."></textarea>
                  </div>

                  {status === 'error' && (
                    <p className="text-error text-sm font-mono mb-2">Transmission failed. Please try again or email us directly.</p>
                  )}

                  <button type="submit" disabled={status === 'loading'} className="bg-accent text-bg-0 py-4 rounded-full font-mono uppercase tracking-wider hover:opacity-90 transition-opacity mt-4 disabled:opacity-50">
                    {status === 'loading' ? 'Transmitting...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-16">
            <div>
              <h3 className="text-eyebrow mb-6">Direct Channels</h3>
              <div className="space-y-4 text-lg">
                <p>Email: <a href="mailto:hello@nexa.studio" className="text-accent hover:underline">hello@nexa.studio</a></p>
                <p>Timezone: UTC+0 (London)</p>
              </div>
            </div>

            <div className="border-t border-border-main pt-8">
              <h3 className="text-eyebrow mb-6">Availability</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-success shadow-[0_0_8px_var(--color-success)]"></div>
                <span className="text-lg">Currently booking for Q3 2026</span>
              </div>
              <p className="text-text-2">We take on a maximum of two major projects simultaneously to ensure uncompromising craft.</p>
            </div>

            <div className="border-t border-border-main pt-8">
              <h3 className="text-eyebrow mb-6">Engagement Process</h3>
              <ul className="space-y-4 font-mono text-sm text-text-2">
                <li>01 → We read your message</li>
                <li>02 → 3 qualifying questions via email</li>
                <li>03 → 30-min discovery call</li>
                <li>04 → Proposal within 48 hours</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
