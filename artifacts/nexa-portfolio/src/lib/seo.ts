import { useEffect } from 'react';

const SITE_NAME = 'NEXA';
const BASE_URL = 'https://nexa.studio';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.jpg`;

export interface SEOOptions {
  title: string;          // ≤60 characters, excluding site suffix
  description: string;    // ≤155 characters
  canonicalPath: string;  // e.g. '/portfolio' — no trailing slash
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  /** Pass true for 404 and other non-indexable pages */
  noIndex?: boolean;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Declaratively sets all SEO-relevant head tags for the current route.
 * Call in every page component.
 */
export function useSEO({ title, description, canonicalPath, ogImage, ogType = 'website', noIndex = false }: SEOOptions) {
  const fullTitle = `${title} — ${SITE_NAME}`;
  const canonical = `${BASE_URL}${canonicalPath}`;
  const image = ogImage ?? DEFAULT_OG_IMAGE;

  useEffect(() => {
    document.title = fullTitle;

    // Primary
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    setLink('canonical', canonical);

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:site_name', SITE_NAME);

    // Twitter / X
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
  }, [fullTitle, description, canonical, image, ogType]);
}
