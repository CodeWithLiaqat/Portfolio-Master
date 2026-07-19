import { useSmoothScroll } from '@/motion/scroll';
import { Nav } from '@/components/common/Nav';
import { Cursor } from '@/components/common/Cursor';
import { Link } from 'wouter';

export default function Custom404() {
  useSmoothScroll();

  return (
    <div className="bg-bg-0 min-h-screen text-text-main flex flex-col items-center justify-center overflow-hidden">
      <Cursor />
      <Nav />
      
      {/* Visual representation of broken artifact */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0">
         <div className="absolute inset-0 border border-error/20 rounded-full rotate-45 scale-y-50 blur-[2px]" />
         <div className="absolute inset-0 border border-error/20 rounded-full -rotate-45 scale-x-50 blur-[2px]" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-error rounded-full shadow-[0_0_40px_var(--color-error)] animate-pulse" />
      </div>

      <main className="relative z-10 text-center px-6">
        <h1 className="text-[15vw] font-display font-bold leading-none text-text-main mix-blend-difference mb-4 select-none">404</h1>
        <p className="text-2xl text-text-2 mb-12">The transmission was lost. We couldn't find that page.</p>
        
        <Link href="/" className="inline-flex bg-text-main text-bg-0 px-8 py-4 rounded-full text-sm font-mono uppercase tracking-wider hover:bg-accent transition-colors">
          Return to Base
        </Link>
      </main>
    </div>
  );
}
