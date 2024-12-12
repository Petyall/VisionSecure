import { Camera } from '../cameras/camera.interface';

export interface UserCamera {
  user_id: string;
  camera_id: number;
  camera?: Camera | null;
}
