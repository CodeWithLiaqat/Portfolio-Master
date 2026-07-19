import gsap from 'gsap';

/**
 * Navigate with a View Transitions API morph + GSAP veil fallback.
 * Usage: navigateTo('/portfolio', navigate) where navigate is from useLocation.
 */
export function navigateTo(
  href: string,
  navigate: (href: string) => void,
  options: { immediate?: boolean } = {}
): void {
  if (options.immediate) {
    navigate(href);
    return;
  }

  // View Transitions API — native GPU compositing.
  // Use typeof check to avoid TypeScript narrowing `document` to `never` in else-branch
  // when DOM lib types include startViewTransition on Document.
  const hasViewTransition = typeof (document as Document & { startViewTransition?: (cb: () => void) => void }).startViewTransition === 'function';
  if (hasViewTransition) {
    (document as Document & { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
      navigate(href);
    });
    return;
  }

  // Fallback: GSAP gradient-veil wipe
  const veil = document.createElement('div');
  veil.style.cssText = [
    'position: fixed',
    'inset: 0',
    'z-index: 9000',
    'background: linear-gradient(135deg, var(--accent) 0%, var(--bg-0) 100%)',
    'transform: scaleX(0)',
    'transform-origin: left center',
    'pointer-events: none',
  ].join(';');
  document.body.appendChild(veil);

  gsap.to(veil, {
    scaleX: 1,
    duration: 0.4,
    ease: 'power3.inOut',
    onComplete: () => {
      navigate(href);
      gsap.to(veil, {
        scaleX: 0,
        transformOrigin: 'right center',
        duration: 0.4,
        ease: 'power3.inOut',
        delay: 0.05,
        onComplete: () => { veil.remove(); },
      });
    },
  });
}

/**
 * CSS view-transition-name values for shared-element morphs.
 * Apply to case study card images and their hero counterparts.
 */
export function getViewTransitionName(slug: string, role: 'card' | 'hero'): string {
  return `case-study-${slug}-${role}`;
}

/**
 * Inject the global View Transitions CSS once.
 * Called in App.tsx on mount.
 */
export function injectViewTransitionStyles(): void {
  if (document.getElementById('view-transition-styles')) return;

  const style = document.createElement('style');
  style.id = 'view-transition-styles';
  style.textContent = `
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation-duration: 0.9s;
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    }
    ::view-transition-old(case-study-image),
    ::view-transition-new(case-study-image) {
      animation-duration: 0.7s;
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    }
    @media (prefers-reduced-motion: reduce) {
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation-duration: 0.01s;
      }
    }
  `;
  document.head.appendChild(style);
}
