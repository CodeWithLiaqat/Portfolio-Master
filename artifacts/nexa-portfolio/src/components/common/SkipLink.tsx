/**
 * Visually hidden skip-to-content link — the very first focusable element in the DOM.
 * Reveals itself on keyboard focus so screen-reader and keyboard users can skip the nav.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-accent focus:text-bg-0 focus:px-4 focus:py-2 focus:rounded-full focus:font-mono focus:text-sm focus:uppercase focus:tracking-wider focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-0 focus:ring-accent"
    >
      Skip to main content
    </a>
  );
}
