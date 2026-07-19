import { useRef, useState } from 'react';
import { MagneticButton } from '@/components/common/MagneticButton';
import { useLocation } from 'wouter';

export function ActBeacon() {
  const formRef = useRef<HTMLFormElement>(null);
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setStatus('loading');
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
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center py-32 px-6 z-10 bg-transparent">
      {/* Visual beacon effect from the 3D scene handles the background */}
      <div className="max-w-4xl mx-auto w-full text-center mb-16">
        <h2 className="text-fluid-display font-bold mb-8 leading-[0.95]">Let's build what's next.</h2>
      </div>

      <div className="w-full max-w-2xl mx-auto glass-panel p-8 md:p-12 rounded-[24px]">
        {status === 'success' ? (
          <div className="text-center py-16">
            <h3 className="text-3xl font-display mb-4 text-success">Message Received.</h3>
            <p className="text-text-2 mb-8">We will review your inquiry and be in touch within one business day.</p>
            <MagneticButton variant="ghost" onClick={() => setLocation('/')}>Return Home</MagneticButton>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-eyebrow mb-2">Name</label>
                <input required id="name" name="name" type="text" className="bg-transparent border-b border-border-main py-3 focus:outline-none focus:border-accent transition-colors text-text-main" placeholder="Jane Doe" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-eyebrow mb-2">Email</label>
                <input required id="email" name="email" type="email" className="bg-transparent border-b border-border-main py-3 focus:outline-none focus:border-accent transition-colors text-text-main" placeholder="jane@example.com" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="type" className="text-eyebrow mb-2">Project Type</label>
              <select id="type" name="type" className="bg-transparent border-b border-border-main py-3 focus:outline-none focus:border-accent transition-colors text-text-main appearance-none rounded-none">
                <option value="Landing Page" className="bg-surface text-text-main">Premium Landing Page</option>
                <option value="Web App" className="bg-surface text-text-main">Web Application</option>
                <option value="Ecommerce" className="bg-surface text-text-main">Ecommerce Platform</option>
                <option value="Other" className="bg-surface text-text-main">Other</option>
              </select>
            </div>

            <div className="flex flex-col mb-8">
              <label htmlFor="message" className="text-eyebrow mb-2">Message</label>
              <textarea required id="message" name="message" rows={4} className="bg-transparent border-b border-border-main py-3 focus:outline-none focus:border-accent transition-colors text-text-main resize-none" placeholder="Tell us about your vision..."></textarea>
            </div>

            {status === 'error' && (
              <p className="text-error text-sm font-mono mb-4">Transmission failed. Please try again or email us directly.</p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <MagneticButton variant="primary">
                {status === 'loading' ? 'Transmitting...' : 'Send Inquiry'}
              </MagneticButton>
              <a href="mailto:hello@nexa.studio" className="text-sm font-mono text-text-2 hover:text-text-main transition-colors underline">or email us directly</a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
