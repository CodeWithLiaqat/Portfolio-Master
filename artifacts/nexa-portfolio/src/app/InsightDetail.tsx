import { useSmoothScroll } from '@/motion/scroll';
import { useSEO } from '@/lib/seo';
import { useJsonLd, buildArticle, buildBreadcrumb } from '@/lib/jsonld';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { insights } from '@/content/data';
import { useParams, Link } from 'wouter';
import NotFound from '@/app/NotFound';

export function InsightDetail() {
  useSmoothScroll();
  const params = useParams();
  const currentIndex = insights.findIndex(i => i.slug === params.slug);
  const insight = insights[currentIndex];

  useSEO({
    title: insight ? insight.title : 'Insight',
    description: insight ? insight.excerpt : 'A perspective from the NEXA studio journal.',
    canonicalPath: `/insights/${params.slug ?? ''}`,
    ogType: 'article',
  });
  useJsonLd('insight-article', insight ? [
    buildArticle({ title: insight.title, excerpt: insight.excerpt, slug: insight.slug, date: insight.date }),
    buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Insights', path: '/insights' },
      { name: insight.title, path: `/insights/${insight.slug}` },
    ]),
  ] : []);

  if (!insight) return <NotFound />;

  const nextInsight = insights[currentIndex + 1] || insights[0];

  return (
    <div className="bg-bg-0 min-h-screen text-text-main relative">
      <Cursor />
      <Nav />

      <main id="main-content" className="pt-48 pb-32 max-w-3xl mx-auto px-6 relative z-10">
        <article className="mb-32">
          <header className="mb-24 border-b border-border-main pb-16">
            <Link href="/insights" className="text-sm font-mono uppercase tracking-wider text-text-2 hover:text-text-main mb-16 inline-block">← Journal</Link>
            
            <div className="flex gap-4 items-center mb-8">
               <span className="text-eyebrow text-accent">{insight.date}</span>
               <span className="w-1 h-1 bg-text-2 rounded-full"></span>
               <span className="text-eyebrow text-text-2">{insight.category}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-[1.1] mb-8">{insight.title}</h1>
            <p className="text-2xl text-text-2 leading-relaxed">{insight.excerpt}</p>
          </header>

          <div className="prose prose-invert prose-xl max-w-none text-text-main prose-headings:font-display prose-headings:text-text-main prose-a:text-accent prose-blockquote:border-l-accent prose-blockquote:bg-surface prose-blockquote:py-2 prose-blockquote:pr-6 prose-blockquote:rounded-r-xl">
            
            <p className="lead text-2xl font-light mb-12">
              Most development teams treat the frontend as a necessary evil to display backend data. We treat it as the product itself. When you optimize for the developer experience over the user experience, you end up with generic interfaces that fail to capture imagination.
            </p>

            <h2>The cost of generic architecture</h2>
            <p>
              Templates save time on day one and cost time every day after. You are fitting your unique business logic into someone else's generic container. By the time you've wrestled the template to match your brand, you've accrued immense technical debt and shipped a fundamentally compromised experience.
            </p>
            <p>
              Every micro-interaction should feel intentional. Every animation should be driven by a physical equation. If an element enters the screen, it shouldn't just appear—it should arrive. This requires a bespoke foundation built from the DOM up.
            </p>

            <blockquote className="my-16 font-display text-2xl md:text-3xl leading-snug text-text-main not-italic">
              "The difference between a good website and a memorable one is often invisible to the eye, but entirely perceptible to the mind."
            </blockquote>

            <h2>Core Web Vitals vs. Cinematic Craft</h2>
            <p>
              A common misconception is that heavy WebGL and GSAP animations inherently destroy Lighthouse scores. This is only true if engineered poorly. Performance is a design feature. We use demand-based frameloops in WebGL, strictly manage our texture sizes, and leverage CSS for anything that doesn't strictly need the GPU. 
            </p>
            <p>
              The baseline of quality will rise, meaning true differentiation will come from extreme craft, esoteric ideas, and human intent.
            </p>

          </div>
        </article>

        {/* Next Article */}
        <div className="pt-16 border-t border-border-main">
           <span className="text-eyebrow text-text-2 mb-8 block">Read Next</span>
           <Link href={`/insights/${nextInsight.slug}`} className="group block">
              <h3 className="text-4xl font-display group-hover:text-accent transition-colors mb-4">{nextInsight.title}</h3>
              <p className="text-text-2 text-lg">{nextInsight.excerpt}</p>
           </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}