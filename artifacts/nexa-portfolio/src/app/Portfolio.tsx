import { useSmoothScroll } from '@/motion/scroll';
import { useSEO } from '@/lib/seo';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { caseStudies } from '@/content/data';
import { Link, useLocation } from 'wouter';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { revealLines } from '@/motion/reveals';
import { useSceneStore } from '@/stores/scene';

const CATEGORIES = ['All', 'AI & SaaS', 'Ecommerce', 'Web Apps', 'Editorial', 'Mobile'];

export function Portfolio() {
  useSmoothScroll();
  useSEO({
    title: 'Selected Works — Case Studies',
    description: 'Browse NEXA\'s portfolio of cinematic web experiences — AI SaaS, luxury ecommerce, editorial, and mobile. Each project drives measurable outcomes.',
    canonicalPath: '/portfolio',
  });
  const [activeFilter, setActiveFilter] = useState('All');
  const [_, setLocation] = useLocation();
  const headerRef = useRef<HTMLHeadingElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const setHoveredProject = useSceneStore(s => s.setHoveredProject);

  // Clear hovered project on unmount so GalleryPlane fades out
  useEffect(() => () => setHoveredProject(null), [setHoveredProject]);

  const filteredStudies = caseStudies.filter(study => 
    activeFilter === 'All' ? true : study.category === activeFilter
  );

  useGSAP(() => {
    if (headerRef.current) revealLines(headerRef.current);
  }, { scope: headerRef });

  useGSAP(() => {
    if (!metricsRef.current) return;
    const counters = gsap.utils.toArray('.metric-number', metricsRef.current) as HTMLElement[];
    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');
      const suffix = counter.getAttribute('data-suffix') || '';
      gsap.to(counter, {
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: "power2.out",
        scrollTrigger: {
          trigger: metricsRef.current,
          start: "top 80%",
          once: true,
        },
        onUpdate() {
          counter.innerHTML = Math.round(parseFloat(counter.innerHTML)) + suffix;
        }
      });
    });
  }, { scope: metricsRef });

  const featuredStudy = caseStudies.find(s => s.slug === 'luminary-ai');

  return (
    <div className="bg-bg-0 min-h-screen text-text-main relative">
      <Cursor />
      <Nav />

      <main id="main-content" className="pt-48 pb-32 max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero */}
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border-main pb-16">
          <div>
            <h1 ref={headerRef} className="text-fluid-display font-bold mb-6 leading-[0.95]">Selected Works</h1>
            <p className="text-xl text-text-2 max-w-2xl">Digital experiences that drive measurable outcomes without sacrificing uncompromising craft.</p>
          </div>
          <div className="font-mono text-sm text-text-2 pb-2">
            0{caseStudies.length} projects
          </div>
        </header>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-8 mb-16 relative">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative font-mono text-sm uppercase tracking-wider pb-2 transition-colors ${activeFilter === cat ? 'text-text-main' : 'text-text-2 hover:text-text-main'}`}
            >
              {cat}
              {activeFilter === cat && (
                <motion.div 
                  layoutId="filter-indicator" 
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" 
                />
              )}
            </button>
          ))}
        </div>

        {/* Project List */}
        <div className="mb-48 border-t border-border-main">
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                key={study.slug}
              >
                <Link
                  href={`/portfolio/${study.slug}`}
                  className="group relative block w-full py-12 border-b border-border-main hover:border-transparent transition-colors duration-500 overflow-hidden"
                  onMouseEnter={() => setHoveredProject(study.slug)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  
                  {/* Hover background illuminate */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--color-surface),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-8 w-full">
                    
                    <div className="flex-1 flex gap-8">
                      <span className="font-mono text-text-2 mt-4 hidden md:block">0{idx + 1}</span>
                      <div>
                        <h2 className="text-4xl md:text-6xl font-display mb-4 group-hover:text-accent transition-colors duration-500">{study.title}</h2>
                        <p className="text-xl text-text-2 max-w-xl">{study.challenge}</p>
                      </div>
                    </div>

                    <div className="flex-1 md:text-right flex flex-col justify-between items-start md:items-end">
                      <span className="font-mono text-sm px-4 py-2 rounded-full border border-border-main mb-8 group-hover:border-accent group-hover:text-accent transition-colors duration-500">
                        {study.metric}
                      </span>
                      <div className="flex flex-wrap gap-3 md:justify-end">
                        {study.stack.map(tech => (
                          <span key={tech} className="text-xs font-mono text-text-2 uppercase tracking-wider bg-surface px-3 py-1 rounded-full">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredStudies.length === 0 && (
            <div className="py-24 text-center text-text-2 font-mono">No projects found for this category.</div>
          )}
        </div>

        {/* Featured Highlight */}
        {featuredStudy && (
          <section className="mb-48">
            <h2 className="text-2xl font-display mb-8">Featured Case</h2>
            <div className="w-full aspect-video rounded-3xl overflow-hidden relative mb-12">
               <div className="absolute inset-0 bg-accent/10 mix-blend-overlay z-10"></div>
               <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop" alt={featuredStudy.title} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <div>
                  <h3 className="text-eyebrow text-accent mb-4">The Challenge</h3>
                  <p className="text-lg">{featuredStudy.challenge}</p>
               </div>
               <div>
                  <h3 className="text-eyebrow text-accent mb-4">The Approach</h3>
                  <p className="text-text-2">{featuredStudy.approach}</p>
               </div>
               <div>
                  <h3 className="text-eyebrow text-accent mb-4">The Outcome</h3>
                  <p className="text-xl font-display">{featuredStudy.outcome}</p>
               </div>
            </div>
          </section>
        )}

        {/* Aggregate Metrics Strip */}
        <section ref={metricsRef} className="py-24 border-y border-border-main mb-48">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
             {[
               { val: 47, suffix: '+', label: 'Projects Delivered' },
               { val: 97, suffix: '', label: 'Avg Lighthouse' },
               { val: 94, suffix: '%', label: 'Client Retention' },
               { val: 6, suffix: 'yrs', label: 'In Business' }
             ].map((m, i) => (
                <div key={i}>
                  <div className="text-5xl md:text-7xl font-display mb-4 text-accent">
                    <span className="metric-number" data-target={m.val} data-suffix={m.suffix}>0</span>
                  </div>
                  <div className="text-eyebrow text-text-2">{m.label}</div>
                </div>
             ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-32 bg-surface p-12 md:p-24 rounded-[3rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-2xl md:text-3xl font-display leading-relaxed mb-8">"NEXA didn't just build us a website. They built us a competitive advantage. The cinematic approach transformed how investors and users perceive our deep-tech offering."</p>
              <div className="text-sm font-mono uppercase tracking-wider text-text-2">Head of Growth, Luminary AI</div>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-display leading-relaxed mb-8">"The Maison Calloway site won us three new wholesale accounts in the first month. They understood that tactile luxury had to translate into digital motion."</p>
              <div className="text-sm font-mono uppercase tracking-wider text-text-2">Creative Director, Maison Calloway</div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}