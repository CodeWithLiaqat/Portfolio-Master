import { useLocation } from 'wouter';
import { navigateTo } from '@/motion/transitions';
import type { ReactNode, CSSProperties } from 'react';

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
}

/**
 * Drop-in replacement for <Link> that fires a View Transition (native or veil fallback)
 * before committing the navigation. Use for primary navigation links.
 */
export function TransitionLink({ href, children, className, style, 'aria-label': ariaLabel }: TransitionLinkProps) {
  const [, navigate] = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let modifier-key combos open in a new tab normally
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigateTo(href, navigate);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
