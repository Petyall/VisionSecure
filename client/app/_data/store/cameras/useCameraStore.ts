import { create } from 'zustand';
import { Camera } from '../../types';

export interface CameraStore {
  currentCamera: Camera | null;
  setCurrentCamera: (currentCamera: Camera) => void;

  userCameras: Camera[];
  setUserCameras: (cameras: Camera[]) => void;

  allCameras: Camera[];
  setAllCameras: (cameras: Camera[]) => void;

  favoritesCameras: Camera[];
  setFavoritesCameras: (favoritesCameras: Camera[]) => void;
}

export const useCameraStore = create<CameraStore>((set) => ({
  currentCamera: null,
  setCurrentCamera: (currentCamera) => set({ currentCamera }),

  userCameras: [],
  setUserCameras: (userCameras) => set({ userCameras }),
  
  allCameras: [],
  setAllCameras: (allCameras) => set({ allCameras }),
  
  favoritesCameras: [],
  setFavoritesCameras: (favoritesCameras) => set({ favoritesCameras }),
}));
