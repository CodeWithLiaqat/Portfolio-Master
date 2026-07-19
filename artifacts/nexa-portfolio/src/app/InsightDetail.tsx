import { useSmoothScroll } from '@/motion/scroll';
import { useSEO } from '@/lib/seo';
import { useJsonLd, buildArticle, buildBreadcrumb, buildFAQPage } from '@/lib/jsonld';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { insights } from '@/content/data';
import { useParams, Link } from 'wouter';
import NotFound from '@/app/NotFound';
import { Suspense, lazy } from 'react';

const CoverScene = lazy(() => import('@/three/scenes/CoverScene').then(m => ({ default: m.CoverScene })));

const categoryColors: Record<string, string> = {
  AI: '#8B93F8',
  Strategy: '#E8C47C',
  Performance: '#8B93F8',
  Process: '#D14D66',
};

export function InsightDetail() {
  useSmoothScroll();
  const params = useParams();
  const currentIndex = insights.findIndex(i => i.slug === params.slug);
  const insight = insights[currentIndex];

  const accentColor = insight ? (categoryColors[insight.category] ?? '#8B93F8') : '#8B93F8';

  useSEO({
    title: insight ? (insight.metaTitle || insight.title) : 'Insight',
    description: insight ? (insight.metaDescription || insight.excerpt) : 'A perspective from the CODEICS studio journal.',
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
    ...(insight.faqs && insight.faqs.length > 0 ? [buildFAQPage(insight.faqs)] : []),
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

            {/* Cover scene — lazy-mounted WebGL composition */}
            <div
              className="w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-12 relative"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 60% 40%, ${accentColor}22 0%, transparent 70%),
                    linear-gradient(135deg, color-mix(in oklab, var(--bg-0) 85%, ${accentColor}) 0%, var(--bg-0) 100%)`,
                }}
              />
              <Suspense fallback={null}>
                <CoverScene variant={insight.coverIndex ?? 1} accentColor={accentColor} />
              </Suspense>
            </div>

            <div className="flex gap-4 items-center mb-8">
              <span className="text-eyebrow text-accent">{insight.date}</span>
              <span className="w-1 h-1 bg-text-2 rounded-full" />
              <span className="text-eyebrow text-text-2">{insight.category}</span>
              <span className="w-1 h-1 bg-text-2 rounded-full" />
              <span className="text-eyebrow text-text-2">{insight.readingTime ?? 5} min read</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-display font-bold leading-[1.1] mb-8">{insight.title}</h1>
            <p className="text-2xl text-text-2 leading-relaxed">{insight.excerpt}</p>
          </header>

          {/* Article body — rendered from content field */}
          <div
            className="prose prose-invert prose-xl max-w-none text-text-main
              prose-headings:font-display prose-headings:text-text-main
              prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6
              prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-accent prose-blockquote:bg-surface
              prose-blockquote:py-2 prose-blockquote:pr-6 prose-blockquote:rounded-r-xl
              prose-strong:text-text-main prose-code:text-accent
              prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-code:before:content-none prose-code:after:content-none"
            dangerouslySetInnerHTML={{ __html: insight.content }}
          />

          {/* FAQ section */}
          {insight.faqs && insight.faqs.length > 0 && (
            <section className="mt-24 pt-16 border-t border-border-main">
              <h2 className="text-2xl font-display mb-12">Frequently Asked Questions</h2>
              <dl className="space-y-10">
                {insight.faqs.map((faq, i) => (
                  <div key={i}>
                    <dt className="text-lg font-semibold text-text-main mb-3">{faq.q}</dt>
                    <dd className="text-text-2 leading-relaxed">{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
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
