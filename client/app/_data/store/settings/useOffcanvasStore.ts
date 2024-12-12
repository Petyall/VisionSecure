import { create } from 'zustand';

interface OffcanvasState {
  isOpen: boolean;
  toggleOffcanvas: () => void;
  closeOffcanvas: () => void;
  openOffcanvas: () => void;
}

export const useOffcanvasStore = create<OffcanvasState>((set) => ({
  isOpen: false,
  toggleOffcanvas: () => set((state) => ({ isOpen: !state.isOpen })),
  closeOffcanvas: () => set({ isOpen: false }),
  openOffcanvas: () => set({ isOpen: true }),
}));
