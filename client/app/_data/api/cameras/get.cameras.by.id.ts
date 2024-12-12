import { Camera } from '../../types';
import { methodDefault } from '../methodDefault';

interface Params {
  id: Pick<Camera, 'id'>;
}

type Response = {
  camera?: Pick<
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

export const getCamerasById = async ({
  id,
}: Params): Promise<Response> =>
  methodDefault<Response>(`cameras/${id.id}`, {
    method: 'GET',
  });
