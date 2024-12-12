import { create } from 'zustand';
import { User } from '@/app/_data/types';

interface AuthState {
  user: User | null;
  setUserData: (user: User | null) => void;

  isAuth: boolean;
  setAuth: (isAuth: boolean) => void;
  
  loadAuth: boolean;
  setLoad: (loadAuth: boolean) => void;

  allUsers: User[] | null;
  setAllUsers: (allUsers: User[] | null) => void;
  
  currentUser: User | null;
  setCurrentUser: (currentUser: User | null) => void;
}

export const useUserStore = create<AuthState>((set) => ({
  user: null,
  setUserData: (user: User | null) => set({ user }),

  isAuth: false,
  setAuth: (isAuth: boolean) => set({ isAuth }),
  
  loadAuth: false,
  setLoad: (loadAuth: boolean) => set({ loadAuth }),

  allUsers: null,
  setAllUsers: (allUsers: User[] | null) => set({ allUsers }),

  currentUser: null,
  setCurrentUser: (currentUser: User | null) => set({ currentUser }),
}));
