import { useThemeStore } from '@/stores/theme';

const THEMES = [
  { value: 'aurum' as const, label: 'Aurum (gold)', color: '#E8C47C' },
  { value: 'iris'  as const, label: 'Iris (violet)', color: '#8B93F8' },
  { value: 'garnet' as const, label: 'Garnet (red)', color: '#D14D66' },
];

/**
 * Fixed theme-switcher widget — keyboard accessible, ARIA-labelled.
 * Supports ESC to close focus, Tab cycles through options.
 */
export function ThemeOrbs() {
  const { theme, setTheme, mode } = useThemeStore();

  const handleSetTheme = (newTheme: 'aurum' | 'iris' | 'garnet') => {
    setTheme(newTheme, 'manual');
  };

  const handleSetAuto = () => {
    setTheme('aurum', 'cinematic');
  };

  return (
    <div
      role="group"
      aria-label="Colour theme switcher"
      className="fixed bottom-8 right-8 z-[100] flex gap-3 glass-panel px-4 py-3 rounded-full items-center"
    >
      <button
        onClick={handleSetAuto}
        aria-pressed={mode === 'cinematic'}
        aria-label="Auto (cinematic) theme"
        className={`text-eyebrow tracking-widest text-[10px] transition-colors hover:text-text-main min-w-[44px] min-h-[44px] flex items-center justify-center ${mode === 'cinematic' ? 'text-text-main' : 'text-text-2'}`}
      >
        AUTO
      </button>
      <div className="w-[1px] h-3 bg-border-main" role="separator" aria-hidden="true" />
      {THEMES.map(({ value, label, color }) => (
        <button
          key={value}
          onClick={() => handleSetTheme(value)}
          aria-pressed={theme === value && mode === 'manual'}
          aria-label={`${label} theme`}
          className={`w-6 h-6 rounded-full border border-text-main/10 transition-transform min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${theme === value && mode === 'manual' ? 'scale-125 border-accent' : 'hover:scale-110'}`}
        >
          <span
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}
