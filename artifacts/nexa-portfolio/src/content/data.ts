// ─── Case Studies ────────────────────────────────────────────────────────────

export const caseStudies = [
  {
    slug: 'abdullah-restaurant',
    title: 'Abdullah Restaurant',
    category: 'Ecommerce',
    metric: 'Zero-friction checkout',
    featured: true,
    liveUrl: 'https://liaqatali.dev',
    challenge: 'A fast-food restaurant needed customers to order online without a payment gateway, an app download, or a login screen.',
    approach: 'We built a PWA-first ordering experience around the friction-free WhatsApp checkout. Customers browse a filterable menu, build a cart, and complete their order through a pre-filled WhatsApp message — the entire flow is four taps on mobile. Daily deals with countdown timers create urgency without gimmicks.',
    stack: ['React', 'PWA', 'WhatsApp Integration', 'Tailwind CSS'],
    outcome: 'Frictionless ordering via WhatsApp with cart persistence, daily deal countdowns, and a PWA install flow that keeps repeat customers a single tap away.',
    image: '/abdullah.png',
  },
  {
    slug: 'luminary-ai',
    title: 'Luminary AI',
    category: 'AI & SaaS',
    metric: '340% trial lift',
    featured: false,
    challenge: 'Make a technical product feel approachable.',
    approach: 'We built a cinematic landing page using R3F that visualizes their neural networks as elegant, calm, flowing geometry. The complexity is hidden behind a simple, intuitive scroll narrative.',
    stack: ['Next.js', 'React Three Fiber', 'Contentful', 'GSAP'],
    outcome: '340% increase in trial signups, 2.1s LCP, Awwwards SOTD.',
    image: '/luminary.jpg',
  },
  {
    slug: 'maison-calloway',
    title: 'Maison Calloway',
    category: 'Ecommerce',
    metric: '28% AOV increase',
    featured: false,
    challenge: 'Translate tactile luxury to digital.',
    approach: 'Leveraged high-resolution WebGL textures and fluid Lenis scroll to emulate the feeling of running your hand over bespoke furniture. Micro-interactions are timed to absolute perfection.',
    stack: ['Headless Shopify', 'Three.js', 'GSAP', 'React'],
    outcome: '28% higher AOV vs. previous site, 4.1s avg. session time.',
    image: '/maison.jpg',
  },
  {
    slug: 'apex-finance',
    title: 'Apex Finance',
    category: 'Web Apps',
    metric: '99.9% uptime',
    featured: false,
    challenge: 'Complex data, zero cognitive load.',
    approach: 'A completely rebuilt frontend architecture focusing on absolute clarity. We used a muted palette with exact, high-contrast highlights for critical data changes.',
    stack: ['React', 'D3.js', 'WebSockets', 'Tailwind'],
    outcome: '67% reduction in time-to-insight, 99.9% uptime across all systems.',
    image: '/apex.jpg',
  },
  {
    slug: 'the-correspondent',
    title: 'The Correspondent',
    category: 'Editorial',
    metric: '2.4× retention',
    featured: false,
    challenge: 'Editorial richness at scale.',
    approach: 'A decoupled headless architecture allowing editors absolute freedom in layout without breaking the strict, luxurious typographical system.',
    stack: ['Next.js', 'Headless WP', 'MDX', 'Framer Motion'],
    outcome: '2.4× reader retention, sub-800ms TTFB globally.',
    image: '/correspondent.jpg',
  },
  {
    slug: 'vela',
    title: 'Vela',
    category: 'Mobile',
    metric: '#1 Product Hunt',
    featured: false,
    challenge: 'Communicate precision and adventure simultaneously.',
    approach: 'A mobile-first launch site featuring interactive 3D elements of their hardware, responding to device orientation and scroll.',
    stack: ['R3F', 'GSAP', 'Mobile-first', 'Zustand'],
    outcome: '18k app downloads in launch week, #1 Product Hunt.',
    image: '/vela.jpg',
  },
  {
    slug: 'fractional',
    title: 'Fractional',
    category: 'AI & SaaS',
    metric: '41% conversion lift',
    featured: false,
    challenge: 'Enterprise trust in 90 seconds of scroll.',
    approach: 'Using our cinematic scroll framework, we broke down their offering into easily digestible, highly impactful statements supported by restrained motion.',
    stack: ['React', 'GSAP', 'Lenis', 'Vite'],
    outcome: '41% conversion lift (A/B tested), qualified leads up 220%.',
    image: '/fractional.jpg',
  }
];

// ─── Services ────────────────────────────────────────────────────────────────

export const services = [
  {
    slug: 'ai-website-development',
    title: 'AI Website Development',
    promise: 'Websites that think.',
    description: 'AI-driven personalization, dynamic content, intelligent interactions.',
  },
  {
    slug: 'premium-landing-pages',
    title: 'Premium Landing Pages',
    promise: 'One page. One chance. Make it count.',
    description: 'Conversion-engineered, beautifully crafted.',
  },
  {
    slug: 'ecommerce-websites',
    title: 'Ecommerce Websites',
    promise: 'Digital storefronts that sell.',
    description: 'Headless commerce, custom checkout, optimized for revenue.',
  },
  {
    slug: 'web-applications',
    title: 'Web Applications',
    promise: 'Complexity, tamed.',
    description: 'Complex workflows made intuitive. Always fast, always reliable.',
  },
  {
    slug: 'mobile-applications',
    title: 'Mobile Applications',
    promise: 'Native feel, web speed.',
    description: 'Cross-platform apps that feel native but deploy everywhere.',
  },
  {
    slug: 'wordpress-development',
    title: 'WordPress Development',
    promise: 'The world\'s most flexible CMS, finally done right.',
    description: 'Custom themes, headless architecture, developer-grade.',
  },
  {
    slug: 'headless-wordpress',
    title: 'Headless WordPress Development',
    promise: 'Content freedom. Frontend power.',
    description: 'Decouple your content from your presentation layer.',
  }
];

// ─── Child Services (sub-pages under parent services) ────────────────────────

export interface ChildService {
  slug: string;
  title: string;
  shortTitle: string;
  promise: string;
  description: string;
  metaDescription: string;
  parentSlug: string;
  parentTitle: string;
  coverVariant: number;
  deliverables: string[];
  faqs: Array<{ q: string; a: string }>;
  relatedInsightSlug: string;
  relatedCaseStudySlug: string;
}

