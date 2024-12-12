import { Camera } from '../../types';
import { methodDefault } from '../methodDefault';

type Response = {
  cameras?: Pick<
    Camera,
    | 'id'
    | 'name'
    | 'location'
    | 'stream_url'
    | 'created_at'
    | 'updated_at'
  >[];
  detail?: string;
};

export const getAllCameras = async (): Promise<Response> =>
  methodDefault<Response>('cameras/all', {
    method: 'GET',
  });
