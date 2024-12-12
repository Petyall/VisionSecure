//#region Stream
import { getStreamStartCamera } from './get.stream.start.camera';
import { getStreamStopCamera } from './get.stream.stop.camera';
//#endregion

export const streamApi = {
    start: getStreamStartCamera,
    stop: getStreamStopCamera,
};