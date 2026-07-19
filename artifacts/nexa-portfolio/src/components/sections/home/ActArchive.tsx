import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { insights, lab } from '@/content/data';
import { useThemeStore } from '@/stores/theme';

export function ActArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setTheme } = useThemeStore();

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => setTheme('garnet', 'cinematic'),
      onLeaveBack: () => setTheme('iris', 'cinematic'),
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative z-10 bg-bg-0 py-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <h2 className="text-fluid-h2 mb-6">From the archive</h2>
            <p className="text-text-2 mb-12">Thoughts on code, craft, and the future of digital experiences.</p>
            
            <a href="/insights" className="block text-sm font-mono uppercase tracking-wider text-accent mb-4 hover:underline">All Insights →</a>
            <a href="/lab" className="block text-sm font-mono uppercase tracking-wider text-accent hover:underline">View the Lab →</a>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-8">
          {insights.map((insight, idx) => (
            <a key={insight.slug} href={`/insights/${insight.slug}`} className="group block border-t border-border-main pt-8 pb-4 relative">
              <span className="text-eyebrow text-text-2 mb-4 block">{insight.date}</span>
              <h3 className="text-3xl font-display mb-4 group-hover:text-accent transition-colors">{insight.title}</h3>
              <p className="text-text-2 max-w-2xl">{insight.excerpt}</p>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
