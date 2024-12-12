import { Camera } from './camera.interface';

export interface FavoriteCamera {
  user_id: string;
  camera_id: string;
  camera?: Camera;
}