export const childServices: ChildService[] = [
  {
    slug: 'ios-app-development',
    title: 'iOS App Development',
    shortTitle: 'iOS',
    promise: 'Native iOS experiences that feel inevitable.',
    description: 'Bespoke Swift and React Native iOS applications engineered for performance, App Store approval, and the exact experience Apple users expect.',
    metaDescription: 'iOS app development for founders and product teams who demand more. Bespoke Swift and React Native apps built to App Store standards — design, engineering, and launch.',
    parentSlug: 'mobile-applications',
    parentTitle: 'Mobile Applications',
    coverVariant: 6,
    deliverables: ['Swift / SwiftUI Architecture', 'React Native Cross-platform', 'App Store Submission', 'Push Notifications & Analytics'],
    faqs: [
      {
        q: 'How much does iOS app development cost?',
        a: 'A focused iOS app — one or two core user flows, clean design, and App Store launch — starts at approximately £25,000–£45,000. Complex apps with real-time features, custom animations, or backend integrations typically range from £60,000–£150,000. Cost is driven by the number of screens, backend complexity, and the level of UI craft required.'
      },
      {
        q: 'How long does it take to build an iOS app?',
        a: 'A well-scoped iOS app takes 12–20 weeks from signed specification to App Store submission. Discovery accounts for 2–4 weeks. Build is 8–14 weeks with weekly client reviews. App Store review adds 1–2 weeks. Rushing either phase is the primary cause of overruns and launch failures.'
      },
      {
        q: 'Do you build native Swift apps or React Native?',
        a: 'Both. Native Swift and SwiftUI deliver the best performance and deepest platform integration — appropriate for apps using custom animations, complex gestures, or hardware features like ARKit. React Native is the right choice for teams shipping on iOS and Android simultaneously or sharing a web codebase. We recommend the right approach for your specific product.'
      },
      {
        q: 'Can you handle App Store submission and review?',
        a: 'Yes. App Store submission is included in every iOS project: App Store Connect metadata, screenshots at all required device sizes, privacy manifest compliance, and responding to any App Review queries. We have shipped apps through review across multiple categories and know how to avoid the most common rejection triggers.'
      },
      {
        q: 'What happens after the app launches?',
        a: 'Post-launch, we offer retainer support covering iOS OS update compatibility, new device support, feature additions, and analytics review. Most clients begin with a 3-month post-launch retainer — the period when user feedback is heaviest and iteration is fastest. Monthly or quarterly retainers follow depending on the product roadmap.'
      },
      {
        q: 'Do you design the app as well as build it?',
        a: 'Yes. CODEICS handles both design and engineering. We produce wireframes, high-fidelity Figma designs, and a motion specification before a line of code is written. Clients with existing designs are welcome — we will review for engineering feasibility and Apple HIG compliance before committing to the build specification.'
      }
    ],
    relatedInsightSlug: 'core-web-vitals-craft',
    relatedCaseStudySlug: 'vela',
  },
  {
    slug: 'android-app-development',
    title: 'Android App Development',
    shortTitle: 'Android',
    promise: 'Android apps built for the full spectrum of devices.',
    description: 'Bespoke Kotlin and React Native Android applications engineered for Google Play approval, Material Design 3 standards, and the fragmented device landscape Android demands.',
    metaDescription: 'Android app development for founders and product teams reaching the broadest mobile audience. Kotlin and React Native apps built to Google Play standards — design, engineering, and launch.',
    parentSlug: 'mobile-applications',
    parentTitle: 'Mobile Applications',
    coverVariant: 7,
    deliverables: ['Kotlin / Jetpack Compose', 'React Native Cross-platform', 'Google Play Submission', 'Material Design 3 Implementation'],
    faqs: [
      {
        q: 'How much does Android app development cost?',
        a: 'A focused Android app — core user flows, clean Material Design 3 UI, and Google Play launch — starts at approximately £22,000–£42,000. Android device fragmentation (thousands of screen sizes and OS versions) can add engineering time compared to an equivalent iOS build. Complex apps with real-time features typically range from £55,000–£140,000.'
      },
      {
        q: 'How long does Android app development take?',
        a: 'A well-scoped Android app takes 10–18 weeks from signed specification to Google Play submission. Discovery and specification account for 2–4 weeks. Build is 7–12 weeks with weekly reviews. Google Play review is typically within 72 hours. Comprehensive device testing across OS versions and manufacturers adds 1–2 weeks near launch.'
      },
      {
        q: 'Do you build native Kotlin apps or React Native?',
        a: 'Both. Native Kotlin with Jetpack Compose delivers the best performance and deepest Android platform integration — appropriate for apps requiring complex custom layouts, hardware access, or OS-level integrations. React Native is the right choice for teams shipping iOS and Android simultaneously, sharing a JavaScript codebase, or where development speed is the priority.'
      },
      {
        q: 'How do you handle Android device fragmentation?',
        a: 'Device fragmentation is the primary technical challenge in Android development. We address it through a tiered testing matrix — every build tested on at least 12 device/OS combinations covering the top 95% of active Android users — adaptive layouts using Jetpack Compose\'s intrinsic sizing system, and a minimum SDK target that balances modern API access with broad device reach.'
      },
      {
        q: 'Can you handle Google Play submission and review?',
        a: 'Yes. Google Play submission is included in every Android project: store listing metadata, feature graphic and screenshot assets at all required sizes, content rating questionnaire, and policy compliance review. We also prepare the data safety section accurately — Google now prominently displays this to users before they install.'
      },
      {
        q: 'Should I build for iOS and Android simultaneously?',
        a: 'Only if your audience is genuinely split between platforms. For consumer apps, Android represents 70–75% of global mobile users but a lower proportion of premium-product buyers. For B2B tools, iOS often dominates. We will look at your specific target market and make a recommendation. Building both simultaneously with React Native is often right if budget allows — but validating on one platform first is a legitimate strategy.'
      }
    ],
    relatedInsightSlug: 'gsap-threejs-web-experiences',
    relatedCaseStudySlug: 'vela',
  }
];

// ─── Insights ─────────────────────────────────────────────────────────────────

export interface InsightFAQ {
  q: string;
  a: string;
}

export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readingTime: number;
  metaTitle: string;
  metaDescription: string;
  coverAccent: string;
  coverIndex: number;
  relatedService: string;
  faqs: InsightFAQ[];
}

