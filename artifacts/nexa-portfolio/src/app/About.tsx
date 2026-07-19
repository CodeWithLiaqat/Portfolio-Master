import { useSmoothScroll } from '@/motion/scroll';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { MagneticButton } from '@/components/common/MagneticButton';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLocation } from 'wouter';

export function About() {
  useSmoothScroll();
  const [, setLocation] = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const toolsRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!processRef.current || !lineRef.current) return;
    
    const nodes = gsap.utils.toArray('.process-node', processRef.current);
    
    // Animate the line drawing
    gsap.to(lineRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: processRef.current,
        start: "top 60%",
        end: "bottom 60%",
        scrub: 1,
      }
    });

    // Light up nodes as the line passes them
    nodes.forEach((node: any, i) => {
      const fill = node.querySelector('.node-fill');
      const label = node.querySelector('.node-label');
      
      gsap.to([fill, label], {
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: processRef.current,
          start: `top ${60 - (i * 10)}%`,
          end: `top ${60 - (i * 10) - 10}%`,
          scrub: 1
        }
      });
    });
  }, { scope: processRef });

  useGSAP(() => {
    if (!toolsRef.current) return;
    const labels = gsap.utils.toArray('.tool-label', toolsRef.current);
    if (!labels.length) return;
    gsap.fromTo(labels,
      { opacity: 0, y: 20 },
      { 
        opacity: 0.6, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.05,
        scrollTrigger: {
          trigger: toolsRef.current,
          start: 'top 80%'
        }
      }
    );
  }, { scope: toolsRef });

  return (
    <div className="bg-bg-0 min-h-screen text-text-main relative">
      <Cursor />
      <Nav />

      <main className="pt-48 pb-32 max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-32">
          <h1 className="text-fluid-display font-bold mb-8 leading-[0.95]">An independent AI web developer based in London.</h1>
          <div className="w-full aspect-video bg-surface rounded-2xl overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent mix-blend-overlay z-10"></div>
             <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Abstract Concept" className="w-full h-full object-cover mix-blend-luminosity" />
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-48">
          <div className="md:col-span-4">
            <h2 className="text-2xl font-display sticky top-32">Origin Story</h2>
          </div>
          <div className="md:col-span-8">
            <div className="space-y-16 border-l border-border-main pl-8 relative">
              {[
                { year: 2018, text: "Started building functional web tools. Learned the rules of the DOM." },
                { year: 2020, text: "Moved into WebGL and creative frontend. Realized performance is a design feature." },
                { year: 2022, text: "Lead engineer at a boutique studio. Delivered 40+ SOTD level projects." },
                { year: 2024, text: "Founded NEXA. Embraced AI as a multiplier for craft." },
                { year: 2026, text: "Operating at the bleeding edge of the cinematic web." }
              ].map((item) => (
                <div key={item.year} className="relative">
                  <div className="absolute w-3 h-3 rounded-full bg-accent -left-[38px] top-1 shadow-[0_0_10px_var(--glow)]"></div>
                  <span className="text-eyebrow text-accent mb-2 block">{item.year}</span>
                  <p className="text-xl">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-48">
          <h2 className="text-fluid-h2 mb-16 text-center">Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: "01", title: "Craft without compromise", text: "We do not ship 'good enough'. Every animation curve is bespoke. Every state is designed." },
              { num: "02", title: "Engineering with intent", text: "Complex architecture must serve a purpose. If a 3D scene doesn't tell the story better, we don't use it." },
              { num: "03", title: "AI as a multiplier", text: "AI writes the boilerplate; we direct the art. It allows us to spend 90% of our time on the final 10% of polish." }
            ].map(item => (
              <div key={item.num} className="border-t border-border-main pt-8">
                <span className="text-4xl font-display text-text-2 mb-4 block">{item.num}</span>
                <h3 className="text-2xl font-display mb-4">{item.title}</h3>
                <p className="text-text-2">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section ref={processRef} className="mb-48 overflow-hidden">
          <h2 className="text-3xl font-display mb-24 text-center">Process</h2>
          <div className="relative max-w-5xl mx-auto px-4 h-32 flex items-center">
            {/* Background Track Line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-surface-2" />
            
            {/* Animated Draw Line */}
            <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 overflow-visible pointer-events-none" preserveAspectRatio="none">
              <path 
                ref={lineRef}
                d="M 0,0 L 10000,0" 
                stroke="var(--color-accent)" 
                strokeWidth="2" 
                fill="none" 
                strokeDasharray="10000" 
                strokeDashoffset="10000"
              />
            </svg>

            {/* Nodes */}
            <div className="relative w-full flex justify-between items-center z-10">
              {['Discovery', 'Strategy', 'Design', 'Build', 'Evolve'].map((step, idx) => (
                <div key={step} className="process-node flex flex-col items-center group">
                  <div className="w-8 h-8 rounded-full bg-surface-2 border-2 border-surface flex items-center justify-center relative">
                     <div className="node-fill absolute inset-0 rounded-full bg-accent scale-0 opacity-0 transition-transform duration-300 shadow-[0_0_15px_var(--color-glow)]" />
                     <span className="relative z-10 text-xs font-mono text-bg-0 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">{idx + 1}</span>
                  </div>
                  <span className="node-label text-sm uppercase tracking-widest mt-6 opacity-0 translate-y-2">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={toolsRef} className="mb-48 tools-section">
          <h2 className="text-3xl font-display mb-12 text-center">Stack & Tooling</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {['React 19', 'Three.js', 'GSAP', 'Lenis', 'Next.js', 'TypeScript 5', 'Tailwind CSS', 'Vercel', 'Figma', 'Blender', 'OpenAI API', 'Framer'].map(tool => (
              <span 
                key={tool} 
                className="tool-label px-6 py-3 rounded-full border border-border-main font-mono text-sm uppercase tracking-wider text-text-2 transition-all duration-300 hover:text-bg-0 hover:bg-accent hover:border-accent hover:scale-105"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-48">
          <h2 className="text-3xl font-display mb-16">Working Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="border-t border-border-main pt-8">
              <h3 className="text-2xl font-display mb-4">Fewer, better</h3>
              <p className="text-text-2 text-lg">We take on a maximum of 3 projects at a time. Deep work requires unbroken focus. We do not stretch ourselves thin.</p>
            </div>
            <div className="border-t border-border-main pt-8">
              <h3 className="text-2xl font-display mb-4">Craft is the strategy</h3>
              <p className="text-text-2 text-lg">A technically excellent site is a trust signal. It says 'we care about the details' louder than any marketing copy ever could.</p>
            </div>
            <div className="border-t border-border-main pt-8">
              <h3 className="text-2xl font-display mb-4">Shipped is better than perfect</h3>
              <p className="text-text-2 text-lg">But perfect is worth pursuing. We set realistic timelines and exercise obsessive polish within those boundaries.</p>
            </div>
            <div className="border-t border-border-main pt-8">
              <h3 className="text-2xl font-display mb-4">Your success is the case study</h3>
              <p className="text-text-2 text-lg">We do not get to claim quality until your metrics agree. Beautiful code that doesn't convert is just an expensive hobby.</p>
            </div>
          </div>
        </section>

        <section className="text-center bg-surface py-32 px-6 rounded-[2rem] border border-border-main">
          <h2 className="text-4xl md:text-5xl font-display mb-12 max-w-3xl mx-auto leading-tight">The work is good. The question is whether we're right for each other.</h2>
          <MagneticButton onClick={() => setLocation('/contact')} className="mb-12">Start a conversation</MagneticButton>
          <div>
            <span className="font-mono text-sm tracking-widest uppercase text-text-2 px-4 py-2 border border-border-main rounded-full">Next available: September 2026</span>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}