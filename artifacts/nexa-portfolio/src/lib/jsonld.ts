import { useEffect } from 'react';

const BASE_URL = 'https://codeics.com';

// ─── Schema type builders ────────────────────────────────────────────────────

export function buildPerson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'CODEICS',
    url: BASE_URL,
    jobTitle: 'AI Web Developer',
    sameAs: ['https://twitter.com/codeics', 'https://github.com/codeics'],
  };
}

export function buildProfessionalService() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'CODEICS',
    url: BASE_URL,
    description: 'Cinematic AI-era web experiences for founders and agencies demanding Awwwards-quality craft.',
    areaServed: 'Worldwide',
    serviceType: 'Web Development',
    priceRange: '$$$',
  };
}

export function buildService(service: {
  name: string;
  description: string;
  slug: string;
  price?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: `${BASE_URL}/services/${service.slug}`,
    provider: { '@type': 'Organization', name: 'CODEICS' },
    ...(service.price ? { offers: { '@type': 'Offer', price: service.price } } : {}),
  };
}

export function buildArticle(article: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url: `${BASE_URL}/insights/${article.slug}`,
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: article.author ?? 'CODEICS',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CODEICS',
      url: BASE_URL,
    },
  };
}

export function buildFAQPage(questions: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function buildBreadcrumb(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map(({ name, path }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${BASE_URL}${path}`,
    })),
  };
}

// ─── Hook ────────────────────────────────────────────────────────────────────

const SCRIPT_ID_PREFIX = 'jsonld-';

/**
 * Injects one or more JSON-LD <script> tags into <head>.
 * Each call scopes to a unique id so multiple schemas can coexist on one page.
 * Cleans up on unmount.
 */
export function useJsonLd(id: string, schemas: object | object[]) {
  useEffect(() => {
    const scriptId = `${SCRIPT_ID_PREFIX}${id}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    const list = Array.isArray(schemas) ? schemas : [schemas];
    script.textContent = JSON.stringify(list.length === 1 ? list[0] : list);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [id, JSON.stringify(schemas)]); // eslint-disable-line react-hooks/exhaustive-deps
}
