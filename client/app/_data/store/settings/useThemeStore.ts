import { create } from 'zustand';

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('app-theme') as 'light' | 'dark';
    if (storedTheme) return storedTheme;

    const root = window.document.documentElement;
    const dataTheme = root.getAttribute('data-theme') as 'light' | 'dark';
    if (dataTheme) return dataTheme;

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return 'dark';
};

export type ITopTableStore = {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ITopTableStore>((set) => ({
  theme: getInitialTheme(),
  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      if (root) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('app-theme', theme);
      }
    }
    set({ theme });
  },
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        const root = window.document.documentElement;
        if (root) {
          root.setAttribute('data-theme', newTheme);
          localStorage.setItem('app-theme', newTheme);
        }
      }
      return { theme: newTheme };
    });
  },
}));
