import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function ActConstellation() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const counters = gsap.utils.toArray('.stat-counter') as HTMLElement[];
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');
      gsap.to(counter, {
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: "power2.out",
        scrollTrigger: {
          trigger: counter,
          start: "top 80%",
          once: true
        }
      });
    });

    const line = sectionRef.current.querySelector('.process-line');
    if (line) {
      gsap.fromTo(line, 
        { strokeDashoffset: 1000 }, 
        { 
          strokeDashoffset: 0, 
          ease: "none",
          scrollTrigger: {
            trigger: line,
            start: "top 70%",
            end: "bottom 30%",
            scrub: true
          }
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative z-10 bg-bg-0 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-fluid-h2 mb-24 text-center">Built on trust.</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-48 text-center">
          <div>
            <div className="text-5xl font-mono mb-2 flex justify-center items-end">
              <span className="stat-counter" data-target="47">0</span>
              <span className="text-3xl text-accent">+</span>
            </div>
            <p className="text-eyebrow">Projects delivered</p>
          </div>
          <div>
            <div className="text-5xl font-mono mb-2 flex justify-center items-end">
              <span className="stat-counter" data-target="97">0</span>
            </div>
            <p className="text-eyebrow">Avg. Lighthouse</p>
          </div>
          <div>
            <div className="text-5xl font-mono mb-2 flex justify-center items-end">
              <span className="stat-counter" data-target="94">0</span>
              <span className="text-3xl text-accent">%</span>
            </div>
            <p className="text-eyebrow">Client retention</p>
          </div>
          <div>
            <div className="text-5xl font-mono mb-2 flex justify-center items-end">
              <span className="stat-counter" data-target="6">0</span>
            </div>
            <p className="text-eyebrow">Years of craft</p>
          </div>
        </div>

        <div className="relative mb-48">
          <svg className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 overflow-visible" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100%" y2="0" stroke="var(--border-main)" strokeWidth="2" />
            <line className="process-line" x1="0" y1="0" x2="100%" y2="0" stroke="var(--accent)" strokeWidth="2" strokeDasharray="1000" strokeDashoffset="1000" />
          </svg>
          <div className="relative z-10 flex justify-between">
            {['Discover', 'Design', 'Build', 'Launch', 'Evolve'].map((step, i) => (
              <div key={step} className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-bg-0 border-2 border-accent mb-4 shadow-[0_0_10px_var(--glow)]" />
                <span className="text-eyebrow hidden md:block">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <blockquote className="border-l border-accent pl-8">
            <p className="text-2xl font-display mb-6">"NEXA didn't just build us a website. They engineered a digital asset that feels like a $100k physical product."</p>
            <footer className="text-text-2">— Sarah Jenkins, Founder @ Maison Calloway</footer>
          </blockquote>
          <blockquote className="border-l border-accent pl-8">
            <p className="text-2xl font-display mb-6">"The performance is ridiculous. Our complex financial dashboards now load faster than most static blogs."</p>
            <footer className="text-text-2">— Marcus Chen, CTO @ Apex Finance</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
