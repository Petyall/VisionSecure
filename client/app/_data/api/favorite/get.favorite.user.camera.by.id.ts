import { Camera } from '../../types';
import { methodDefault } from '../methodDefault';

type Params = Pick<Camera, 'id'>;

type Response = {
  cameras: Pick<
    Camera,
    | 'id'
    | 'name'
    | 'stream_url'
    | 'location'
    | 'created_at'
    | 'updated_at'
  >;
  detail?: string;
};

export const getFavoriteUserCameraById = async ({ id }: Params): Promise<Response> =>
  methodDefault<Response>(`cameras/favorite/${id}`, {
    method: 'GET',
  });
