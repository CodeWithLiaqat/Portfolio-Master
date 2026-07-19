import gsap from 'gsap';

// Simple text splitter utility since we shouldn't rely on Club GSAP SplitText if it fails
export function splitLines(element: HTMLElement) {
  const text = element.innerText;
  const words = text.split(' ');
  element.innerHTML = '';
  
  let lineDiv = document.createElement('div');
  lineDiv.style.overflow = 'hidden';
  let innerDiv = document.createElement('div');
  lineDiv.appendChild(innerDiv);
  element.appendChild(lineDiv);
  
  // A naive implementation for now, assuming responsive lines might need recalculation.
  // We'll wrap all text in a single overflow hidden block and animate it, 
  // or wrap each word. For true lines, you'd measure offsets.
  // As a fallback for "House headline reveal":
  element.innerHTML = text.split('\n').map(line => {
    if (!line.trim()) return '';
    return `<div style="overflow:hidden; display:block;"><div class="split-line" style="display:block;">${line}</div></div>`;
  }).join('');

  return element.querySelectorAll('.split-line');
}

export function revealLines(element: HTMLElement | null) {
  if (!element) return;
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

export function revealImage(element: HTMLElement | null) {
  if (!element) return;
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
