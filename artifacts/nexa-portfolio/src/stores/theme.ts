import { create } from 'zustand';

type Theme = 'aurum' | 'iris' | 'garnet';

interface ThemeState {
  theme: Theme;
  mode: 'cinematic' | 'manual';
  setTheme: (theme: Theme, mode: 'cinematic' | 'manual') => void;
  initialize: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'aurum',
  mode: 'cinematic',
  setTheme: (theme, mode) => {
    set({ theme, mode });
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      if (mode === 'manual') {
        localStorage.setItem('nexa-theme', theme);
        localStorage.setItem('nexa-theme-mode', 'manual');
      } else {
        localStorage.removeItem('nexa-theme');
        localStorage.removeItem('nexa-theme-mode');
      }
    }
  },
  initialize: () => {
    if (typeof document !== 'undefined') {
      const savedTheme = localStorage.getItem('nexa-theme') as Theme;
      const savedMode = localStorage.getItem('nexa-theme-mode');
      if (savedMode === 'manual' && savedTheme) {
        set({ theme: savedTheme, mode: 'manual' });
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        document.documentElement.setAttribute('data-theme', 'aurum');
      }
    }
  }
}));
