import { useState, useRef, useCallback, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyGalleryProps {
  images: string[];
  title: string;
}

export function CaseStudyGallery({ images, title }: CaseStudyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered section reveal
  useGSAP(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
      },
    });
  }, []);

  // Lightbox open animation
  useEffect(() => {
    if (lightboxOpen && lightboxRef.current) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduced) {
        gsap.fromTo(
          lightboxRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }
        );
      }
      // Trap focus inside lightbox
      lightboxRef.current.focus();
    }
  }, [lightboxOpen, lightboxIndex]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const prevLightbox = useCallback(() => {
    setLightboxIndex(i => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const nextLightbox = useCallback(() => {
    setLightboxIndex(i => (i + 1) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, closeLightbox, prevLightbox, nextLightbox]);

  return (
    <>
      <section
        ref={sectionRef}
        className="mb-32 border-t border-border-main pt-32"
        aria-label={`${title} project gallery`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-12">
          <div className="md:col-span-4">
            <h2 className="text-eyebrow mb-2">Gallery</h2>
            <p className="text-sm text-text-2 font-mono">{images.length} screens</p>
          </div>
          <div className="md:col-span-8">
            <p className="text-text-2">Key screens and UI detail shots from the project.</p>
          </div>
        </div>

        {/* Main featured image */}
        <div className="w-full aspect-[16/9] bg-surface rounded-2xl overflow-hidden mb-4 relative group">
          <img
            src={images[activeIndex]}
            alt={`${title} — screenshot ${activeIndex + 1} of ${images.length}`}
            className="w-full h-full object-cover transition-opacity duration-300"
            loading="lazy"
          />
          {/* Click to expand overlay */}
          <button
            onClick={() => openLightbox(activeIndex)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30 cursor-zoom-in"
            aria-label={`Expand screenshot ${activeIndex + 1} in fullscreen`}
          >
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-bg-0/80 backdrop-blur-sm text-text-main text-sm font-mono border border-border-main">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1h4M1 1v4M13 1h-4M13 1v4M1 13h4M1 13v-4M13 13h-4M13 13v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Expand
            </span>
          </button>
        </div>

        {/* Thumbnail strip */}
        <div
          ref={trackRef}
          role="tablist"
          aria-label="Gallery thumbnails"
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        >
          {images.map((src, i) => (
            <button
              key={src}
              role="tab"
              aria-selected={activeIndex === i}
              aria-label={`View screenshot ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') setActiveIndex((i + 1) % images.length);
                if (e.key === 'ArrowLeft') setActiveIndex((i - 1 + images.length) % images.length);
              }}
              className={`
                flex-shrink-0 w-28 h-20 md:w-36 md:h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 outline-none
                focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0
                ${activeIndex === i
                  ? 'border-accent scale-100 opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-80 hover:border-border-main'}
              `}
            >
              <img
                src={src}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {/* Screen reader status */}
        <p className="sr-only" aria-live="polite">
          Showing screenshot {activeIndex + 1} of {images.length}
        </p>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery — screenshot ${lightboxIndex + 1} of ${images.length}`}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          <div
            ref={lightboxRef}
            tabIndex={-1}
            className="relative w-full max-w-6xl outline-none"
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              aria-label="Close gallery"
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors font-mono text-sm flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              ESC to close
            </button>

            {/* Image */}
            <img
              key={lightboxIndex}
              src={images[lightboxIndex]}
              alt={`${title} — screenshot ${lightboxIndex + 1} of ${images.length}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevLightbox}
                  aria-label="Previous screenshot"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={nextLightbox}
                  aria-label="Next screenshot"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </>
            )}

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6" role="presentation">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Go to screenshot ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    lightboxIndex === i ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
