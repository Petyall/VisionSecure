import { create } from 'zustand';

interface SkeletonStore {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useSkeletonStore = create<SkeletonStore>((set) => ({
  isLoading: true,
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
