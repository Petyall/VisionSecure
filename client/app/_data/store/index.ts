//#region Settings
import { useOffcanvasStore } from './settings/useOffcanvasStore';
import { useThemeStore } from './settings/useThemeStore';
import { useShrinkStore } from './settings/useShrinkStore';
//#endregion

//#region UI
import { useAlertStore } from './ui/useAlertStore';
import { useSkeletonStore } from './settings/useSkeletonStore';
import { useModalWindowStore } from './ui/useModalWindowStore';
//#endregion

//#region User
import { useUserStore } from './user/useUserStore';
//#endregion

//#region Cameras
import { useCameraStore } from './cameras/useCameraStore';
//#endregion

export {
  //#region Settings exports
  useThemeStore,
  useOffcanvasStore,
  useShrinkStore,
  //#endregion

  //#region UI exports
  useAlertStore,
  useSkeletonStore,
  useModalWindowStore,
  //#endregion

  //#region User exports
  useUserStore,
  //#endregion

  //#region Cameras exports
  useCameraStore,
  //#endregion
};
