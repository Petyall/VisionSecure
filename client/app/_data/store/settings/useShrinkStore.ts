import { create } from 'zustand';

interface UseShrinkStore {
  isShrink: boolean;
  setShrink: (value: boolean) => void;
  toggleShrink: () => void;
}

export const useShrinkStore = create<UseShrinkStore>((set) => ({
  isShrink: false,
  setShrink: (value) => set({ isShrink: value }),
  toggleShrink: () => set((state) => ({ isShrink: !state.isShrink })),
}));
