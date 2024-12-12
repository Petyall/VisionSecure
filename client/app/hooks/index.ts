//#region Systems
import { useClickOutside } from './systems/useClickOutside';
//#endregion

//#region Authentication
import { useLogout } from './authentication/useLogout';
//#endregion

//#region User
//#endregion

//#region Cameras
import { useCameras } from './cameras/useCameras';
import { useFavoriteCamera } from './cameras/useFavoriteCamera';
import { useStream } from './cameras/useStream';
//#endregion

export {
  //#region Systems exports
  useClickOutside,
  //#endregion

  //#region Authentication exports
  useLogout,
  //#endregion

  //#region User exports
  //#endregion

  //#region Cameras exports
  useCameras,
  useFavoriteCamera,
  useStream,
  //#endregion
};
