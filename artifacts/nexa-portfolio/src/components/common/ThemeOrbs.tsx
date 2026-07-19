import { useThemeStore } from '@/stores/theme';

export function ThemeOrbs() {
  const { theme, setTheme, mode } = useThemeStore();

  const handleSetTheme = (newTheme: 'aurum' | 'iris' | 'garnet') => {
    setTheme(newTheme, 'manual');
  };

  const handleSetAuto = () => {
    setTheme('aurum', 'cinematic');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex gap-3 glass-panel px-4 py-3 rounded-full items-center">
      <button 
        onClick={handleSetAuto}
        className={`text-eyebrow tracking-widest text-[10px] transition-colors hover:text-text-main ${mode === 'cinematic' ? 'text-text-main' : 'text-text-2'}`}
      >
        AUTO
      </button>
      <div className="w-[1px] h-3 bg-border-main" />
      <button onClick={() => handleSetTheme('aurum')} className={`w-4 h-4 rounded-full border border-text-main/10 transition-transform ${theme === 'aurum' && mode === 'manual' ? 'scale-125 border-accent' : 'hover:scale-110'}`} style={{ backgroundColor: '#E8C47C' }} />
      <button onClick={() => handleSetTheme('iris')} className={`w-4 h-4 rounded-full border border-text-main/10 transition-transform ${theme === 'iris' && mode === 'manual' ? 'scale-125 border-accent' : 'hover:scale-110'}`} style={{ backgroundColor: '#8B93F8' }} />
      <button onClick={() => handleSetTheme('garnet')} className={`w-4 h-4 rounded-full border border-text-main/10 transition-transform ${theme === 'garnet' && mode === 'manual' ? 'scale-125 border-accent' : 'hover:scale-110'}`} style={{ backgroundColor: '#D14D66' }} />
    </div>
  );
}