export const insights: Insight[] = [
  {
    slug: 'ai-website-development-2026',
    title: 'AI Website Development in 2026: What Actually Changes for Your Business',
    excerpt: 'Most agencies are slapping "AI" on templated builds. Here is what genuine AI website development does — and what it does not.',
    date: '2026-07-14',
    category: 'AI',
    readingTime: 8,
    metaTitle: 'AI Website Development in 2026 — What Changes',
    metaDescription: 'Understand what AI website development actually delivers for your business in 2026: personalization, content generation, and where it creates risk.',
    coverAccent: 'var(--color-accent-iris)',
    coverIndex: 1,
    relatedService: 'ai-website-development',
    faqs: [
      {
        q: 'What is AI website development?',
        a: 'AI website development uses machine learning to power features like real-time content personalization, intelligent search, automated A/B testing, and predictive user flows — rather than simply using AI tools to write copy or generate images during the build process.'
      },
      {
        q: 'How much does an AI website cost compared to a standard build?',
        a: 'The infrastructure for real AI features (recommendation engines, personalization layers, analytics pipelines) adds 30–60% to a standard project budget. Agencies that charge "AI pricing" for ChatGPT-written copy are selling you nothing extra.'
      },
      {
        q: 'Can AI replace a web designer or developer?',
        a: 'Not at the level that wins clients. AI handles pattern recognition and iteration well. It has no taste, no strategic judgment, and no awareness of your specific business context. The best studios use AI as a production accelerator, not a creative replacement.'
      },
      {
        q: 'What should I ask an agency before hiring them for an AI website project?',
        a: 'Ask which specific AI features are built into the product (not used during production), how personalization is measured post-launch, and what happens when the AI model produces wrong results. Vague answers reveal that "AI" is a marketing label on a standard build.'
      }
    ],
    content: `<p class="lead">A client came to us last year having paid £18,000 for what their previous agency called an "AI website." The agency had used ChatGPT to write the copy and DALL-E for the hero images. The result looked exactly like every other AI website: generic headlines, stock-prompt illustrations, and a contact form that went nowhere. That is not AI website development.</p>

<h2>What AI Website Development Actually Means</h2>
<p>The phrase means two different things depending on who says it. For most agencies in 2025–2026, "AI" describes their production tooling: they write code faster with Copilot, draft copy with Claude, and generate placeholder images with Midjourney. None of this reaches the user.</p>
<p>Genuine AI website development means the finished product uses machine learning to serve each visitor differently. Personalized content blocks based on referral source. Intelligent search that understands intent, not just keywords. Predictive navigation that surfaces the right product or service based on behaviour patterns. A/B testing that runs continuously and self-optimises rather than requiring a developer to deploy variants.</p>
<p>The distinction matters because one approach costs about the same as a standard build and delivers nothing new. The other requires a different technical architecture from day one — and delivers compounding value over time.</p>

<h2>Three Ways AI Adds Real Value to a Website</h2>
<p>Not every site needs AI features. But for businesses with sufficient traffic and conversion ambition, three use cases produce measurable ROI:</p>
<p><strong>Dynamic content personalisation.</strong> Visitors arriving from a LinkedIn ad for CFOs see a different hero statement than visitors arriving from a Google search for "invoice software." This requires a content management layer that can serve variable copy against audience rules. Conversion lifts of 15–35% are common in documented case studies from Segment and Dynamic Yield.</p>
<p><strong>Intelligent site search.</strong> Standard keyword search fails at synonyms, misspellings, and intent. Semantic search powered by embedding models understands that "how to track expenses" and "expense management software" are the same question. For SaaS and ecommerce, this change alone reduces bounce rates from search by 20–40%.</p>
<p><strong>Continuous optimisation.</strong> Traditional A/B testing requires weeks per variant and a statistician to interpret results. Multi-armed bandit algorithms rebalance traffic toward winning variants in real time. A landing page running this system for six months will significantly outperform one that went live and stayed static.</p>

<h2>Where AI Creates Risk for Your Brand</h2>
<p>The risks are specific and often overlooked in the pitch. First: model drift. An AI personalisation system trained on six months of data from one audience segment will serve the wrong content when your audience changes — and it will fail silently. You need monitoring, not just deployment.</p>
<p>Second: brand dilution. When your homepage headline changes based on audience, your brand identity fragments. Every variant needs to pass through a single voice and visual standard. Building that standard is a design problem AI cannot solve for you.</p>
<p>Third: dependency risk. Several AI-as-a-service providers that were popular in 2023 have pivoted or shut down. Any AI feature that relies on a third-party API needs a fallback state that degrades gracefully rather than breaking the site.</p>

<h2>The Technical Requirements Most Agencies Skip</h2>
<p>A production AI website requires infrastructure that most web projects never touch: a data pipeline to collect and structure user behaviour, a feature store to serve ML model inputs at low latency, an experimentation framework to measure variant performance, and an observability layer to catch when any of the above drifts from expected behaviour.</p>
<p>This is not a £5,000 project. The minimum viable version of this stack — built properly, with error handling, monitoring, and a content team that knows how to operate it — costs more than a standard marketing site. Agencies pricing it like a Webflow build are cutting corners you will discover in production.</p>
<p>The <a href="/services/ai-website-development">AI website development service we offer</a> is built on a documented architecture that handles each of these requirements explicitly. We do not ship AI features without the monitoring layer in place.</p>

<h2>What to Ask Before You Hire</h2>
<p>Ask any agency pitching AI development three questions: Which AI features are built into the delivered product — not the production tooling? How is personalisation performance measured after launch? What is the fallback when the AI component fails?</p>
<p>Vague answers to any of these reveal that AI is a label on a standard build. Good answers will be specific: named technologies, measurable KPIs, and documented failure modes.</p>
<p>The web development industry is in a period of honest opportunity here. AI genuinely does produce better outcomes at scale. But the bar for calling a project "AI" is currently set by marketing departments, not engineering reality. Knowing the difference is worth the hour it takes to ask the right questions.</p>
<p>Ready to build something that actually uses AI? <a href="/contact">Start a conversation</a>, or read more about how we approach <a href="/insights/core-web-vitals-craft">performance without sacrificing craft</a>.</p>`,
  },

  {
    slug: 'headless-wordpress-future',
    title: 'Why Headless WordPress Is the Future of Content-Heavy Websites',
    excerpt: 'WordPress powers 43% of the web. The developers winning with content at scale are using none of its traditional frontend.',
    date: '2026-06-21',
    category: 'Strategy',
    readingTime: 7,
    metaTitle: 'Headless WordPress Development: The Case for Going Headless',
    metaDescription: 'Headless WordPress development decouples your content from your frontend, unlocking performance and flexibility traditional WP themes cannot match.',
    coverAccent: 'var(--color-accent-aurum)',
    coverIndex: 2,
    relatedService: 'headless-wordpress',
    faqs: [
      {
        q: 'What is headless WordPress?',
        a: 'Headless WordPress uses WordPress purely as a content management system, served via its REST API or GraphQL (WPGraphQL), while the frontend is built in a modern framework like Next.js or React. WordPress manages content; a separate application handles everything the user sees.'
      },
      {
        q: 'Is headless WordPress faster than traditional WordPress?',
        a: 'Significantly. A well-built headless Next.js frontend typically scores 95+ on Lighthouse Performance vs. 45–65 for a typical WordPress theme with plugins. Static generation means most pages are served from a CDN with sub-100ms response times.'
      },
      {
        q: 'Does going headless break my existing WordPress plugins?',
        a: 'Plugins that affect the WordPress admin (SEO plugins like Yoast, form handlers, ACF) continue working. Plugins that inject scripts into the frontend (page builders, most visual editors, slider plugins) become irrelevant because you no longer use the WordPress theme system.'
      },
      {
        q: 'How much does a headless WordPress project cost?',
        a: 'Expect 40–70% more than a traditional WordPress build of similar scope. You are building two applications instead of one. The payoff is a frontend that performs and scales in ways a theme-based stack cannot, with a content workflow your editorial team already knows.'
      }
    ],
    content: `<p class="lead">WordPress powers 43% of the web. But the developers behind the fastest content sites in 2025–2026 are not using the theme system, the widget areas, or the plugin architecture that made WordPress famous. They are using WordPress exactly once — as the place editors log in to write.</p>

<h2>The Performance Ceiling of Traditional WordPress</h2>
<p>A standard WordPress site with a quality theme and a reasonable plugin stack typically scores 45–65 on Lighthouse Performance on desktop. On mobile, it is often worse. The causes are structural: WordPress themes generate full HTML on every request, PHP execution blocks the response, plugins inject scripts in the wrong order, and the database query pattern does not suit high-traffic loads.</p>
<p>You can optimise a traditional WordPress site with caching plugins, CDNs, and image compression. You can get it to 75, sometimes 80. But 95+ requires a different approach entirely, because the bottleneck is architectural, not configurational.</p>
<p>For content sites with under 5,000 monthly visitors and minimal editorial ambition, this ceiling is acceptable. For a media property, a SaaS documentation hub, or any site where content drives acquisition, it is a direct revenue constraint.</p>

<h2>What Headless Architecture Changes</h2>
<p>Headless WordPress separates the content layer from the presentation layer. WordPress still handles content creation, user management, taxonomy, and the editorial workflow editors know. But instead of rendering HTML, it exposes content via its REST API or via WPGraphQL.</p>
<p>A Next.js frontend queries that API at build time (for static pages) or at request time (for dynamic content), generates optimised HTML, and serves it from a global CDN. The result: a site that typically scores 95–99 on Lighthouse, loads in under 1.2 seconds globally, and handles traffic spikes without a single WordPress server breaking a sweat.</p>
<p>The editorial experience remains identical. Writers use Gutenberg or ACF exactly as they always have. They publish a post, and the frontend rebuild triggers automatically. The decoupling is invisible to the people creating content.</p>

<h2>Three Things Headless Unlocks That Themes Cannot</h2>
<p><strong>Component-driven design.</strong> A Next.js frontend is built from React components. Each one has a single responsibility, a predictable interface, and a test suite. When you add a new content type, you build a new component — you do not hunt through a PHP template hierarchy hoping nothing breaks.</p>
<p><strong>Multi-channel content delivery.</strong> The same WordPress content can feed your website, your mobile app, your newsletter templates, and a digital kiosk — because the API does not care what is consuming it. Traditional WordPress can only render a webpage.</p>
<p><strong>Zero plugin performance tax.</strong> Every WordPress plugin that modifies the frontend adds weight. A headless frontend has no plugin-injected scripts, no widget-area stylesheet bloat, no third-party page-builder markup. You control every byte of what ships to the browser.</p>

<h2>When Headless Is the Wrong Choice</h2>
<p>Headless is not always right. If your content team relies heavily on a visual page builder to control layout — and that is a legitimate editorial need, not a technical preference — going headless removes that capability unless you rebuild it as a custom block system. That is possible but expensive.</p>
<p>If your site is primarily transactional (a WooCommerce store), the performance gains of headless may not justify the complexity of rebuilding your checkout, cart, and product architecture outside WordPress. Headless commerce has its own well-developed tooling, but it is a larger project than a content migration.</p>
<p>The <a href="/services/headless-wordpress">headless WordPress development projects we take on</a> are almost always content-led: editorial sites, SaaS marketing, portfolio platforms. For straightforward transactional builds, traditional WooCommerce with careful optimisation often wins.</p>

<h2>The Stack That is Winning in 2026</h2>
<p>WordPress as CMS + WPGraphQL + Next.js 15 App Router + Vercel (or Cloudflare Pages) is the production-proven pattern. WPGraphQL eliminates the overfetching problem of the REST API: your frontend queries exactly the fields it needs, nothing more. Next.js App Router handles both static and server-rendered routes cleanly. Deployment to the edge means global performance without managing infrastructure.</p>
<p>For editorial teams that need rich text, Advanced Custom Fields Pro with the ACF Blocks API gives developers complete control over the Gutenberg editor experience. For teams that need fine-grained SEO control, Yoast SEO continues to work headlessly: its SEO data is queryable via the REST API and can populate your frontend's meta tags at build time.</p>
<p>If your content operation has outgrown traditional WordPress or you are building something new that will, <a href="/contact">start a conversation</a>. We can also point you to <a href="/insights/ai-future-web-dev">where AI fits into a modern content stack</a>.</p>`,
  },

  {
    slug: 'premium-landing-page-anatomy',
    title: 'Premium Landing Pages That Convert: Anatomy of a High-Performing Page',
    excerpt: 'A landing page converting 8% is four times more valuable than one converting 2%. The gap between them is rarely the design.',
    date: '2026-05-30',
    category: 'Strategy',
    readingTime: 8,
    metaTitle: 'Premium Landing Page Design That Actually Converts',
    metaDescription: 'Anatomy of a high-converting premium landing page: hierarchy, the first 3 seconds, social proof placement, motion, and the one-CTA rule.',
    coverAccent: 'var(--color-accent-garnet)',
    coverIndex: 3,
    relatedService: 'premium-landing-pages',
    faqs: [
      {
        q: 'What makes a landing page "premium"?',
        a: 'A premium landing page is designed with a single conversion goal in mind, features bespoke visual craft (not a template), loads in under 2 seconds, and earns trust before asking for anything. "Premium" is the combination of strategic clarity and execution quality — not decoration.'
      },
      {
        q: 'How long should a landing page be?',
        a: 'Long enough to answer every objection a qualified visitor could have, and no longer. For a high-ticket B2B offer, that is typically 1,500–3,000 words of content. For a simple lead magnet, 500 words. The right length depends entirely on the decision complexity of your offer.'
      },
      {
        q: 'Should a landing page have navigation?',
        a: 'Almost never, if the goal is a single conversion action. Navigation gives visitors an exit. For campaign-specific landing pages, remove it. For pages that are also part of the main site navigation, a minimal nav that keeps users on the page is acceptable.'
      },
      {
        q: 'What is the biggest mistake on landing pages?',
        a: 'Multiple competing calls to action. "Book a demo," "Watch the video," "Download the guide," and "Start a free trial" on the same page dilute all four. Pick one primary action. Everything else on the page exists to support that single decision.'
      }
    ],
    content: `<p class="lead">A landing page converting at 8% is worth four times as much as one converting at 2%, assuming identical traffic. They are the same cost to run. The gap between them is rarely the visual design. It is almost always the hierarchy.</p>

<h2>The Hierarchy Problem</h2>
<p>Most landing pages fail because they were designed by someone optimising for aesthetics and approved by a committee optimising for completeness. The result: a page that mentions everything, prioritises nothing, and asks the visitor to work out what they should do next.</p>
<p>High-converting landing pages are built around a single question: what is the one thing this visitor should understand in the next ten seconds? Everything else — the features list, the testimonials, the FAQ — exists to support the answer to that question, not compete with it.</p>
<p>This is a strategic problem before it is a design problem. Until you have the answer — a specific claim, a specific person, a specific outcome — you are arranging furniture in a burning building.</p>

<h2>The First Three Seconds</h2>
<p>Eye-tracking studies consistently show that visitors make a keep/leave decision within 3–5 seconds of arrival. In that window, they register: what this is, whether it is for someone like them, and whether the page looks trustworthy enough to keep reading.</p>
<p>Three seconds is one headline, one sub-headline, and a visual impression. The headline should state the specific outcome you deliver, for the specific person you serve, without hedging. "Intelligent invoicing software that reduces payment delays by 40%" beats "The future of financial operations" in conversion data, every documented time.</p>
<p>The visual impression is where craft matters most. A page that looks like a Webflow template or a ClickFunnels default activates a pattern-recognition response in experienced buyers: this is a commodity offer. A premium visual execution — considered typography, original imagery, intentional whitespace — signals that the business behind it takes quality seriously. That signal happens before the visitor reads a word.</p>

<h2>Social Proof That Actually Works</h2>
<p>Generic testimonials ("Great service, would recommend") add almost no conversion weight. Specific testimonials with a named individual, their company, their role, and a claim that directly addresses a common objection are worth 15–30% conversion lifts in controlled tests.</p>
<p>The best placement for social proof is immediately after your primary claim — not at the bottom of the page where visitors who have already decided arrive to confirm their decision. Put it where the doubt lives: right after you make the big promise.</p>
<p>Numbers carry disproportionate credibility. "47 teams" beats "dozens of teams." "2.3× faster onboarding" beats "significantly faster." The specificity itself is a trust signal: vague claims sound invented, precise claims sound measured.</p>

<h2>Motion as a Conversion Tool</h2>
<p>Motion on a landing page has one job: guide attention. Entrance animations that reveal content in reading order reduce cognitive load by pre-deciding what the visitor should process next. Hover states on interactive elements signal affordance. Micro-animations on CTAs (a subtle pulse, a directional movement) draw the eye at the moment of decision.</p>
<p>Motion that serves no attention purpose — background particles, decorative floating elements, constant looping animations — adds visual noise without conversion value. A <a href="/services/premium-landing-pages">premium landing page</a> uses motion purposefully: every animated element has a reason to move at the moment it moves.</p>
<p>For high-ticket B2B offers, we have consistently found that a restrained motion system (entrance reveals, hover states, scroll progress indicators) outperforms heavily animated pages. Buyers of complex services are pattern-matching for competence and stability, not entertainment.</p>

<h2>The One CTA Rule</h2>
<p>Every additional call to action on a landing page reduces the primary conversion rate. This is not a theory — it is a measurable effect documented across thousands of A/B tests. When you ask visitors to do three things, they often do none.</p>
<p>Choose one primary action. Design the entire page to earn that action. If you need a secondary option ("not ready? read a case study"), make it visually subordinate: smaller, lower contrast, positioned after the primary CTA. Never give secondary options equal visual weight to the primary action.</p>
<p>The discipline of the single CTA extends to the copy. Every paragraph, every section, every testimonial on the page should be pushing the visitor toward one moment: the decision to act. Content that does not serve that purpose should be removed, regardless of how much time was spent writing it.</p>
<p>If you are building a page that needs to do more than one thing, you do not have a landing page problem — you have an architecture problem. <a href="/contact">Talk to us about the right approach</a>, or read more about how <a href="/insights/ai-website-development-2026">AI personalisation can serve different offers to different audiences</a> on the same URL.</p>`,
  },

  {
    slug: 'web-applications-build-vs-buy',
    title: 'Modern Web Applications for Business Growth: Build vs. Buy in 2026',
    excerpt: 'The build-vs-buy question is not about software cost. It is about whether your competitive advantage comes from the process itself.',
    date: '2026-04-17',
    category: 'Strategy',
    readingTime: 9,
    metaTitle: 'Custom Web Application Development: Build vs Buy in 2026',
    metaDescription: 'When does custom web application development beat off-the-shelf software? A practical decision framework for 2026, with real cost analysis.',
    coverAccent: 'var(--color-accent-aurum)',
    coverIndex: 4,
    relatedService: 'web-applications',
    faqs: [
      {
        q: 'How much does custom web application development cost?',
        a: 'A production-ready custom web application with authentication, a database, a backend API, and a polished frontend typically starts at £25,000–£60,000 for a focused scope, and scales with complexity. The cost should be evaluated against the SaaS licensing and customisation costs you will pay over 3–5 years for an off-the-shelf alternative.'
      },
      {
        q: 'How long does it take to build a web application?',
        a: 'A well-scoped custom web application takes 8–20 weeks from kickoff to production launch, depending on complexity. The most common timeline killer is scope creep during the build phase — which is why a detailed specification and a fixed-scope engagement structure matters more than raw development speed.'
      },
      {
        q: 'What technology should a custom web application be built with?',
        a: 'The right stack depends on the application requirements, not developer preference. For most business web applications in 2026, React or Next.js on the frontend, Node.js or Python on the backend, PostgreSQL as the primary database, and a managed cloud provider (AWS, GCP, or Vercel) is a proven combination with a deep talent pool for future maintenance.'
      },
      {
        q: 'What are the risks of custom web application development?',
        a: 'The three main risks are scope creep (building more than was agreed), bus-factor dependency (only one developer understands the codebase), and underestimating post-launch maintenance. Mitigate all three with a written specification, documented architecture decisions, and a defined support agreement before you sign a contract.'
      }
    ],
    content: `<p class="lead">Every growing business eventually hits the configuration wall. You have been using a SaaS tool that was perfect at 10 users and is now held together with Zapier automations at 200. The question is not "should we build something custom?" The question is "does our competitive advantage come from the process this software runs?"</p>

<h2>Why Most Off-the-Shelf Tools Fail Growing Teams</h2>
<p>SaaS products are built for the median customer. Their feature roadmap is a negotiation between thousands of different business models, and the result is a product that is good enough for most use cases and excellent for none. This is fine until your process becomes the differentiator.</p>
<p>A recruitment firm that has developed a proprietary candidate scoring methodology cannot implement it in a generic ATS without compromising the methodology to fit the tool's data model. A logistics company that has engineered a load-balancing algorithm cannot run it inside an off-the-shelf route planning tool without paying for API access that makes the SaaS more expensive than a custom build within 18 months.</p>
<p>The moment your team starts maintaining workarounds, building spreadsheet overlays on top of your SaaS data, or apologising to clients for things "the system can't do," you are paying the hidden cost of a wrong fit.</p>

<h2>The Real Cost of Custom Web Application Development</h2>
<p>Founders often compare the upfront cost of a custom application against the monthly SaaS fee and conclude the SaaS is cheaper. This is only correct on a 12-month horizon. Over 36 months, a well-built custom application is almost always cheaper — and the break-even point is usually 18–24 months.</p>
<p>A custom web application for a team of 50 costs roughly £40,000–£80,000 to build with a professional development partner. A comparable enterprise SaaS subscription at £200–£500 per user per year costs £30,000–£75,000 over three years, plus customisation costs, integration engineering, and seat-scaling fees that rarely appear in the initial pitch.</p>
<p>The financial case for building tightens further when you factor in process fit: a tool built for your exact workflow takes less time to use, produces fewer errors, and requires less training. That is a productivity benefit that compounds every day.</p>

<h2>A Three-Question Decision Framework</h2>
<p>Before commissioning a custom build, answer three questions honestly:</p>
<p><strong>Is your process a genuine competitive advantage?</strong> If your business runs the same process as every competitor in your industry, a generic tool will serve it. Custom software makes sense when the process itself is proprietary, complex, or evolving in ways generic tools cannot accommodate.</p>
<p><strong>Do you have the internal capacity to own the software long-term?</strong> Custom software requires a point of contact who understands it, a development partner for ongoing maintenance, and an organisation willing to invest in it as a business asset rather than treating it as a one-time project. Organisations that lack this capacity often end up with unmaintained legacy systems.</p>
<p><strong>Can you specify what "done" looks like before you start?</strong> Custom software projects that fail almost always fail because the specification changed during the build. If you cannot write a detailed description of what the application does before development begins, you are not ready to build — you are ready to prototype.</p>

<h2>What the Build Phase Actually Looks Like</h2>
<p>A professional <a href="/services/web-applications">custom web application development</a> engagement follows a predictable structure. Discovery phase (2–4 weeks): detailed specification, data model design, architecture decisions documented. Build phase (8–16 weeks): iterative delivery against the spec with weekly reviews. Launch phase (2–4 weeks): user acceptance testing, deployment, handover documentation.</p>
<p>The most important output of the discovery phase is not a wireframe — it is a written specification that both parties have signed. Every undocumented assumption is a future invoice or a future argument. Expect to spend real time in discovery; the agencies that skip it are optimising for starting faster, not delivering better.</p>

<h2>The 2026 Technology Stack for Business Web Apps</h2>
<p>React or Next.js remains the dominant frontend choice for business applications, with excellent tooling, a deep talent pool, and a component architecture that scales well as complexity grows. For applications with complex server-side requirements, Next.js App Router handles both client and server rendering cleanly in a single codebase.</p>
<p>On the backend, Node.js and Python remain the most maintainable choices for businesses without specialist engineering teams. PostgreSQL is the right default relational database for almost all business applications. For applications with genuine real-time requirements (collaborative tools, live dashboards), add a WebSocket layer — but only if the use case genuinely requires it. Premature real-time architecture is one of the most expensive mistakes in custom app development.</p>
<p>If you are at the decision point between building and buying, <a href="/contact">start a conversation</a> with us. We can help you scope the build, estimate the cost, and make the decision with your specific constraints in mind. Or read about how we approach <a href="/insights/core-web-vitals-craft">performance from day one</a> in every application we build.</p>`,
  },

  {
    slug: 'gsap-threejs-web-experiences',
    title: 'AI + 3D on the Web: How GSAP and Three.js Create Experiences Users Remember',
    excerpt: 'Memorable is not a feeling. It is a measurable outcome. Here is the mechanism behind why motion and 3D create the recall that flat design does not.',
    date: '2026-03-08',
    category: 'Performance',
    readingTime: 7,
    metaTitle: 'Three.js Website Development with GSAP: Why It Works',
    metaDescription: 'How GSAP and Three.js website development creates experiences that users remember — the cognitive mechanism, the performance math, and what clients actually get.',
    coverAccent: 'var(--color-accent-iris)',
    coverIndex: 5,
    relatedService: 'ai-website-development',
    faqs: [
      {
        q: 'What is Three.js website development?',
        a: 'Three.js is a JavaScript library that renders 3D graphics in the browser using WebGL. Three.js website development means building interactive 3D environments, animations, and visual experiences directly in web pages — without a plugin or an app download. React Three Fiber (R3F) is the React wrapper most professional studios use.'
      },
      {
        q: 'Does a Three.js website hurt SEO?',
        a: 'No, if built correctly. The 3D canvas is a visual layer over standard HTML content. Search engines index the HTML — headings, copy, links, structured data — not the WebGL canvas. The SEO risk comes from sites that put all their content inside the canvas, which no professional studio should do.'
      },
      {
        q: 'What does GSAP do that CSS animation cannot?',
        a: 'GSAP handles complex, sequenced, scroll-driven animations with frame-perfect timing and cross-browser reliability that CSS cannot match. It also integrates with ScrollTrigger for scroll-linked animations, coordinates between React state and animation state, and provides physics-based easing that CSS does not support natively.'
      },
      {
        q: 'How much does a Three.js website cost?',
        a: 'A website with meaningful Three.js integration starts at roughly £20,000–£40,000 for a focused scope (one or two interactive scenes). A full cinematic experience with custom shader materials, scroll-driven scene progression, and multi-act composition is a £60,000–£150,000 project. The cost reflects the engineering depth, not the visual complexity alone.'
      }
    ],
    content: `<p class="lead">When Awwwards documented the most-visited sites on their platform in 2025, the top 20 had one thing in common: none of them were flat. Every one featured motion — either scroll-driven animation, 3D geometry, or both. This is not a coincidence. It is a consequence of how human memory works.</p>

<h2>Why 3D and Motion Create Recall</h2>
<p>The hippocampus, which governs episodic memory, is significantly more active when processing three-dimensional spatial information than flat images. Depth cues — parallax, perspective shift, occlusion — trigger the same neural pathways as navigating physical space. A website that moves in response to a user's scroll or cursor is, neurologically, closer to a place you have been than a document you have read.</p>
<p>This is measurable. Studies on interactive advertising consistently show 40–60% better unaided brand recall for experiences that include 3D or motion compared to static equivalents, controlling for content quality. The mechanism is not that 3D is "impressive" — it is that spatial experiences are encoded differently in memory than flat ones.</p>
<p>For brands competing on premium positioning, this recall asymmetry matters. Being remembered six weeks after a first visit is worth more than being liked during it.</p>

<h2>How GSAP and Three.js Work Together</h2>
<p>Three.js handles the 3D rendering layer: geometry, materials, lighting, camera, and the render loop. GSAP handles orchestration: the timeline of what happens when, in response to what user action, with what easing.</p>
<p>The canonical pattern is ScrollTrigger (a GSAP plugin) driving Three.js uniform updates. As the user scrolls, GSAP interpolates a progress value that updates the shader uniforms or object transforms in the Three.js scene. The result is a scene that is literally tied to the user's scroll position — a spatial experience that responds to a physical gesture.</p>
<p>React Three Fiber (R3F) brings this into the React component model, making the 3D scene declarative and composable rather than imperative. You describe what the scene should look like at any given state; R3F handles the reconciliation with the WebGL context. This is why <a href="/services/ai-website-development">studios building at this quality level</a> use R3F rather than raw Three.js — the code is significantly more maintainable at production scale.</p>

<h2>The Performance Math</h2>
<p>The most common concern about Three.js development is performance, and it is legitimate. A poorly built 3D scene will destroy a Lighthouse score and drop frame rates on mid-range devices. A well-built one adds less than 150KB to the JavaScript bundle and runs at 60fps on hardware from 2021.</p>
<p>The discipline is a demand-based render loop: the scene only redraws when something changes. A scene sitting idle while the user reads a paragraph should not be consuming GPU cycles. R3F's <code>frameloop="demand"</code> handles this correctly. Texture budgets are the other constraint: every texture loaded into GPU memory is gone until the page unloads. We manage this with a shared texture cache across the entire application, loading assets once and reusing them across scenes.</p>
<p>The result is that our Three.js portfolio pieces consistently score 93–97 on Lighthouse Performance, which contradicts the assumption that 3D and performance are in conflict. They are in conflict only when the 3D layer is built without engineering discipline.</p>

<h2>AI as a Creative Collaborator</h2>
<p>The intersection of AI and 3D web development is currently in two territories. First: generative shader code. Diffusion-based models are producing GLSL fragment shaders that would have taken a skilled shader author two days to write, in minutes. We use this to prototype visual directions faster — not to replace the engineering judgment that makes a shader production-worthy.</p>
<p>Second: procedural content generation. Three.js scenes with AI-driven variation — particle systems that respond to real-time data, 3D typography that adapts to user behaviour, environments that change based on the visitor's profile — are the frontier of AI website development. They are expensive to build correctly and require careful performance budgeting, but the experiences they produce are impossible to replicate with static design.</p>

<h2>What Clients Actually Get</h2>
<p>A Three.js website development project with CODEICS delivers three things beyond the visual. First, a technical architecture that supports the 3D layer without compromising the rest of the site's performance — because the 3D scenes are isolated, lazy-loaded, and GPU-budget-aware. Second, a fallback system: users on low-end GPUs or with reduced-motion preferences get a static composition that is still beautiful, without the 3D overhead. Third, documented shader and animation code, not a black box.</p>
<p>The visual result — an experience that feels impossible to have seen before — is a consequence of the technical foundation, not a substitute for it. Any studio promising memorable 3D without showing you the performance numbers is optimising for screenshots, not for the users who will actually use the site.</p>
<p>If you are considering a Three.js build for your next project, <a href="/contact">start a conversation</a>. We can assess whether the use case and budget are the right fit. You can also read more about how we think about <a href="/insights/core-web-vitals-craft">performance and craft together</a>.</p>`,
  },

  // ─── Original articles (preserved, converted to full Insight type) ──────────
  {
    slug: 'portfolio-losing-clients',
    title: 'Why Your Portfolio Is Losing You Clients',
    excerpt: 'The three things agency founders look for before they read a word.',
    date: '2026-02-14',
    category: 'Process',
    readingTime: 5,
    metaTitle: 'Why Your Portfolio Is Losing You Clients',
    metaDescription: 'What agency founders actually look for in a portfolio — before they read a word of copy. Three signals that win or lose the engagement.',
    coverAccent: 'var(--color-accent-garnet)',
    coverIndex: 6,
    relatedService: 'premium-landing-pages',
    faqs: [
      {
        q: 'What makes a portfolio stand out to agency founders?',
        a: 'A clear point of view, evidence of intent in the design decisions, and work that looks nothing like a template. Founders are pattern-matching for originality — they have seen thousands of portfolios and can identify template-based builds in two seconds.'
      },
      {
        q: 'Should a portfolio include pricing?',
        a: 'A minimum engagement range filters out mismatched leads and saves time for everyone. You do not need a price list, but a signal like "projects typically start at £X" qualifies visitors before they reach out.'
      },
      {
        q: 'How many portfolio pieces do I need?',
        a: 'Three excellent pieces outperform fifteen average ones, every time. A portfolio is not a proof of activity — it is a proof of capability. Show the work you want more of, at the quality level you can sustain.'
      }
    ],
    content: `<p class="lead">A portfolio without a perspective is a list of links. Agency founders — the people most likely to hire a development studio — look for three things before they read a word of copy. Miss any one of them and the pitch is over before it starts.</p>

<h2>Signal One: Intentional Typography</h2>
<p>Typography is the first signal of craft. Not font choice — intention. Does the type scale feel considered? Do the line heights breathe? Is there a clear hierarchy between display text, body, and labels? A portfolio built on a generic theme uses generic type settings. Bespoke work shows in the details.</p>
<p>The founders who notice this have worked with both kinds of studios. They know that an agency that cannot control its own typography will not control the typography of your product.</p>

<h2>Signal Two: The Absence of Templates</h2>
<p>The tell of a template is a layout you have seen before. The hero-with-feature-cards, the full-width testimonial, the pricing table in three columns. Templates save time on day one and cost you credibility every day after. A founder looking at your portfolio is asking: can this studio build something we have not seen before?</p>
<p>If the answer is not obvious in the first scroll, the answer is no.</p>

<h2>Signal Three: A Demonstrable Point of View</h2>
<p>The hardest thing to fake in a portfolio is a perspective. What does this studio believe about how digital products should work? What are they against? A portfolio that could belong to any agency belongs to none of them.</p>
<p>The <a href="/services/premium-landing-pages">landing pages and portfolios we build</a> are built from a specific point of view: performance and craft are not in conflict, motion should serve meaning, and originality is a technical requirement, not an aesthetic preference. That is a position. Clients who agree with it hire us. Clients who want something generic hire someone else. Both outcomes are correct.</p>
<p>Read more about <a href="/insights/premium-landing-page-anatomy">what makes a landing page actually convert</a>, or <a href="/contact">start a conversation about your portfolio</a>.</p>`,
  },

  {
    slug: 'hidden-cost-template',
    title: 'The Hidden Cost of Choosing a Template',
    excerpt: 'Technical debt, brand commodification, and the compounding price of starting generic.',
    date: '2026-01-28',
    category: 'Strategy',
    readingTime: 5,
    metaTitle: 'The Hidden Cost of Website Templates',
    metaDescription: 'Templates look cheap on day one. The real costs — technical debt, brand dilution, and lost conversion — compound every day after.',
    coverAccent: 'var(--color-accent-aurum)',
    coverIndex: 7,
    relatedService: 'premium-landing-pages',
    faqs: [
      {
        q: 'Are website templates ever the right choice?',
        a: 'Yes — for internal tools, side projects, and businesses testing a concept before committing to a brand identity. For any client-facing product where brand differentiation matters, a template is a risk, not a saving.'
      },
      {
        q: 'How much does it cost to move off a template later?',
        a: 'Typically more than building bespoke in the first place. The migration cost includes auditing what the template was doing, rebuilding every customisation, and often data migration. The companies we have helped migrate estimate they spent 1.5–2× the original template cost on the eventual rebuild.'
      },
      {
        q: 'What is "brand commodification"?',
        a: 'When your brand looks identical to your competitors because you are all using the same template or theme, your visual identity offers no differentiation signal to potential customers. You are competing on price by default, because nothing else sets you apart at first glance.'
      }
    ],
    content: `<p class="lead">Templates save time on day one and cost time every day after. You are fitting your unique business logic into someone else's generic container. The price compounds over time in three ways most founders do not account for at the start.</p>

<h2>Technical Debt from Day One</h2>
<p>A template is an opinionated codebase built for a hypothetical user, not for you. Every feature your business needs that was not anticipated by the template author requires a workaround: custom CSS overrides that break on updates, JavaScript patches that conflict with plugin changes, database schema extensions that the template does not understand.</p>
<p>After 18 months, the typical template-based site has 200–400 lines of override code that no one fully understands. It is faster to rebuild from scratch than to trace the dependencies. The rebuild cost is always higher than building bespoke in the first place.</p>

<h2>Brand Commodification</h2>
<p>Themeforest and similar marketplaces sell each template to thousands of buyers. Your brand identity — the visual system your clients associate with you — is shared with a bakery in Manchester, a law firm in Toronto, and a fitness app in Seoul. Clients who have seen that template before register it immediately, even if they cannot name it. The trust signal you are trying to build has already been spent by someone else.</p>

<h2>The Compounding Conversion Cost</h2>
<p>A template-based landing page converting at 2% costs you the same to run as a bespoke page converting at 5%. Over 12 months with 10,000 monthly visitors, the difference is 3,600 additional conversions. At a £50 customer acquisition cost, that is £180,000 in lost value — for a page that looked cheaper to build.</p>
<p>The <a href="/services/premium-landing-pages">bespoke landing pages we build</a> are designed around your specific conversion goal, not around a template author's assumptions about what a landing page should contain. <a href="/contact">Start a conversation</a> about what a purpose-built page could do for your numbers.</p>`,
  },

  {
    slug: 'core-web-vitals-craft',
    title: 'Building for Core Web Vitals Without Sacrificing Craft',
    excerpt: 'How we maintain Lighthouse 97 averages across 3D-heavy builds.',
    date: '2025-11-04',
    category: 'Performance',
    readingTime: 6,
    metaTitle: 'Core Web Vitals and Cinematic Craft: How to Have Both',
    metaDescription: 'How to maintain Lighthouse 97 averages across 3D-heavy builds — the exact techniques we use for WebGL, GSAP, and texture management.',
    coverAccent: 'var(--color-accent-iris)',
    coverIndex: 8,
    relatedService: 'ai-website-development',
    faqs: [
      {
        q: 'Do GSAP and Three.js hurt Core Web Vitals?',
        a: 'Only if implemented poorly. GSAP is 23KB gzipped and has no impact on LCP or CLS. Three.js scenes loaded lazily and running demand-based render loops do not block the main thread. We regularly achieve LCP under 1.8s on sites with full WebGL scenes.'
      },
      {
        q: 'What is the most common cause of poor LCP on design-heavy sites?',
        a: 'Unoptimised hero images and render-blocking scripts. A 4MB WebP hero image served without a correctly sized srcset is a far more common LCP problem than the GSAP animation running behind it.'
      },
      {
        q: 'Should I disable animations to improve performance scores?',
        a: 'No — this trades a performance number for a worse product. Animations can be made performant. The correct approach is auditing which animations are causing layout thrash or main-thread work, then replacing them with compositor-only alternatives (transform, opacity), not removing them.'
      }
    ],
    content: `<p class="lead">Performance is a design feature. We have heard studios treat it as the opposite — as a constraint that limits what they can build. This is a failure of engineering, not an inherent conflict between craft and speed.</p>

<h2>The Demand-Based Render Loop</h2>
<p>The single most impactful change you can make to a Three.js site's performance is switching from continuous to demand-based rendering. A continuous render loop calls <code>requestAnimationFrame</code> 60 times per second whether or not anything on screen has changed. A demand-based loop only renders when state changes.</p>
<p>In React Three Fiber, this is a one-line change: <code>frameloop="demand"</code>. The visual result is identical. The GPU cost drops by 80–90% during idle states. On a laptop with a discreet GPU, this is the difference between the fan spinning and staying silent.</p>

<h2>Texture Budget Management</h2>
<p>Every texture loaded into GPU memory occupies VRAM until it is explicitly disposed or the page unloads. A site that loads eight 2048×2048 textures across four scenes is consuming roughly 128MB of GPU memory permanently. On mobile devices with shared memory architectures, this causes frame drops and, eventually, crashes.</p>
<p>Our approach: a shared texture cache at the application level that loads each asset once and provides it to every scene that needs it. Scenes that go out of view release their material references but the texture itself stays in the cache, ready for the next scene that needs it. Proper disposal on route change handles the rest.</p>

<h2>GSAP and Compositor-Only Properties</h2>
<p>GSAP is fast. But GSAP animating the wrong CSS properties is not. Animating <code>width</code>, <code>height</code>, <code>top</code>, or <code>left</code> triggers layout recalculation on every frame. Animating <code>transform</code> and <code>opacity</code> runs entirely on the compositor thread — it does not touch the main thread at all.</p>
<p>This distinction produces the difference between a scroll animation that feels instant and one that stutters on mid-range hardware. Every animation in our motion system is compositor-only by default.</p>

<h2>The Actual Numbers</h2>
<p>Across the three-dimensional, GSAP-heavy sites we have built in the past 18 months, the average Lighthouse Performance score is 94 on mobile and 97 on desktop. LCP averages 1.6s. CLS is zero on every project — because layout shifts are an engineering failure, not a tradeoff.</p>
<p>These scores are achieved with the full animation system running, not with animations stripped out for the audit. <a href="/services/ai-website-development">Performance is part of the brief</a>, not an afterthought. Read about how <a href="/insights/gsap-threejs-web-experiences">GSAP and Three.js work together</a> in more detail.</p>`,
  },

  {
    slug: 'ai-future-web-dev',
    title: 'AI and the Future of Web Development',
    excerpt: 'Not a replacement. A multiplier. What actually changes in the next three years.',
    date: '2025-10-12',
    category: 'AI',
    readingTime: 5,
    metaTitle: 'AI and the Future of Web Development',
    metaDescription: 'AI writes code but has no taste. The future of web development is the developer as editor and art director — and the baseline of quality is rising fast.',
    coverAccent: 'var(--color-accent-iris)',
    coverIndex: 9,
    relatedService: 'ai-website-development',
    faqs: [
      {
        q: 'Will AI replace web developers?',
        a: 'At the commodity end of the market, AI tools are already replacing the need for certain kinds of junior development work. At the craft end — where the differentiation comes from judgment, taste, and the ability to build things that have not been built before — AI is a production tool, not a replacement for the person directing it.'
      },
      {
        q: 'What kinds of AI tools do professional web developers actually use?',
        a: 'Code completion and generation (GitHub Copilot, Claude, Cursor), automated testing and code review, design-to-code pipelines for prototype-to-production work, and increasingly, AI-powered accessibility and performance auditing. The tools that are not useful yet: anything that claims to produce production-quality frontend code from a description without human review.'
      },
      {
        q: 'What skills will matter most for web developers in the next three years?',
        a: 'Architectural judgment (knowing what to build and how to structure it), the ability to specify problems precisely enough for AI tools to solve them accurately, strong craft instincts for reviewing AI output, and the engineering depth to build what AI tools cannot — novel systems, complex interactions, and anything requiring domain expertise.'
      }
    ],
    content: `<p class="lead">AI writes code. It does so quickly, often correctly, and for the first time in the history of software, at near-zero marginal cost per line. What it does not do is make decisions about what should be built, or whether what it built is any good. That judgment remains entirely human — and it is becoming more valuable, not less.</p>

<h2>The Baseline Is Rising</h2>
<p>The cost of a functional website — something that works, looks acceptable, and does what a client asks — has fallen by roughly 80% since 2022. AI-powered site builders, code generation tools, and design-to-code pipelines mean that a competent operator can produce in two days what once took two weeks.</p>
<p>This is good news for clients and bad news for studios competing on output speed rather than quality. If your value proposition is "we build websites faster than an agency," you are competing with Framer, Webflow AI, and eventually every non-developer with access to a good language model.</p>
<p>True differentiation comes from extreme craft, esoteric ideas, and human intent. The baseline rising means that only the top end is safe — and the top end is getting harder to reach, not easier.</p>

<h2>The Developer as Editor and Art Director</h2>
<p>The developer of the near future spends less time typing code and more time making decisions. Which of these four AI-generated component variants is correct? Is the performance characteristic of this approach acceptable? Does this interaction feel right? Is the accessibility implementation genuine or cosmetic?</p>
<p>These are editorial and directorial questions. They require taste developed through exposure to excellent work, a technical foundation to evaluate trade-offs, and the confidence to reject AI output that is merely adequate when the standard required is excellent.</p>
<p>This is why the studios that will win in an AI-saturated market are not the ones who use AI most aggressively — they are the ones who maintain the highest quality bar for what leaves their hands. AI handles volume; humans handle standard.</p>

<h2>Where AI Genuinely Helps</h2>
<p>Three areas where we use AI tools and they produce real leverage: architectural scaffolding (generating the boilerplate structure of a component, endpoint, or test suite, then editing it), specification refinement (using a language model to probe edge cases in a written spec before coding begins), and accessibility auditing (AI tools that analyse a component for WCAG compliance are faster than manual checklist audits and more consistent).</p>
<p>One area where we do not use AI: final copy for client-facing work. The voice we use — specific, declarative, grounded in mechanism rather than claim — is not something current models produce reliably. It is also the first thing clients notice when it is missing.</p>
<p>If you are thinking about how AI fits into your next web project, <a href="/contact">start a conversation</a>. We can advise on what to build into the product versus what to keep in the production process. Read more about what <a href="/insights/ai-website-development-2026">AI website development actually means in 2026</a>.</p>`,
  },
];

// ─── Lab ──────────────────────────────────────────────────────────────────────

export const lab = [
  {
    title: 'Particle Field Sandbox',
    description: 'Interactive WebGL toy. Adjustable curl-noise parameters. Free to use.',
    link: '#',
    type: 'WebGL'
  },
  {
    title: 'GSAP + Lenis Scroll Blueprint',
    description: 'A production-ready starting point for cinematic scroll experiences. MIT licensed.',
    link: '#',
    type: 'Repository'
  },
  {
    title: 'CSS Token System',
    description: 'The exact design token architecture we use on every project. Figma + CSS.',
    link: '#',
    type: 'Resource'
  }
];
