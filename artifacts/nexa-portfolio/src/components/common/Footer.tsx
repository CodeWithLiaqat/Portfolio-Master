import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-bg-1 pt-32 pb-8 border-t border-border-main mt-auto">
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center" aria-hidden="true">
        <span className="text-[20vw] font-display font-bold text-text-main whitespace-nowrap select-none">CODEICS</span>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-display mb-6">Let's build what's next.</h3>
          <Link href="/contact" className="inline-flex bg-text-main text-bg-0 px-8 py-3 rounded-full text-sm font-mono uppercase tracking-wider hover:bg-accent transition-colors">
            Start a project
          </Link>
        </div>
        
        <div>
          <h4 className="text-eyebrow mb-6">Navigation</h4>
          <ul className="space-y-4">
            {['Portfolio', 'Services', 'Insights', 'Lab', 'About'].map(item => (
              <li key={item}>
                <Link href={`/${item.toLowerCase()}`} className="text-text-2 hover:text-accent transition-colors relative inline-block group">
                  {item}
                  <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent origin-right scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-eyebrow mb-6">Connect</h4>
          <ul className="space-y-4">
            <li>
              <a href="mailto:hello@codeics.com" className="text-text-2 hover:text-accent transition-colors relative inline-block group">
                Email
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent origin-right scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
            <li>
              <a href="https://wa.me/923045722622" target="_blank" rel="noopener noreferrer" className="text-text-2 hover:text-accent transition-colors relative inline-block group">
                WhatsApp
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent origin-right scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
            <li>
              <Link href="/contact" className="text-text-2 hover:text-accent transition-colors relative inline-block group">
                Contact Form
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent origin-right scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border-main text-sm text-text-2">
        <p>© 2026 CODEICS. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/legal/privacy" className="hover:text-text-main transition-colors">Privacy Policy</Link>
          <Link href="/legal/terms" className="hover:text-text-main transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
