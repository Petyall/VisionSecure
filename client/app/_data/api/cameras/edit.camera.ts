import { Camera } from '../../types';
import { methodDefault } from '../methodDefault';

interface Params {
  id: Pick<Camera, 'id'>;
  body: Pick<Camera, 'name' | 'location' | 'stream_url'>;
}

type Response = {
  detail?: string;
  success?: boolean;
};

export const editCamera = async ({
  id,
  body,
}: Params): Promise<Response> =>
  methodDefault<Response>(`cameras/${id.id}`, {
    method: 'PATCH',
    body: body,
  });
