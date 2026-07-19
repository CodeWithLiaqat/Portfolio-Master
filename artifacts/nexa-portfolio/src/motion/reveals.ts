import gsap from 'gsap';

// Simple text splitter utility
export function splitLines(element: HTMLElement) {
  const text = element.innerText;
  element.innerHTML = text.split('\n').map(line => {
    if (!line.trim()) return '';
    return `<div style="overflow:hidden; display:block;"><div class="split-line" style="display:block;">${line}</div></div>`;
  }).join('');
  return element.querySelectorAll('.split-line');
}

/**
 * Reveals text lines by sliding them up from below.
 * Respects prefers-reduced-motion: skips animation and shows content immediately.
 */
export function revealLines(element: HTMLElement | null) {
  if (!element) return;

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Still split so element is structured, but make everything visible immediately
    splitLines(element);
    return;
  }

  const lines = splitLines(element);
  gsap.fromTo(lines,
    { yPercent: 110 },
    {
      yPercent: 0,
      duration: 1.4,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
      }
    }
  );
}

/**
 * Reveals an image with a clip-path wipe + scale.
 * Respects prefers-reduced-motion.
 */
export function revealImage(element: HTMLElement | null) {
  if (!element) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return; // Image is already visible; skip animation
  }

  gsap.fromTo(element,
    { clipPath: 'inset(100% 0 0 0)', scale: 1.06 },
    {
      clipPath: 'inset(0% 0 0 0)',
      scale: 1,
      duration: 1.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
      }
    }
  );
}
