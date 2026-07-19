import { useSmoothScroll } from '@/motion/scroll';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { insights } from '@/content/data';
import { Link } from 'wouter';
import { useState } from 'react';
import { MagneticButton } from '@/components/common/MagneticButton';
import { AnimatePresence, motion } from 'motion/react';

export function Insights() {
  useSmoothScroll();
  const [activeTopic, setActiveTopic] = useState('All');
  const [subscribed, setSubscribed] = useState(false);

  const featured = insights[0];
  const rest = insights.slice(1);
  const filteredRest = activeTopic === 'All' ? rest : rest.filter(i => i.category === activeTopic);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="bg-bg-0 min-h-screen text-text-main relative">
      <Cursor />
      <Nav />

      <main className="pt-48 pb-32 max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 1. Editorial Hero */}
        <header className="mb-32 border-b border-border-main pb-24">
          <span className="text-eyebrow text-accent mb-6 block">Featured Piece — {featured.date}</span>
          <Link href={`/insights/${featured.slug}`} className="group block">
             <div className="p-12 md:p-24 bg-gradient-to-br from-surface to-bg-0 border border-border-main rounded-[2rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-5 blur-[100px] rounded-full group-hover:opacity-10 transition-opacity duration-700"></div>
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[1.1] max-w-4xl relative z-10 group-hover:text-accent transition-colors duration-500">{featured.title}</h1>
                <p className="text-2xl text-text-2 max-w-2xl mb-12 relative z-10">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm font-mono uppercase tracking-wider text-text-main relative z-10">
                  Read the piece <span className="w-8 h-[1px] bg-accent group-hover:w-16 transition-all duration-300"></span>
                </div>
             </div>
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          
          {/* 3. Topic Filter Sidebar */}
          <div className="lg:col-span-3">
             <div className="sticky top-32">
                <h3 className="text-eyebrow text-text-2 mb-8">By Topic</h3>
                <ul className="space-y-4">
                  {['All', 'Strategy', 'Performance', 'Process', 'AI'].map(topic => (
                    <li key={topic}>
                      <button 
                        onClick={() => setActiveTopic(topic)}
                        className={`text-lg transition-colors ${activeTopic === topic ? 'text-accent' : 'text-text-2 hover:text-text-main'}`}
                      >
                        {topic}
                      </button>
                    </li>
                  ))}
                </ul>
             </div>
          </div>

          {/* 2. Article List */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="popLayout">
              {filteredRest.map((insight) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={insight.slug}
                >
                  <Link href={`/insights/${insight.slug}`} className="group block py-12 border-b border-border-main relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-accent to-transparent opacity-0 -translate-x-full group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out"></div>
                    
                    <div className="pl-0 group-hover:pl-8 transition-all duration-500">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-eyebrow text-text-2">{insight.date}</span>
                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-surface text-text-2">{insight.category}</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-display mb-4 group-hover:text-accent transition-colors">{insight.title}</h2>
                      <p className="text-xl text-text-2 max-w-3xl mb-6">{insight.excerpt}</p>
                      <div className="text-sm font-mono text-text-2">5 min read</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredRest.length === 0 && (
              <div className="py-24 text-text-2 font-mono">No articles found for this topic.</div>
            )}
          </div>
        </div>

        {/* 6. Quote Interlude */}
        <section className="py-32 border-y border-border-main mb-32 text-center">
           <h2 className="text-4xl md:text-5xl font-display leading-tight max-w-4xl mx-auto">
             "The web is not a publication medium. It is a performance medium. Build accordingly."
           </h2>
        </section>

        {/* 4. Newsletter Capture */}
        <section className="mb-32 bg-surface p-12 md:p-24 rounded-[3rem] text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-display mb-6">The Lens</h2>
          <p className="text-text-2 text-lg mb-12">A monthly note on craft, code, and the cinematic web. Zero spam.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-6 max-w-xl mx-auto justify-center">
            <input 
              type="email" 
              placeholder="Email address" 
              required
              className="bg-transparent border-b border-border-main pb-4 px-2 text-text-main focus:outline-none focus:border-accent flex-1 transition-colors"
            />
            <MagneticButton variant={subscribed ? "secondary" : "primary"}>
              {subscribed ? "Subscribed" : "Subscribe"}
            </MagneticButton>
          </form>
        </section>

      </main>
      <Footer />
    </div>
  );
}