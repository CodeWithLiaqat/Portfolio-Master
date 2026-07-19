import { useSmoothScroll } from '@/motion/scroll';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';

export function About() {
  useSmoothScroll();

  return (
    <div className="bg-bg-0 min-h-screen text-text-main relative">
      <Cursor />
      <Nav />

      <main className="pt-48 pb-32 max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-32">
          <h1 className="text-fluid-display font-bold mb-8 leading-[0.95]">An independent AI web developer based in London.</h1>
          <div className="w-full aspect-video bg-surface rounded-2xl overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent mix-blend-overlay z-10"></div>
             <img src="/portrait.jpg" alt="Abstract Portrait" className="w-full h-full object-cover mix-blend-luminosity" />
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

        <section className="mb-48 bg-surface p-12 rounded-3xl">
          <h2 className="text-3xl font-display mb-12 text-center">Process</h2>
          <div className="flex flex-col md:flex-row justify-between gap-8 text-center">
            {['01 Discovery', '02 Strategy', '03 Design', '04 Build', '05 Evolve'].map((step, idx) => (
              <div key={step} className="flex-1 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-text-2 flex items-center justify-center mb-4 font-mono text-sm">{idx + 1}</div>
                <span className="text-sm uppercase tracking-widest">{step.split(' ')[1]}</span>
              </div>
            ))}
          </div>
        </section>
        
        <section className="text-center mb-32">
           <h2 className="text-fluid-h2 mb-8">Ready to start?</h2>
           <a href="/contact" className="inline-flex bg-accent text-bg-0 px-8 py-4 rounded-full text-sm font-mono uppercase tracking-wider hover:opacity-90 transition-opacity">Let's build together</a>
        </section>

      </main>
      <Footer />
    </div>
  );
}
