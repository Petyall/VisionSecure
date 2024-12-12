import { Camera } from '../../types';
import { methodDefault } from '../methodDefault';

interface Params {
  body: Pick<
    Camera,
    | 'name'
    | 'stream_url'
    | 'location'
  // | 'stream_type'
  // | 'ip_address'
  // | 'port'
  // | 'login'
  // | 'password'
  >;
}

type Response = {
  detail?: string;
  cameras: Camera[];
};

export const postAddCamera = async ({ body }: Params): Promise<Response> =>
  methodDefault<Response>(`cameras/`, {
    method: 'POST',
    body: body,
  });
