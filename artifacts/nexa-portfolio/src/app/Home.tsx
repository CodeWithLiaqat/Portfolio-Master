import { useEffect, useRef } from 'react';
import { useSmoothScroll } from '@/motion/scroll';
import { useSEO } from '@/lib/seo';
import { useJsonLd, buildPerson, buildProfessionalService } from '@/lib/jsonld';
import { useThemeStore } from '@/stores/theme';
import { useSceneStore } from '@/stores/scene';
import { Nav } from '@/components/common/Nav';
import { Footer } from '@/components/common/Footer';
import { Cursor } from '@/components/common/Cursor';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ActArrival } from '@/components/sections/home/ActArrival';
import { ActSignal } from '@/components/sections/home/ActSignal';
import { ActForge } from '@/components/sections/home/ActForge';
import { ActGallery } from '@/components/sections/home/ActGallery';
import { ActConstellation } from '@/components/sections/home/ActConstellation';
import { ActArchive } from '@/components/sections/home/ActArchive';
import { ActBeacon } from '@/components/sections/home/ActBeacon';

export function Home() {
  useSmoothScroll();
  useSEO({
    title: 'Cinematic AI-Era Web Studio',
    description: 'CODEICS builds Awwwards-quality web experiences — WebGL, GSAP, React — for founders and agencies who refuse to settle for ordinary.',
    canonicalPath: '/',
  });
  useJsonLd('home', [buildPerson(), buildProfessionalService()]);
  const initTheme = useThemeStore(s => s.initialize);
  const setAct = useSceneStore(s => s.setAct);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    initTheme();
    
    const acts = [
      { selector: '.act-arrival', act: 1 },
      { selector: '.act-signal', act: 2 },
      { selector: '.act-forge', act: 3 },
      { selector: '.act-gallery', act: 4 },
      { selector: '.act-constellation', act: 5 },
      { selector: '.act-archive', act: 6 },
      { selector: '.act-beacon', act: 7 },
    ];

    const triggers: ScrollTrigger[] = [];

    setTimeout(() => {
      acts.forEach(({ selector, act }) => {
        const el = document.querySelector(selector);
        if (el) {
          const st = ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onEnter: () => setAct(act),
            onEnterBack: () => setAct(act),
          });
          triggers.push(st);
        }
      });
    }, 500); // allow DOM to settle

    return () => {
      triggers.forEach(t => t.kill());
      setAct(1); // reset
    };
  }, [initTheme, setAct]);

  return (
    <>
      <Cursor />
      <Nav />
      
      {/* Background blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-30 mix-blend-screen">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-accent rounded-full mix-blend-screen filter blur-[120px] animate-blob-spin origin-center opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-accent-2 rounded-full mix-blend-screen filter blur-[150px] animate-blob-spin-reverse origin-center opacity-20"></div>
      </div>

      <main id="main-content" ref={mainRef} className="relative z-10 pt-[env(safe-area-inset-top)]">
        <div className="act-arrival"><ActArrival /></div>
        <div className="act-signal"><ActSignal /></div>
        <div className="act-forge"><ActForge /></div>
        <div className="act-gallery"><ActGallery /></div>
        <div className="act-constellation"><ActConstellation /></div>
        <div className="act-archive"><ActArchive /></div>
        <div className="act-beacon"><ActBeacon /></div>
      </main>

      <Footer />
    </>
  );
}
