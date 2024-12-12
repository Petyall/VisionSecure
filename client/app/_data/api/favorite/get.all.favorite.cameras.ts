import { Camera } from '../../types';
import { methodDefault } from '../methodDefault';

type Response = {
  cameras: Pick<
    Camera,
    | 'id'
    | 'name'
    | 'stream_url'
    | 'location'
    | 'created_at'
    | 'updated_at'
  >[];
  detail?: string;
};

export const getAllFavoriteCamera = async (): Promise<Response> =>
  methodDefault<Response>(`cameras/favorite/all`, {
    method: 'GET',
  });
