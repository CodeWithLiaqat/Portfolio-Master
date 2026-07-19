import { useSmoothScroll } from '@/motion/scroll';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const faqs = [
  {
    category: "Pricing & Value",
    questions: [
      { q: "What does a project cost?", a: "Projects start at $15,000. The range depends on scope, timeline, and complexity. We'd rather scope together than quote blind — reach out and let's map it." },
      { q: "Do you offer equity-based pricing for startups?", a: "Rarely, and only for deeply aligned visions. Our standard engagement is structured on a fixed-fee basis tied to deliverables." }
    ]
  },
  {
    category: "Process & Timeline",
    questions: [
      { q: "How long does a project take?", a: "A focused landing page: 3–4 weeks. A full site: 6–12 weeks. We work in phases with clear gates, so you always know exactly where we are." },
      { q: "What is your working model?", a: "We work asynchronously but communicate transparently. You'll have direct access to the engineers building your product. No account managers acting as telephone operators." }
    ]
  },
  {
    category: "Technology",
    questions: [
      { q: "What stack do you use?", a: "React/Next.js, Three.js, GSAP, and Tailwind. We choose technologies that offer absolute control over the final output and maximum performance for the end user." },
      { q: "Will I be able to edit the content?", a: "Yes. We implement headless CMS solutions (Sanity, Contentful, or Headless WP) so your team can manage content without touching code." }
    ]
  }
];

export function FAQ() {
  useSmoothScroll();

  return (
    <div className="bg-bg-0 min-h-screen text-text-main">
      <Cursor />
      <Nav />

      <main className="pt-48 pb-32 max-w-4xl mx-auto px-6">
        <header className="mb-24 text-center">
          <h1 className="text-fluid-display font-bold mb-6 leading-[0.95]">Frequently Asked.</h1>
          <p className="text-xl text-text-2">Clarity over cleverness.</p>
        </header>

        <div className="space-y-24">
          {faqs.map((group, idx) => (
            <section key={idx}>
              <h2 className="text-eyebrow text-accent mb-8">{group.category}</h2>
              <Accordion type="multiple" className="w-full">
                {group.questions.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${idx}-${i}`} className="border-border-main border-b px-2 hover:bg-surface/20 transition-colors">
                    <AccordionTrigger className="text-xl font-display py-6 hover:no-underline text-left">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-text-2 text-lg pb-8 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
