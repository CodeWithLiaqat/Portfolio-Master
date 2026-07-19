import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Link, useLocation } from 'wouter';
import { AnimatePresence, motion } from 'motion/react';
import { MagneticButton } from './MagneticButton';
import { TransitionLink } from './TransitionLink';

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();
  
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      if (!navRef.current || isOpen) return;
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        gsap.to(navRef.current, { y: '-100%', duration: 0.4, ease: 'power2.inOut' });
      } else {
        gsap.to(navRef.current, { y: '0%', duration: 0.4, ease: 'power2.out' });
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 w-full z-[90] px-6 py-4 transition-transform">
        <div className="glass-panel mx-auto max-w-7xl rounded-full px-6 py-3 flex items-center justify-between">
          <TransitionLink href="/" className="font-display font-semibold tracking-[0.1em] text-xl relative group overflow-hidden">
            NEXA
            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent origin-right scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
          </TransitionLink>
          
          <div className="hidden md:flex items-center gap-8">
            {['Work', 'Services', 'Insights', 'Lab', 'About'].map(item => (
              <TransitionLink key={item} href={`/${item.toLowerCase() === 'work' ? 'portfolio' : item.toLowerCase()}`} className="text-sm font-medium text-text-2 hover:text-text-main transition-colors">
                {item}
              </TransitionLink>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <TransitionLink href="/contact" className="hidden md:inline-flex bg-accent text-bg-0 px-6 py-2 rounded-full text-sm font-mono uppercase tracking-wider hover:opacity-90 transition-opacity">
              Start a project
            </TransitionLink>
            
            <button 
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className={`w-6 h-[1px] bg-text-main transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
              <div className={`w-6 h-[1px] bg-text-main transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
            className="fixed inset-0 z-[80] bg-bg-1/95 backdrop-blur-xl flex flex-col justify-center px-6"
          >
            <div className="max-w-7xl mx-auto w-full">
              <div className="flex flex-col gap-6 text-4xl font-display mb-12">
                {['Home', 'Portfolio', 'Services', 'Insights', 'Lab', 'About'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
                  >
                    <TransitionLink href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="hover:text-accent transition-colors">
                      {item}
                    </TransitionLink>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <MagneticButton onClick={() => setLocation('/contact')} className="w-full sm:w-auto">
                  Start a project
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
