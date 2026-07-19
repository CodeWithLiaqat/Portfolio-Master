import { useSmoothScroll } from '@/motion/scroll';
import { useSEO } from '@/lib/seo';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { lab } from '@/content/data';
import { Canvas } from '@react-three/fiber';
import { NoiseFieldExperiment } from '@/three/scenes/experiments/NoiseFieldExperiment';
import { ParticleAttractorExperiment } from '@/three/scenes/experiments/ParticleAttractorExperiment';
import { ProceduralRingExperiment } from '@/three/scenes/experiments/ProceduralRingExperiment';
import { MagneticButton } from '@/components/common/MagneticButton';
import { useLocation } from 'wouter';

export function Lab() {
  useSmoothScroll();
  useSEO({
    title: 'Lab — WebGL Experiments & Open Source',
    description: 'Where CODEICS builds in public. Interactive WebGL demos, open-source utilities, code snippets, and the tools behind our work.',
    canonicalPath: '/lab',
  });
  const [, setLocation] = useLocation();

  const snippets = [
    {
      title: "GSAP + Lenis Ticker",
      code: `lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)`
    },
    {
      title: "Reveal Lines ScrollTrigger",
      code: `gsap.fromTo(lines, 
  { yPercent: 110 },
  { 
    yPercent: 0, 
    duration: 1.4, 
    stagger: 0.08, 
    ease: "power3.out",
    scrollTrigger: { trigger: el }
  }
);`
    },
    {
      title: "Zustand Theme Store",
      code: `export const useTheme = create((set) => ({
  theme: 'aurum',
  setTheme: (t) => {
    document.documentElement
      .setAttribute('data-theme', t);
    set({ theme: t });
  }
}));`
    }
  ];

  return (
    <div className="bg-bg-0 min-h-screen text-text-main relative">
      <Cursor />
      <Nav />

      <main id="main-content" className="pt-48 pb-32 max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 1. Hero */}
        <header className="mb-32 border-b border-border-main pb-16">
          <h1 className="text-fluid-display font-bold mb-6 leading-[0.95]">The Lab</h1>
          <p className="text-xl text-text-2 max-w-2xl">Where experiments live. Free to use, free to fork.</p>
        </header>

        {/* 2. Interactive Experiments */}
        <section className="mb-32">
          <h2 className="text-3xl font-display mb-12">R3F Experiments</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="flex flex-col">
               <div className="h-[280px] bg-surface rounded-2xl overflow-hidden mb-6 border border-border-main">
                  <Canvas camera={{ position: [0, 2, 8] }}>
                     <NoiseFieldExperiment />
                  </Canvas>
               </div>
               <span className="font-mono text-sm text-text-2 mb-2">01 / Noise Displacement</span>
               <p className="text-sm">Plane geometry vertices displaced by sin/cos noise functions.</p>
            </div>
            <div className="flex flex-col">
               <div className="h-[280px] bg-surface rounded-2xl overflow-hidden mb-6 border border-border-main">
                  <Canvas camera={{ position: [0, 0, 6] }}>
                     <ParticleAttractorExperiment />
                  </Canvas>
               </div>
               <span className="font-mono text-sm text-text-2 mb-2">02 / Particle Attractor</span>
               <p className="text-sm">1000 points drawn to a moving center with close-range repulsion.</p>
            </div>
            <div className="flex flex-col">
               <div className="h-[280px] bg-surface rounded-2xl overflow-hidden mb-6 border border-border-main">
                  <Canvas camera={{ position: [0, 0, 6] }}>
                     <ProceduralRingExperiment />
                  </Canvas>
               </div>
               <span className="font-mono text-sm text-text-2 mb-2">03 / Procedural Ring</span>
               <p className="text-sm">Wireframe torus scaling via time-based sine wave.</p>
            </div>
          </div>
        </section>

        {/* 3. Downloads */}
        <section className="mb-32 border-t border-border-main pt-32">
          <h2 className="text-3xl font-display mb-12">Resources & Blueprints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lab.map((item, idx) => (
              <div key={idx} className="bg-surface rounded-[24px] p-8 border border-border-main flex flex-col h-full">
                <div className="flex justify-between items-start mb-12">
                  <span className="text-eyebrow px-3 py-1 rounded-full border border-border-main">{item.type}</span>
                </div>
                <h3 className="text-2xl font-display mb-4">{item.title}</h3>
                <p className="text-text-2 mb-8 flex-grow">{item.description}</p>
                <a href={item.link} className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-accent hover:text-text-main transition-colors">
                  {item.type === 'Repository' ? 'Fork repo' : 'Download'} →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Code Snippets */}
        <section className="mb-32">
          <h2 className="text-3xl font-display mb-12">Common Patterns</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {snippets.map((snippet, idx) => (
              <div key={idx} className="bg-surface-2 rounded-2xl border border-border-main overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-border-main bg-surface/50 text-sm font-mono text-text-2">
                  {snippet.title}
                </div>
                <pre className="p-6 overflow-x-auto text-sm font-mono text-text-main flex-grow">
                  <code>
                    {snippet.code.split(/(\b(?:export|const|function|return|if|else|import|from|lenis|gsap|ScrollTrigger)\b)/).map((part, i) => 
                      ['export', 'const', 'function', 'return', 'if', 'else', 'import', 'from'].includes(part) ? 
                        <span key={i} className="text-accent">{part}</span> : 
                      ['lenis', 'gsap', 'ScrollTrigger'].includes(part) ?
                        <span key={i} className="text-accent-2">{part}</span> : part
                    )}
                  </code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Uses/Setup */}
        <section className="mb-32 py-24 border-y border-border-main">
           <h2 className="text-3xl font-display mb-16 text-center">What I actually use</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
             <div>
               <h3 className="text-eyebrow text-accent mb-8 border-b border-border-main pb-4">Hardware</h3>
               <ul className="space-y-4 font-mono text-sm">
                 <li className="flex justify-between border-b border-border-main/50 pb-2"><span>Machine</span><span className="text-text-2">MacBook Pro M3 Max 64GB</span></li>
                 <li className="flex justify-between border-b border-border-main/50 pb-2"><span>Display</span><span className="text-text-2">Apple Studio Display</span></li>
                 <li className="flex justify-between border-b border-border-main/50 pb-2"><span>Keyboard</span><span className="text-text-2">Keychron Q1 Pro (Boba U4T)</span></li>
                 <li className="flex justify-between border-b border-border-main/50 pb-2"><span>Mouse</span><span className="text-text-2">Logitech MX Master 3S</span></li>
               </ul>
             </div>
             <div>
               <h3 className="text-eyebrow text-accent mb-8 border-b border-border-main pb-4">Software</h3>
               <ul className="space-y-4 font-mono text-sm">
                 <li className="flex justify-between border-b border-border-main/50 pb-2"><span>Editor</span><span className="text-text-2">VS Code (Tokyo Night)</span></li>
                 <li className="flex justify-between border-b border-border-main/50 pb-2"><span>Terminal</span><span className="text-text-2">Warp</span></li>
                 <li className="flex justify-between border-b border-border-main/50 pb-2"><span>Design</span><span className="text-text-2">Figma</span></li>
                 <li className="flex justify-between border-b border-border-main/50 pb-2"><span>3D</span><span className="text-text-2">Blender</span></li>
               </ul>
             </div>
           </div>
        </section>

        {/* 6. Changelog */}
        <section className="mb-48 max-w-3xl mx-auto">
           <h2 className="text-3xl font-display mb-12">Changelog</h2>
           <div className="space-y-12 border-l border-border-main pl-8 relative">
              {[
                { version: 'v2.1.0', date: 'Feb 2026', desc: 'Rewrote portfolio filtering. Added new WebGL experiments to Lab.' },
                { version: 'v2.0.0', date: 'Jan 2026', desc: 'Complete site redesign. Migrated to React 19 and R3F 9. Introduced thematic lighting engine.' },
                { version: 'v1.4.2', date: 'Nov 2025', desc: 'Performance hardening. Removed heavy post-processing on mobile.' },
                { version: 'v1.4.0', date: 'Sep 2025', desc: 'Added Insights editorial section. Built custom MDX parser.' }
              ].map(log => (
                <div key={log.version} className="relative">
                  <div className="absolute w-3 h-3 rounded-full bg-surface border border-accent -left-[38px] top-1"></div>
                  <div className="flex gap-4 items-baseline mb-2">
                    <span className="font-mono text-accent">{log.version}</span>
                    <span className="text-eyebrow text-text-2">{log.date}</span>
                  </div>
                  <p className="text-text-main">{log.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* 7. CTA */}
        <section className="text-center bg-surface py-32 rounded-[2rem]">
          <h2 className="text-4xl font-display mb-8">Build with intent.</h2>
          <MagneticButton onClick={() => setLocation('/contact')}>Start a conversation</MagneticButton>
        </section>

      </main>
      <Footer />
    </div>
  );
}